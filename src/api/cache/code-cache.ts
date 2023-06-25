import { IJWTTokenPayload } from "../../core/types/ijwt-token-payload";
import { JWTHelper } from "../../core/helpers/jwt-helper";

export class CodeCache {
    private static _instance: CodeCache;

    private _cache: Map<number, string> = new Map<number, string>();

    private constructor() {
        if (CodeCache._instance) {
            throw new Error("Error: Instantiation failed: Use CodeCache.getInstance() instead of new.");
        }
        CodeCache._instance = this;
    }

    public static getInstance(): CodeCache {
        return CodeCache._instance;
    }

    public generateCode(data: any): number {
        this.removeExpiredCodes();
        
        // Generar un codigo de 6 dígitos
        let code = Math.floor(Math.random() * 1000000);
        
        // Si el codigo ya existe, generar otro
        while (this._cache.has(code)) {
            code = Math.floor(Math.random() * 1000000);
        }

        // Generar JWT asociado con data como payload
        const token = JWTHelper.generateCodeToken(data);

        // Guardar el codigo en el cache
        this._cache.set(code, token);

        // Retornar el codigo
        return code;
    }

    public validateCode(code: number): boolean {
        this.removeExpiredCodes();
        return this._cache.has(code) && !JWTHelper.tokenIsExpired(this._cache.get(code) as string);
    }

    private removeExpiredCodes(): void {
        this._cache.forEach((token: string, code: number) => {
            if (JWTHelper.tokenIsExpired(token)) {
                this._cache.delete(code);
            }
        });
    }
}