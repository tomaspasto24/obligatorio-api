import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { IJWTTokenPayload } from '../types/ijwt-token-payload';

export class JWTHelper {
    static validateToken(token: string): IJWTTokenPayload {
        const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'));

        const verifyOptions: VerifyOptions = {
            algorithms: ['RS256'],
        };

        return verify(token, publicKey, verifyOptions) as IJWTTokenPayload;
    }

    static generateToken(payload: IJWTTokenPayload): string {
        const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));

        const signOptionsAccess: SignOptions = {
            algorithm: 'RS256',
            expiresIn: '13',
        };

        const accessToken = sign(payload, privateKey, signOptionsAccess);

        return accessToken;
    }
}