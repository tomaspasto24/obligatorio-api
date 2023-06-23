export interface IDatabase {
    query(query: string): Promise<any>
}