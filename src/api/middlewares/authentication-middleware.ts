import { Request, Response, NextFunction } from "express";
import { JWTHelper } from "../../core/helpers/jwt-helper";
import { IJWTTokenPayload } from "../../core/types/ijwt-token-payload";

export class AuthenticationMiddleware {
    static readonly authenticate = async (req: Request, res: Response, next: NextFunction) => {
        if (req.baseUrl === '/login')
            next();

        try {
            const accessJWT: string = req.headers.authorization ?? '';

            if (!accessJWT)
                return res.status(401).json({ message: 'No se ha enviado el token de acceso.' });

            try {
                const decodedToken: IJWTTokenPayload = JWTHelper.validateToken(accessJWT);
                const refreshedToken: string = JWTHelper.generateToken(decodedToken);
                res.setHeader('Authorization', refreshedToken);
                req.body.tokenUserId = decodedToken.userId;
                next();
            }
            catch (error: any) {
                return res.status(401).json({ message: 'Token de acceso inválido.' });
            }
        }
        catch (error: any) {
            return res.status(500).json({ message: 'Error al autenticar usuario.' });
        }
    };
}