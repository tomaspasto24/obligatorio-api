import { Query } from "../patterns/builder/query-builder"

export interface IDatabase {
    query(query: string): Promise<any>
    transaction(queries: Query[]): Promise<any>
}