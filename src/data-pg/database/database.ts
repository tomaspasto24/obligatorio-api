import { IDatabase } from "../../core/database/idatabase";
import { Pool } from "pg";

export class Database implements IDatabase {
    private _pool: Pool;

    private static _instance: Database;

    private constructor() {
        this._pool = new Pool({
            user: 'postgres',
            host: '174.138.127.85',
            database: 'bd-obligatorio',
            password: 'e3nz4i6gcmjz2j3y',
            port: 42299, // or your PostgreSQL port
        });
    }

    public static get instance(): Database {
        if (!Database._instance) Database._instance = new Database();
        return Database._instance;
    }

    public query(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._pool.query(query, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}