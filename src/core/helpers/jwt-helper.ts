import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { IJWTTokenPayload } from '../types/ijwt-token-payload';
import { createPrivateKey, createPublicKey, PrivateKeyInput, PublicKeyInput } from 'crypto';

export class JWTHelper {
    static validateToken(token: string): IJWTTokenPayload {
        const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'), 'utf8');
        const publicKeyI: PublicKeyInput = {
            key: publicKey,
            format: 'pem',
            type: 'pkcs1',
        };
        const publicKeyO = createPublicKey(publicKeyI);

        const verifyOptions: VerifyOptions = {
            algorithms: ['RS256'],
        };

        return verify(token, publicKeyO, verifyOptions) as IJWTTokenPayload;
    }

    static generateToken(payload: IJWTTokenPayload): string {
        const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'), 'utf8');
        const privateKeyI: PrivateKeyInput = {
            key: privateKey,
            format: 'pem',
            type: 'pkcs1',
            passphrase: process.env.JWT_KEY_PASSPHRASE,
        };
        const privateKeyO = createPrivateKey(privateKeyI);

        const signOptionsAccess: SignOptions = {
            algorithm: 'RS256',
            expiresIn: '3d',
        };

        const accessToken = sign(payload, privateKeyO, signOptionsAccess);

        return accessToken;
    }
}