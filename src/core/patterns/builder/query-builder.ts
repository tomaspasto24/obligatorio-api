import { IModelEntity } from "../../models/ientity-model";
import { Order } from "../../types/order.enum";
import { BinaryExpression, ConstantExpression, Expression, ExpressionVisitor, PropertyExpression, UnaryExpression } from "../visitor/expression-visitor";

export interface IQuery {
    build(): string;
}

export abstract class PredicateParser extends ExpressionVisitor {
    protected _query: string = '';

    abstract visitPropertyExpression(expression: PropertyExpression): void;
    abstract visitConstantExpression(expression: ConstantExpression): void;
    abstract visitBinaryExpression(expression: BinaryExpression): void;
    abstract visitUnaryExpression(expression: UnaryExpression): void;
    abstract parse(expression: Expression): string;
}

export abstract class UpdateQuery implements IQuery {
    protected _table: string = '';
    protected _cols: string[] = [];
    protected _values: any[] = [];
    protected _where: string = '';

    protected _predicateParser: PredicateParser;

    constructor(table: string, cols: string[], values: any[], predicateParser: PredicateParser) {
        if (cols.length !== values.length)
            throw new Error('The number of columns and values must be equal.');
        if (cols.length === 0)
            throw new Error('The number of columns and values must be greater than 0.');

        this._table = table;
        this._cols = cols;
        this._values = values;
        this._predicateParser = predicateParser;
    }

    public abstract build(): string;

    public abstract where(expression: any): UpdateQuery;
}

export abstract class SelectQuery implements IQuery {
    protected _tables: [string, string[], string, Expression?][] = [];
    protected _where: string = '';
    protected _order: string = '';
    protected _limit: string = '';
    protected _offset: string = '';
    protected _group: string = '';

    protected _predicateParser: PredicateParser;

    constructor(table: string, predicateParser: PredicateParser, cols?: string[]) {
        this._tables.push([table, cols? cols : [], table, undefined]);
        this._predicateParser = predicateParser;
    }

    public abstract build(): string;

    public abstract where(expression: Expression): SelectQuery;

    public abstract order(order: Record<string, Order>[]): SelectQuery;

    public abstract limit(limit: number): SelectQuery;

    public abstract offset(offset: number): SelectQuery;

    public abstract group(group: [string, string[]][]): SelectQuery;

    public abstract join<T extends IModelEntity>(table: new (...args: any) => T, alias: string, condition: Expression, cols?: string[], ): SelectQuery;
}

export abstract class InsertQuery implements IQuery {
    protected _table: string = '';
    protected _cols: string[] = [];
    protected _values: any[] = [];

    protected _predicateParser: PredicateParser;

    constructor(table: string, cols: string[], values: any[], predicateParser: PredicateParser) {
        if (cols.length !== values.length)
            throw new Error('The number of columns and values must be equal.');
        if (cols.length === 0)
            throw new Error('The number of columns and values must be greater than 0.');

        this._table = table;
        this._cols = cols;
        this._values = values;
        this._predicateParser = predicateParser;
    }

    public abstract build(): string;
}

export abstract class DeleteQuery implements IQuery {
    protected _table: string = '';
    protected _where: string = '';

    protected _predicateParser: PredicateParser;

    constructor(table: string, predicateParser: PredicateParser) {
        this._table = table;
        this._predicateParser = predicateParser;
    }

    public abstract build(): string;

    public abstract where(expression: any): DeleteQuery;
}

export interface IQueryBuilder {
    select<T extends IModelEntity>(table: new (...args: any) => T, columns: string[]): SelectQuery;
    insert<T extends IModelEntity>(table: new (...args: any) => T, columns: string[], values: any[]): InsertQuery;
    update<T extends IModelEntity>(table: new (...args: any) => T, columns: string[], values: any[]): UpdateQuery;
    delete<T extends IModelEntity>(table: new (...args: any) => T): DeleteQuery;
}