import * as crypto from 'crypto';

export class CryptoHelper {
    public static hash(text: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(text);
        const result = hash.digest('hex');
        return result;
    }
}