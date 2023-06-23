import { IDatabase } from "../../core/database/idatabase";
import { Pool } from "pg";

export class Database implements IDatabase {
    private _pool: Pool;

    private static _instance: Database;

    private constructor() {
        const dbUser: string = process.env.DB_USER || '';
        const dbHost: string = process.env.DB_HOST || '';
        const dbDatabase: string = process.env.DB_DATABASE || '';
        const dbPassword: string = process.env.DB_PASSWORD || '';
        const dbPort: number = Number(process.env.DB_PORT) || 5432;

        this._pool = new Pool({
            user: dbUser,
            host: dbHost,
            database: dbDatabase,
            password: dbPassword,
            port: dbPort,
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