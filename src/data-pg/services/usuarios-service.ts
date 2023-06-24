import { IDatabase } from "../../core/database/idatabase";
import { Habilidad as HabilidadDTO } from "../../core/dtos/habilidad";
import { PasswordCambioRealizacion as PasswordCambioRealizacionDTO } from "../../core/dtos/password-cambio-realizacion";
import { PerfilModificacion as PerfilModificacionDTO } from "../../core/dtos/perfil-modificacion";
import { Usuario as UsuarioDTO } from "../../core/dtos/usuario";
import { UsuarioFiltro as UsuarioFiltroDTO } from "../../core/dtos/usuario-filtro";
import { UsuarioHabilidadAccion as UsuarioHabilidadAccionDTO } from "../../core/dtos/usuario-habilidad-accion";
import { IQueryBuilder } from "../../core/patterns/builder/query-builder";
import { IUsuariosService } from "../../core/services/iusuarios-service";
import { Database } from "../database/database";
import { PGQueryBuilder, and, cons, equal, in_, like, or, prop } from "../patterns/builder/query-builder";
import { Usuario } from "../../core/models/usuario";
import { Expression } from "../../core/patterns/visitor/expression-visitor";
import { UsuarioHabilidades } from "../../core/models/usuario-habilidades";
import { Conexion } from "../../core/dtos/conexion";
import { ConexionAccion } from "../../core/dtos/conexion-accion";

export class UsuariosService implements IUsuariosService {
    private _database: IDatabase;
    private _queryBuilder: IQueryBuilder;

    public constructor() {
        this._database = Database.instance;
        this._queryBuilder = new PGQueryBuilder();
    }

    public async getUsuariosFiltered(filter: UsuarioFiltroDTO): Promise<UsuarioDTO[]> {
        let query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'name', 'lastName', 'birthDate']);
        let stack: Expression[] = [];
        if (filter.email) stack.push(
            like(
                prop('Usuario', 'email'), 
                cons(`%${filter.email}%`)
                ));
        if (filter.fullName) stack.push(
            or(
                like(prop('Usuario', 'nombres', '%{0}%'), cons(filter.fullName)),
                like(prop('Usuario', 'apellidos', '%{0}%'), cons(filter.fullName))
                ));
        if (filter.nick) stack.push(
            like(
                prop('Usuario', 'nick'), 
                cons(`%${filter.nick}%`)
                ));
        if (filter.skills) stack.push(
            in_(
                prop('H', 'codigo'), 
                cons(filter.skills)
                ));
        let where: Expression | null = stack.length > 0 ? stack.pop()! : null;
        while (stack.length > 0) {
            where = and(stack.pop()!, where!);
        }
        query = query.join(UsuarioHabilidades, 'H', equal(prop('Usuario', 'id'), prop('H', 'id_usuario')));
        query = where ? query.where(where) : query;
        query = query.group([['Usuario', ['id', 'email', 'nick', 'name', 'lastName', 'birthDate']]]);
        console.log(query.build());

        //let result = await this._database.query(query.build());

        let usuarios: UsuarioDTO[] = [];
        return usuarios;
    }

    public async getUsuarioById(id: number): Promise<UsuarioDTO> {
        const query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'name', 'lastName', 'birthDate']).where(equal(prop('Usuario', 'id'), cons(id)));
        const usuario: UsuarioDTO = new UsuarioDTO();

        return usuario;
    }

    public async getUsuarioHabilidades(id: number): Promise<HabilidadDTO> {
        throw new Error("Method not implemented.");
    }

    public async updUsuarioPerfil(id: number, data: PerfilModificacionDTO): Promise<any> {
        const query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'name', 'lastName', 'birthDate']);
        const usuario: UsuarioDTO = new UsuarioDTO();
        const res = this._queryBuilder.update(Usuario, ['id', 'email', 'nick', 'name', 'lastName', 'birthDate'], data);
        return res;
    }

    public async updUsuarioAddHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updUsuarioRemoveHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updUsuarioChangePassAuth(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updUsuarioChangePass(data: PasswordCambioRealizacionDTO): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async getUsuarioConexiones(id: number): Promise<Conexion> {
        throw new Error("Method not implemented.");
    }

    public async insUsuarioConexion(data: ConexionAccion): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updUsuarioConexionAceptar(data: ConexionAccion): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async dltUsuarioConexion(data: ConexionAccion): Promise<any> {
        throw new Error("Method not implemented.");
    }
}