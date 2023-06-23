import { IModelEntity } from "../../models/ientity-model";

export class TableDefinitionFactory {
    public static getTableCols<T extends IModelEntity>(c: new (...args: any) => T): string[] {
        let cols: string[] = [];
        for (let key in new c()) {
            cols.push(key);
        }
        return cols;
    }

    public static getTableName<T extends IModelEntity>(c: new (...args: any) => T): string {
        return c.name;
    }
}