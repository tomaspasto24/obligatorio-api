import { Request, Response } from "express";
import { Login } from "../../core/dtos/login";
import { Usuario as UsuarioDTO} from "../../core/dtos/usuario";
import { IUsuariosService } from "../../core/services/iusuarios-service";
import { DBServiceFactory } from "../../data-pg/patterns/factory/db-service-factory";
import { IJWTTokenPayload } from "../../core/types/ijwt-token-payload";
import { JWTHelper } from "../../core/helpers/jwt-helper";

export class AuthenticationController {
    static readonly login = async (req: Request, res: Response) => {
        try {
            const body: Login = Login.fromJson(req.body);

            // validate email and password
            if (!body.email || !body.password) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // get user from database
            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            const usuario: UsuarioDTO = await usuariosService.getUsuarioByLogin(body.email, body.password);
            if (!usuario) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // generate token
            const token: IJWTTokenPayload = {
                userId: usuario.id,
                email: usuario.email,
                fullName: usuario.fullName,
            }
            const accessToken: string = JWTHelper.generateToken(token);

            // return token
            return res.status(200).json({ accessToken: accessToken });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to authenticate user' });
        }
    }

    
}