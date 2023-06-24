import { Habilidad as HabilidadDTO} from "../dtos/habilidad";
import { PasswordCambioRealizacion as PasswordCambioRealizacionDTO} from "../dtos/password-cambio-realizacion";
import { PerfilModificacion as PerfilModificacionDTO } from "../dtos/perfil-modificacion";
import { Usuario as UsuarioDTO } from "../dtos/usuario";
import { UsuarioFiltro as UsuarioFiltroDTO} from "../dtos/usuario-filtro";
import { UsuarioHabilidadAccion as UsuarioHabilidadAccionDTO } from "../dtos/usuario-habilidad-accion";
import { Conexion as ConexionDTO } from "../dtos/conexion";
import { ConexionAccion as ConexionAccionDTO } from "../dtos/conexion-accion";
import { IDBService } from "./idb-service";

export interface IUsuariosService extends IDBService {
    getUsuariosFiltered(filter: UsuarioFiltroDTO): Promise<UsuarioDTO[]>;
    getUsuarioById(id: number): Promise<UsuarioDTO>;
    getUsuarioByLogin(email: string, password: string): Promise<UsuarioDTO>;
    getUsuarioHabilidades(id: number): Promise<HabilidadDTO>;
    updUsuarioPerfil(id: number, data: PerfilModificacionDTO): Promise<any>;
    updUsuarioAddHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any>;
    updUsuarioRemoveHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any>;
    updUsuarioChangePassAuth(id: number): Promise<any>;
    updUsuarioChangePass(data: PasswordCambioRealizacionDTO): Promise<any>;
    getUsuarioConexiones(id: number): Promise<ConexionDTO>;
    insUsuarioConexion(data: ConexionAccionDTO): Promise<any>;
    updUsuarioConexionAceptar(data: ConexionAccionDTO): Promise<any>;
    dltUsuarioConexion(data: ConexionAccionDTO): Promise<any>;
}