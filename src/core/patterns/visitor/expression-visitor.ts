export abstract class Expression {
    abstract accept(visitor: ExpressionVisitor): void;
}

export class PropertyExpression extends Expression {
    constructor(public propertyName: string, public format?: string) {
        super();
    }

    accept(visitor: ExpressionVisitor): void {
        visitor.visitPropertyExpression(this);
    }
}

export class ConstantExpression extends Expression {
    constructor(public value: any) {
        super();
    }

    accept(visitor: ExpressionVisitor): void {
        visitor.visitConstantExpression(this);
    }
}

export class BinaryExpression extends Expression {
    constructor(
        public left: Expression,
        public operator: string,
        public right: Expression
    ) {
        super();
    }

    accept(visitor: ExpressionVisitor): void {
        visitor.visitBinaryExpression(this);
    }
}

export class UnaryExpression extends Expression {
    constructor(
        public operator: string,
        public operand: Expression
    ) {
        super();
    }

    accept(visitor: ExpressionVisitor): void {
        visitor.visitUnaryExpression(this);
    }
}

export abstract class ExpressionVisitor {
    abstract visitPropertyExpression(expression: PropertyExpression): void;
    abstract visitConstantExpression(expression: ConstantExpression): void;
    abstract visitBinaryExpression(expression: BinaryExpression): void;
    abstract visitUnaryExpression(expression: UnaryExpression): void;
}