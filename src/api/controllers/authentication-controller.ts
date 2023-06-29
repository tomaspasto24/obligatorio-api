import { Request, Response } from "express";
import { Login as LoginDTO } from "../../core/dtos/login";
import { Usuario as UsuarioDTO} from "../../core/dtos/usuario";
import { IUsuariosService } from "../../core/services/iusuarios-service";
import { DBServiceFactory } from "../../data-pg/patterns/factory/db-service-factory";
import { IJWTTokenPayload } from "../../core/types/ijwt-token-payload";
import { JWTHelper } from "../../core/helpers/jwt-helper";
import { CryptoHelper } from "../../core/helpers/crypto-helper";
import { Registro as RegistroDTO } from "../../core/dtos/registro";

export class AuthenticationController {
    static readonly login = async (req: Request, res: Response) => {
        try {
            const body: LoginDTO = LoginDTO.fromJson(req.body);

            if (!body.email || !body.password) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            const usuario: UsuarioDTO = await usuariosService.getUsuarioByLogin(body.email, CryptoHelper.hash(body.password));
            if (!usuario) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token: IJWTTokenPayload = {
                userId: usuario.id,
                email: usuario.email,
                fullName: usuario.name + ' ' + usuario.lastName,
            }
            const accessToken: string = JWTHelper.generateToken(token);

            return res.status(200).json({ accessToken: accessToken });
        }
        catch (error: any) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    }

    static readonly register = async (req: any, res: any) => {
        try {
            const body: RegistroDTO = RegistroDTO.fromJson(req.body);

            body.password = CryptoHelper.hash(body.password);

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.insUsuario(body);

            return res.status(200).json({ message: 'Usuario registrado' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to insert usuario' });
        }
    }

    static readonly getPayloadByToken = async (req: any, res: any) => {
        try {
            const token: string = req.headers.authorization.split(' ')[1];
            const payload    = JWTHelper.getPayload(token);
            return res.status(200).json(payload);
        }
        catch (error: any) {
            return res.status(400).json({ message: 'Invalid token' });
        }
    }
}