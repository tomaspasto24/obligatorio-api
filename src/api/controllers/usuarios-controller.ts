import { IUsuariosService } from "../../core/services/iusuarios-service";
import { UsuarioFiltro as UsuarioFiltroDTO } from "../../core/dtos/usuario-filtro"
import { DBServiceFactory } from "../../data-pg/patterns/factory/db-service-factory";
import { Usuario as UsuarioDTO } from "../../core/dtos/usuario";
import { Habilidad as HabilidadDTO } from "../../core/dtos/habilidad";
import { UsuarioHabilidadAccion as UsuarioHabilidadAccionDTO } from "../../core/dtos/usuario-habilidad-accion";
import { IRequestWrapper } from "../../core/types/request-wrapper";
import { PerfilModificacion as PerfilModificacionDTO } from "../../core/dtos/perfil-modificacion";
import { Conexion as ConexionDTO } from "../../core/dtos/conexion";
import { ConexionAccion as ConexionAccionDTO } from "../../core/dtos/conexion-accion";
import { CodeCache } from "../cache/code-cache";
import { PasswordCambioRealizacion as PasswordCambioRealizacionDTO } from "../../core/dtos/password-cambio-realizacion";
import { ISolicitudesService } from "../../core/services/isolicitudes-service";
import { SolicitudRelevante as SolicitudRelevanteDTO } from "../../core/dtos/solicitud-relevante";
import { SolicitudActiva as SolicitudActivaDTO } from "../../core/dtos/solicitud-activa";
import { Registro as RegistroDTO } from "../../core/dtos/registro";
import { CryptoHelper } from "../../core/helpers/crypto-helper";

export class UsuariosController {
    static readonly insUsuariosSearch = async (req: any, res: any) => {
        try {
            const activeUser = req.body.userId;
            const body: UsuarioFiltroDTO = UsuarioFiltroDTO.fromJson((req.body as IRequestWrapper).body);

            if (activeUser < 1)
                return res.status(401).json({ message: 'Unauthorized' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            const usuarios: UsuarioDTO[] = await usuariosService.getUsuariosFiltered(activeUser, body, 20);

            return res.status(200).json(usuarios);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get usuarios' });
        }
    }

    static readonly getUsuarioById = async (req: any, res: any) => {
        try {
            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            const usuario: UsuarioDTO = await usuariosService.getUsuarioById(req.params.id);

            return res.status(200).json(usuario);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get usuario' });
        }
    }

    static readonly insUsuario = async (req: any, res: any) => {
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

    static readonly getUsuarioHabilidades = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;

            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            const habilidades: HabilidadDTO[] = await usuariosService.getUsuarioHabilidades(userId);

            return res.status(200).json(habilidades);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get usuario habilidades' });
        }
    }

    static readonly insUsuarioHabilidades = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;
            const body: UsuarioHabilidadAccionDTO = UsuarioHabilidadAccionDTO.fromJson((req.body as IRequestWrapper).body);

            if (body.userId !== activeUser || body.userId !== userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1 || body.habilidadId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.updUsuarioAddHabilidad(body);

            return res.status(200).json({ message: 'Habilidad agregada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to add usuario habilidad' });
        }
    }

    static readonly dltUsuarioHabilidades = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;
            const body: UsuarioHabilidadAccionDTO = UsuarioHabilidadAccionDTO.fromJson((req.body as IRequestWrapper).body);

            if (body.userId !== activeUser || body.userId !== userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1 || body.habilidadId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.updUsuarioRemoveHabilidad(body);

            return res.status(200).json({ message: 'Habilidad removida' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to remove usuario habilidad' });
        }
    }

    static readonly updUsuarioById = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;
            const body: PerfilModificacionDTO = PerfilModificacionDTO.fromJson((req.body as IRequestWrapper).body);

            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.updUsuarioPerfil(activeUser, body);

            return res.status(200).json({ message: 'Perfil actualizado' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to update usuario' });
        }
    }

    static readonly getUsuarioConexiones = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;

            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            const conexiones: ConexionDTO[] = await usuariosService.getUsuarioConexiones(userId);

            return res.status(200).json(conexiones);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get usuario conexiones' });
        }
    }

    static readonly insUsuarioConexiones = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;
            const body: ConexionAccionDTO = ConexionAccionDTO.fromJson((req.body as IRequestWrapper).body);

            if (body.activeUserId !== activeUser || body.activeUserId !== userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (body.activeUserId === body.passiveUserId)
                return res.status(400).json({ message: 'Invalid request' });
            if (body.activeUserId <= 0 || body.passiveUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.insUsuarioConexion(body);

            return res.status(200).json({ message: 'Conexion agregada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to add usuario conexion' });
        }
    }

    static readonly dltUsuarioConexiones = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const passiveUserId = Number(req.params.cId);
            const activeUser = req.body.userId;

            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId === passiveUserId)
                return res.status(400).json({ message: 'Invalid request' });
            if (userId <= 0 || passiveUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.dltUsuarioConexion(userId, passiveUserId);

            return res.status(200).json({ message: 'Conexion removida' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to remove usuario conexion' });
        }
    }

    static readonly updUsuarioConexiones = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const passiveUserId = Number(req.params.cId);
            const activeUser = req.body.userId;

            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId === passiveUserId)
                return res.status(400).json({ message: 'Invalid request' });
            if (userId <= 0 || passiveUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.updUsuarioConexionAceptar(userId, passiveUserId);

            return res.status(200).json({ message: 'Conexion aceptada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to accept usuario conexion' });
        }
    }

    static readonly insUsuarioPassChange = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;

            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let codeCache: CodeCache = CodeCache.getInstance();
            const code = codeCache.generateCode({ userId: userId });

            // TODO: Send email with code

            return res.status(200).json({ message: 'Solicitud de cambio de contraseña enviada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to add usuario pass change' });
        }
    }

    static readonly updUsuarioPassChange = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;
            const body: PasswordCambioRealizacionDTO = PasswordCambioRealizacionDTO.fromJson((req.body as IRequestWrapper).body);
            const code = body.authCode;
            const password = body.password;
            const targetUserId = body.userId;

            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId !== targetUserId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (targetUserId < 1)
                return res.status(400).json({ message: 'Invalid request' });
            if (!code || !password)
                return res.status(400).json({ message: 'Invalid request' });
            if (code.length !== 6)
                return res.status(400).json({ message: 'Invalid request' });

            let codeCache: CodeCache = CodeCache.getInstance();
            const valid = codeCache.validateCode(Number(code));

            if (!valid)
                return res.status(401).json({ message: 'Unauthorized' });

            body.password = CryptoHelper.hash(password);

            let usuariosService: IUsuariosService = DBServiceFactory.instance.getUsuariosService();
            await usuariosService.updUsuarioChangePass(body);

            return res.status(200).json({ message: 'Contraseña cambiada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to change usuario password' });
        }
    }

    static readonly getUsuarioSolicitudesRelevantes = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;
            
            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            let solicitudes: SolicitudRelevanteDTO[] = await solicitudesService.getSolicitudesRelevantes(userId);

            return res.status(200).json(solicitudes);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get usuario solicitudes relevantes' });
        }
    }

    static readonly getUsuarioSolicitudesActivas = async (req: any, res: any) => {
        try {
            const userId = Number(req.params.id);
            const activeUser = req.body.userId;
            
            if (userId !== activeUser)
                return res.status(401).json({ message: 'Unauthorized' });
            if (userId < 1)
                return res.status(400).json({ message: 'Invalid request' });

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            let solicitudes: SolicitudActivaDTO[] = await solicitudesService.getSolicitudesActivas(userId);

            return res.status(200).json(solicitudes);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get usuario solicitudes activas' });
        }
    }
}