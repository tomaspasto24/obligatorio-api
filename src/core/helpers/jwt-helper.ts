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
        };
        const publicKeyO = createPublicKey(publicKeyI);

        const verifyOptions: VerifyOptions = {
            algorithms: ['RS256'],
        };

        const decodedToken = verify(token, publicKeyO, verifyOptions) as IJWTTokenPayload;
        return {
            userId: decodedToken.userId,
            email: decodedToken.email,
            fullName: decodedToken.fullName,
        } as IJWTTokenPayload;
    }

    static generateToken(payload: IJWTTokenPayload): string {
        const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'), 'utf8');
        const privateKeyI: PrivateKeyInput = {
            key: privateKey,
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

    static generateCodeToken(payload: any): string {
        const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'), 'utf8');
        const privateKeyI: PrivateKeyInput = {
            key: privateKey,
            passphrase: process.env.JWT_KEY_PASSPHRASE,
        };
        const privateKeyO = createPrivateKey(privateKeyI);

        const signOptionsAccess: SignOptions = {
            algorithm: 'RS256',
            expiresIn: '1h',
        };

        const token = sign(payload, privateKeyO, signOptionsAccess);

        return token;
    }

    static tokenIsExpired(token: string): boolean {
        const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'), 'utf8');
        const publicKeyI: PublicKeyInput = {
            key: publicKey,
        };
        const publicKeyO = createPublicKey(publicKeyI);

        const verifyOptions: VerifyOptions = {
            algorithms: ['RS256'],
        };

        try {
            verify(token, publicKeyO, verifyOptions);
            return false;
        }
        catch (err) {
            return true;
        }
    }
}