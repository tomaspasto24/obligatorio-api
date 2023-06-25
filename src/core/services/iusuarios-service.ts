import { Habilidad as HabilidadDTO} from "../dtos/habilidad";
import { PasswordCambioRealizacion as PasswordCambioRealizacionDTO} from "../dtos/password-cambio-realizacion";
import { PerfilModificacion as PerfilModificacionDTO } from "../dtos/perfil-modificacion";
import { Usuario as UsuarioDTO } from "../dtos/usuario";
import { UsuarioFiltro as UsuarioFiltroDTO} from "../dtos/usuario-filtro";
import { UsuarioHabilidadAccion as UsuarioHabilidadAccionDTO } from "../dtos/usuario-habilidad-accion";
import { Conexion as ConexionDTO } from "../dtos/conexion";
import { ConexionAccion as ConexionAccionDTO } from "../dtos/conexion-accion";
import { IDBService } from "./idb-service";
import { Registro as RegistroDTO } from "../dtos/registro";

export interface IUsuariosService extends IDBService {
    getUsuariosFiltered(activeUserId: number, filter: UsuarioFiltroDTO, count: number): Promise<UsuarioDTO[]>;
    getUsuarioById(id: number): Promise<UsuarioDTO>;
    insUsuario(data: RegistroDTO): Promise<any>;
    getUsuarioByLogin(email: string, password: string): Promise<UsuarioDTO>;
    getUsuarioHabilidades(id: number): Promise<HabilidadDTO[]>;
    updUsuarioPerfil(id: number, data: PerfilModificacionDTO): Promise<any>;
    updUsuarioAddHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any>;
    updUsuarioRemoveHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any>;
    updUsuarioChangePass(data: PasswordCambioRealizacionDTO): Promise<any>;
    getUsuarioConexiones(id: number): Promise<ConexionDTO[]>;
    insUsuarioConexion(data: ConexionAccionDTO): Promise<any>;
    updUsuarioConexionAceptar(id: number, connection_id: number): Promise<any>;
    dltUsuarioConexion(id: number, connection_id: number): Promise<any>;
}