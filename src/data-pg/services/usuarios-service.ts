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
import { Conexion as ConexionDTO } from "../../core/dtos/conexion";
import { ConexionAccion } from "../../core/dtos/conexion-accion";
import { Habilidad } from "../../core/models/habilidad";
import { Categoria } from "../../core/models/categoria";
import { Registro as RegistroDTO } from "../../core/dtos/registro";

export class UsuariosService implements IUsuariosService {
    private _database: IDatabase;
    private _queryBuilder: IQueryBuilder;

    public constructor() {
        this._database = Database.instance;
        this._queryBuilder = new PGQueryBuilder();
    }

    public async getUsuariosFiltered(filter: UsuarioFiltroDTO): Promise<UsuarioDTO[]> {
        // Preparar consulta
        let query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'nombres', 'apellidos', 'nacimiento']);
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
        query = query.group([['Usuario', ['id', 'email', 'nick', 'nombres', 'apellidos', 'nacimiento']]]);

        // Ejecutar consulta
        let result = await this._database.query(query.build());

        // Verificar respuesta
        // Cuando no se encuentran usuarios, se retorna un arreglo vacío

        // Convertir respuesta a DTO
        let usuarios: UsuarioDTO[] = [];
        for (let i = 0; i < result.rowCount; i++) {
            let usuario: UsuarioDTO = new UsuarioDTO();
            usuario.id = result.rows[i].usuario_id;
            usuario.email = result.rows[i].usuario_email;
            usuario.nick = result.rows[i].usuario_nick;
            usuario.name = result.rows[i].usuario_nombres;
            usuario.lastName = result.rows[i].usuario_apellidos;
            usuario.birthDate = new Date(result.rows[i].usuario_nacimiento);
            usuarios.push(usuario);
        }

        // Retornar DTO
        return usuarios;
    }

    public async getUsuarioById(id: number): Promise<UsuarioDTO> {
        // Preparar consulta
        let query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'nombres', 'apellidos', 'nacimiento']);
        query = query.where(equal(prop('Usuario', 'id'), cons(id)));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("Usuario no encontrado");
        if (response.rowCount > 1)
            throw new Error("Error de integridad de datos");

        // Convertir respuesta a DTO
        let usuario: UsuarioDTO = new UsuarioDTO();
        usuario.id = response.rows[0].usuario_id;
        usuario.email = response.rows[0].usuario_email;
        usuario.nick = response.rows[0].usuario_nick;
        usuario.name = response.rows[0].usuario_nombres;
        usuario.lastName = response.rows[0].usuario_apellidos;
        usuario.birthDate = new Date(response.rows[0].usuario_nacimiento);

        // Retornar DTO
        return usuario;
    }

    public async insUsuario(data: RegistroDTO): Promise<any> {
        /*
        // Preparar consulta
        let query = this._queryBuilder.insert(Usuario, ['email', 'nick', 'nombres', 'apellidos', 'nacimiento', 'contraseña'], [cons(data.email), cons(data.nick), cons(data.name), cons(data.lastName), cons(data.birthDate), cons(data.passwordHash)]);

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo crear el usuario");
            */
    }

    public async getUsuarioByLogin(email: string, passwordHash: string): Promise<UsuarioDTO> {
        // Preparar consulta
        let query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'nombres', 'apellidos', 'nacimiento', 'contraseña']);
        query = query.where(and(equal(prop('Usuario', 'email'), cons(email)), equal(prop('Usuario', 'contraseña'), cons(passwordHash))));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("Usuario no encontrado");
        if (response.rowCount > 1)
            throw new Error("Error de integridad de datos");

        // Convertir respuesta a DTO
        let usuario: UsuarioDTO = new UsuarioDTO();
        usuario.id = response.rows[0].usuario_id;
        usuario.email = response.rows[0].usuario_email;
        usuario.nick = response.rows[0].usuario_nick;
        usuario.name = response.rows[0].usuario_nombres;
        usuario.lastName = response.rows[0].usuario_apellidos;
        usuario.birthDate = new Date(response.rows[0].usuario_nacimiento);

        // Retornar DTO
        return usuario;
    }

    public async getUsuarioHabilidades(id: number): Promise<HabilidadDTO[]> {
        // Preparar consulta
        let query = this._queryBuilder.select(UsuarioHabilidades, []);
        query.join(Habilidad, 'H', equal(prop('UsuarioHabilidades', 'id_habilidad'), prop('H', 'codigo')), ['codigo', 'habilidad', 'descripcion', 'codigo_categoria']);
        query.join(Categoria, 'C', equal(prop('H', 'codigo_categoria'), prop('C', 'codigo')), ['nombre']);
        query.where(equal(prop('UsuarioHabilidades', 'id_usuario'), cons(id)));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        // Cuando no se encuentran habilidades, se retorna un arreglo vacío

        // Convertir respuesta a DTO
        let habilidades: HabilidadDTO[] = [];
        for (let i = 0; i < response.rowCount; i++) {
            let habilidad: HabilidadDTO = new HabilidadDTO();
            habilidad.id = response.rows[i].h_codigo;
            habilidad.name = response.rows[i].h_habilidad;
            habilidad.description = response.rows[i].h_descripcion;
            habilidad.categoryId = response.rows[i].h_codigo_categoria;
            habilidad.categoryName = response.rows[i].c_nombre;
            habilidades.push(habilidad);
        }

        // Retornar DTO
        return habilidades;
    }

    public async updUsuarioPerfil(id: number, data: PerfilModificacionDTO): Promise<any> {
        throw new Error("Method not implemented.");
        const query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'name', 'lastName', 'birthDate']);
        const usuario: UsuarioDTO = new UsuarioDTO();
        //const res = this._queryBuilder.update(Usuario, ['id', 'email', 'nick', 'name', 'lastName', 'birthDate'], data);
        //return res;
    }

    public async updUsuarioAddHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any> {
        throw new Error("Method not implemented.");

        // Preparar consulta

        // Ejecutar consulta

        // Verificar respuesta

        // Convertir respuesta a DTO

        // Retornar DTO
    }

    public async updUsuarioRemoveHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async updUsuarioChangePassAuth(id: number): Promise<any> {
        throw new Error("Method not implemented.");

        // Preparar consulta

        // Ejecutar consulta

        // Verificar respuesta

        // Convertir respuesta a DTO

        // Retornar DTO
    }

    public async updUsuarioChangePass(data: PasswordCambioRealizacionDTO): Promise<any> {
        throw new Error("Method not implemented.");

        // Preparar consulta

        // Ejecutar consulta

        // Verificar respuesta

        // Convertir respuesta a DTO

        // Retornar DTO
    }

    public async getUsuarioConexiones(id: number): Promise<ConexionDTO[]> {
        throw new Error("Method not implemented.");

        // Preparar consulta

        // Ejecutar consulta

        // Verificar respuesta

        // Convertir respuesta a DTO

        // Retornar DTO
    }

    public async insUsuarioConexion(data: ConexionAccion): Promise<any> {
        throw new Error("Method not implemented.");

        // Preparar consulta

        // Ejecutar consulta

        // Verificar respuesta

        // Convertir respuesta a DTO

        // Retornar DTO
    }

    public async updUsuarioConexionAceptar(id: number, connection_id: number): Promise<any> {
        throw new Error("Method not implemented.");

        // Preparar consulta

        // Ejecutar consulta

        // Verificar respuesta

        // Convertir respuesta a DTO

        // Retornar DTO
    }

    public async dltUsuarioConexion(id: number, connection_id: number): Promise<any> {
        throw new Error("Method not implemented.");

        // Preparar consulta

        // Ejecutar consulta

        // Verificar respuesta

        // Convertir respuesta a DTO

        // Retornar DTO
    }
}