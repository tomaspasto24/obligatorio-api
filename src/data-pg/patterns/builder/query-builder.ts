import { FormatHelper } from "../../../core/helpers/format-helper";
import { IModelEntity } from "../../../core/models/ientity-model";
import { DeleteQuery, IQueryBuilder, InsertQuery, PredicateParser, SelectQuery, UpdateQuery } from "../../../core/patterns/builder/query-builder";
import { TableDefinitionFactory } from "../../../core/patterns/factory/table-definition-factory";
import { BinaryExpression, ConstantExpression, Expression, PropertyExpression, UnaryExpression } from "../../../core/patterns/visitor/expression-visitor";
import { Order } from "../../../core/types/order.enum";

export class PGSelectQuery extends SelectQuery {
    constructor(table: new (...args: any) => IModelEntity, predicateParser: PredicateParser, cols?: string[]) {
        let tableName = TableDefinitionFactory.getTableName(table);
        let tableAllCols = TableDefinitionFactory.getTableCols(table).filter(col => cols? cols.includes(col) : true).map(col => `${tableName}.${col} AS ${tableName}_${col}`);
        super(tableName, predicateParser, tableAllCols);
    }

    public build(): string {
        let query = `SELECT ${this._tables.filter(table => table[1].length > 0).map(table => table[1].join(', ')).join(', ')} FROM "${this._tables[0][2]}"`;
        if (this._tables.length > 1) {
            for (let i = 1; i < this._tables.length; i++) {
                query += ` INNER JOIN "${this._tables[i][0]}" AS ${this._tables[i][2]} ON ${this._predicateParser.parse(this._tables[i][3]!)}`;
            }
        }
        query += this._where;
        query += this._group;
        query += this._order;
        query += this._limit;
        query += this._offset;
        return query;
    }

    public where(expression: Expression): SelectQuery {
        this._where = ` WHERE ${this._predicateParser.parse(expression)}`;
        return this;
    }

    public order(order: Record<string, Order>[]): SelectQuery {
        if (order.filter(col => col[1] !== Order.Ascending && col[1] !== Order.Descending).length > 0)
            throw new Error('Invalid order');
        this._order = ` ORDER BY ${order.map(col => {
            if (col[1] === Order.Ascending)
                return col[0] + ' ASC';
            else
                return col[0] + ' DESC';
        }).join(', ')}`;
        return this;
    }

    public limit(limit: number): SelectQuery {
        this._limit = ` LIMIT ${limit}`;
        return this;
    }

    public offset(offset: number): SelectQuery {
        this._offset = ` OFFSET ${offset}`;
        return this;
    }

    public group(group: [string, string[]][]): SelectQuery {
        this._group = ` GROUP BY ${group.map(col => `${col[0]}(${col[1].join(', ')})`).join(', ')}`;
        return this;
    }

    public join<T extends IModelEntity>(table: new (...args: any) => T, alias: string, condition: Expression, cols?: string[], ): SelectQuery {
        let tableName = TableDefinitionFactory.getTableName(table);
        let tableAllCols = TableDefinitionFactory.getTableCols(table).filter(col => cols?.includes(col)).map(col => `${alias}.${col} AS ${alias}_${col}`);
        this._tables.push([tableName, tableAllCols? tableAllCols : [], alias, condition]);
        return this;
    }
}

export class PGUpdateQuery extends UpdateQuery {
    constructor(table: new (...args: any) => IModelEntity, cols: string[], values: any[], predicateParser: PredicateParser) {
        let tableName = TableDefinitionFactory.getTableName(table);
        let tableAllCols = TableDefinitionFactory.getTableCols(table)
        if (cols.filter(col => !tableAllCols.includes(col)).length > 0)
            throw new Error('Invalid column');
        super(tableName, cols, values, predicateParser);
    }
    
    public build(): string {
        return `UPDATE ${this._table} SET ${this._cols.map((col, i) => `${col} = ${this._predicateParser.parse(cons(this._values[i]))}`).join(', ')}${this._where}`;
    }

    public where(expression: Expression): UpdateQuery {
        this._where = ` WHERE ${this._predicateParser.parse(expression)}`;
        return this;
    }
}

export class PGDeleteQuery extends DeleteQuery {
    constructor(table: new (...args: any) => IModelEntity, predicateParser: PredicateParser) {
        let tableName = TableDefinitionFactory.getTableName(table);
        super(tableName, predicateParser);
    }

    public build(): string {
        return `DELETE FROM ${this._table}${this._where}`;
    }

    public where(expression: any): DeleteQuery {
        this._where = ` WHERE ${this._predicateParser.parse(expression)}`;
        return this;
    }
}

export class PGInsertQuery extends InsertQuery {
    constructor(table: new (...args: any) => IModelEntity, cols: string[], values: any[], predicateParser: PredicateParser) {
        let tableName = TableDefinitionFactory.getTableName(table);
        let tableAllCols = TableDefinitionFactory.getTableCols(table)
        if (cols.filter(col => !tableAllCols.includes(col)).length > 0)
            throw new Error('Invalid column');
        super(tableName, cols, values, predicateParser);
    }
    
    public build(): string {
        return `INSERT INTO ${this._table} (${this._cols.join(', ')}) VALUES (${this._values.map(val => this._predicateParser.parse(cons(val))).join(', ')})`;
    }
}

export class PGPredicateParser extends PredicateParser{
    visitPropertyExpression(expression: PropertyExpression): void {
        if (expression.format)
            this._query += FormatHelper.string.format(expression.format, expression.propertyName);
        else
            this._query += expression.propertyName;
    }

    visitConstantExpression(expression: ConstantExpression): void {
        if (expression.value === undefined) {
            this._query += 'NULL';
            return;
        }
        else {
            switch (typeof expression.value) {
                case 'string':
                    this._query += `'${expression.value}'`;
                    break;
                case 'number':
                    this._query += expression.value;
                    break;
                case 'boolean':
                    this._query += expression.value ? 'TRUE' : 'FALSE';
                    break;
                case 'object':
                    if (expression.value instanceof Date)
                        this._query += `TO_DATE('${expression.value.getFullYear()}-${expression.value.getMonth() + 1}-${expression.value.getDate()}', 'YYYY-MM-DD')`;
                    else if (expression.value instanceof Array)
                        this._query += `(${expression.value.map(v => `'${v}'`).join(', ')})`;
                    else
                        throw new Error(`Unsupported type: ${typeof expression.value}`);
                    break;
                default:
                    throw new Error(`Unsupported type: ${typeof expression.value}`);
            }
        }
    }

    visitBinaryExpression(expression: BinaryExpression): void {
        this._query += '(';
        expression.left.accept(this);
        this._query += ` ${expression.operator} `;
        expression.right.accept(this);
        this._query += ')';
    }

    visitUnaryExpression(expression: UnaryExpression): void {
        this._query += '(';
        this._query += `${expression.operator} `;
        expression.operand.accept(this);
        this._query += ')';
    }

    public parse(expression: Expression): string {
        this._query = '';
        expression.accept(this);
        return this._query;
    }
}


export function or(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "OR", expression2);
}

export function and(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "AND", expression2);
}

export function equal(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "=", expression2);
}

export function gtn(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, ">", expression2);
}

export function gte(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, ">=", expression2);
}

export function ltn(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "<", expression2);
}

export function lte(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "<=", expression2);
}

export function like(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "LIKE", expression2);
}

export function in_(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "IN", expression2);
}

export function is(expression1: Expression, expression2: Expression): Expression {
    return new BinaryExpression(expression1, "IS", expression2);
}

export function not(expression: Expression): Expression {
    return new UnaryExpression("NOT", expression);
}

export function cons(value: any): Expression {
    return new ConstantExpression(value);
}

export function prop(alias: string, name: string, format?: string): Expression {
    return new PropertyExpression(`${alias}.${name}`, format);
}

export class PGQueryBuilder implements IQueryBuilder {
    public select<T extends IModelEntity>(table: new (...args: any) => T, columns: string[]): SelectQuery {
        return QueryFactory.select(table, columns);
    }

    public insert<T extends IModelEntity>(table: new (...args: any) => T, columns: string[], values: any[]): InsertQuery {
        return QueryFactory.insert(table, columns, values);
    }

    public update<T extends IModelEntity>(table: new (...args: any) => T, columns: string[], values: any[]): UpdateQuery {
        return QueryFactory.update(table, columns, values);
    }

    public delete<T extends IModelEntity>(table: new (...args: any) => T): DeleteQuery {
        return QueryFactory.delete(table);
    }
}

class QueryFactory {
    static select<T extends IModelEntity>(table: new (...args: any) => T, columns: string[]): SelectQuery {
        let predicateParser = new PGPredicateParser();
        return new PGSelectQuery(table, predicateParser, columns);
    }

    static insert<T extends IModelEntity>(table: new (...args: any) => T, columns: string[], values: any[]): InsertQuery {
        let predicateParser = new PGPredicateParser();
        return new PGInsertQuery(table, columns, values, predicateParser);
    }

    static update<T extends IModelEntity>(table: new (...args: any) => T, columns: string[], values: any[]): UpdateQuery {
        let predicateParser = new PGPredicateParser();
        return new PGUpdateQuery(table, columns, values, predicateParser);
    }

    static delete<T extends IModelEntity>(table: new (...args: any) => T): DeleteQuery {
        let predicateParser = new PGPredicateParser();
        return new PGDeleteQuery(table, predicateParser);
    }
}