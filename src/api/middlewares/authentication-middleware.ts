import { Request, Response, NextFunction } from "express";
import { JWTHelper } from "../../core/helpers/jwt-helper";
import { IJWTTokenPayload } from "../../core/types/ijwt-token-payload";
import { IRequestWrapper } from "../../core/types/request-wrapper";

export class AuthenticationMiddleware {
    static readonly authenticate = async (req: Request, res: Response, next: NextFunction) => {
        const reqUrl: string = req.originalUrl;
        const filteredUrls: string[] = [
            '/api/iniciar-sesion',
            '/api/registrar-usuario',
            '/api/habilidades',
            '/api/habilidades-categorias',
        ];

        if (filteredUrls.includes(reqUrl)) {
            next();
        }

        try {
            const accessJWT: string = req.headers.authorization?.split(' ')[1] ?? '';

            if (!accessJWT)
                return res.status(401).json({ message: 'No se ha enviado el token de acceso.' });

            try {
                const decodedToken: IJWTTokenPayload = JWTHelper.validateToken(accessJWT);
                const refreshedToken: string = JWTHelper.generateToken(decodedToken);
                res.setHeader('Authorization', refreshedToken);
                let wrappedReq: IRequestWrapper = {
                    body: req.body,
                    userId: decodedToken.userId,
                }
                req.body = wrappedReq;
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