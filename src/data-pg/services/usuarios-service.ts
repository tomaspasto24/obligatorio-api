import { IDatabase } from "../../core/database/idatabase";
import { Habilidad as HabilidadDTO } from "../../core/dtos/habilidad";
import { PasswordCambioRealizacion as PasswordCambioRealizacionDTO } from "../../core/dtos/password-cambio-realizacion";
import { PerfilModificacion as PerfilModificacionDTO } from "../../core/dtos/perfil-modificacion";
import { Usuario as UsuarioDTO } from "../../core/dtos/usuario";
import { UsuarioFiltro as UsuarioFiltroDTO } from "../../core/dtos/usuario-filtro";
import { UsuarioHabilidadAccion as UsuarioHabilidadAccionDTO } from "../../core/dtos/usuario-habilidad-accion";
import { IQueryBuilder, InsertQuery, Query } from "../../core/patterns/builder/query-builder";
import { IUsuariosService } from "../../core/services/iusuarios-service";
import { Database } from "../database/database";
import { PGQueryBuilder, and, cons, equal, in_, like, or, prop } from "../patterns/builder/query-builder";
import { Usuario } from "../../core/models/usuario";
import { Expression } from "../../core/patterns/visitor/expression-visitor";
import { UsuarioHabilidades } from "../../core/models/usuario-habilidades";
import { Conexion as ConexionDTO } from "../../core/dtos/conexion";
import { ConexionAccion as ConexionAccionDTO } from "../../core/dtos/conexion-accion";
import { Habilidad } from "../../core/models/habilidad";
import { Categoria } from "../../core/models/categoria";
import { Registro as RegistroDTO } from "../../core/dtos/registro";
import { UsuarioConectadoUsuario } from "../../core/models/usuario-conectado-usuario";
import { intersection, union } from "lodash";

export class UsuariosService implements IUsuariosService {
    private _database: IDatabase;
    private _queryBuilder: IQueryBuilder;

    public constructor() {
        this._database = Database.instance;
        this._queryBuilder = new PGQueryBuilder();
    }

    public async getUsuariosFiltered(activeUserId: number, filter: UsuarioFiltroDTO, count: number): Promise<UsuarioDTO[]> {
        // Preparar consulta
        let query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'nombres', 'apellidos']);
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
        if (filter.skills?.length > 0) stack.push(
            in_(
                prop('H', 'id_habilidad'), 
                cons(filter.skills)
                ));
        let where: Expression | null = stack.length > 0 ? stack.pop()! : null;
        while (stack.length > 0) {
            where = and(stack.pop()!, where!);
        }
        query = query.join(UsuarioHabilidades, 'H', equal(prop('Usuario', 'id'), prop('H', 'id_usuario')));
        query = where ? query.where(where) : query;
        query = query.group([['Usuario', ['id', 'email', 'nick', 'nombres', 'apellidos']]]);

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
            usuarios.push(usuario);
        }

        // Ordenar usuarios por coeficiente
        usuarios = usuarios.filter(u => u.id != activeUserId);
        usuarios = await this.sortUsuariosByCoefficient(activeUserId, usuarios);
        usuarios = usuarios.slice(0, count);

        // Retornar DTO
        return usuarios;
    }

    public async getUsuarioById(id: number): Promise<UsuarioDTO> {
        // Preparar consulta
        let query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'nombres', 'apellidos']);
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

        // Retornar DTO
        return usuario;
    }

    public async insUsuario(data: RegistroDTO): Promise<any> {
        // Preparar consultas
        let queries: Query[] = [];
        let queryA: InsertQuery = this._queryBuilder.insert(Usuario, ['email', 'nick', 'nombres', 'apellidos', 'contraseña', 'eliminado', "fecha_registro"])
        queryA = queryA.values([data.email, data.nick, data.name, data.lastName, data.password, false, new Date()]);
        queryA = queryA.returning("id", "usuario_insertado");
        queries.push(queryA);
        for (let i = 0; i < data.skills.length; i++) {
            let queryB: InsertQuery = this._queryBuilder.insert(UsuarioHabilidades, ['id_usuario', 'id_habilidad']);
            queryB = queryB.from("usuario_insertado", [prop("usuario_insertado", "id"), cons(data.skills[i])]);
            queries.push(queryB);
        }

        // Ejecutar consultas
        let response = await this._database.transaction(queries);

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo crear el usuario");
    }

    public async getUsuarioByLogin(email: string, passwordHash: string): Promise<UsuarioDTO> {
        // Preparar consulta
        let query = this._queryBuilder.select(Usuario, ['id', 'email', 'nick', 'nombres', 'apellidos', 'contraseña']);
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
        // Preparar consulta
        let query = this._queryBuilder.update(Usuario, ['email', 'nick', 'nombres', 'apellidos'], [data.email, data.nick, data.name, data.lastName]);
        query = query.where(equal(prop('Usuario', 'id'), cons(id)));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo actualizar el usuario");
    }

    public async updUsuarioAddHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any> {
        // Preparar consulta
        let query = this._queryBuilder.insert(UsuarioHabilidades, ['id_usuario', 'id_habilidad']);
        query = query.values([data.userId, data.skillId]);

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo agregar la habilidad");
    }

    public async updUsuarioRemoveHabilidad(data: UsuarioHabilidadAccionDTO): Promise<any> {
        // Preparar consulta
        let query = this._queryBuilder.delete(UsuarioHabilidades);
        query = query.where(and(equal(prop('UsuarioHabilidades', 'id_usuario'), cons(data.userId)), equal(prop('UsuarioHabilidades', 'id_habilidad'), cons(data.skillId))));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo eliminar la habilidad");
    }

    public async updUsuarioChangePass(data: PasswordCambioRealizacionDTO): Promise<any> {
        // Preparar consulta
        let query = this._queryBuilder.update(Usuario, ['contraseña'], [data.password]);
        query = query.where(equal(prop('Usuario', 'id'), cons(data.userId)));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo cambiar la contraseña");
    }

    public async getUsuarioConexiones(id: number): Promise<ConexionDTO[]> {
        // Preparar consulta
        let query = this._queryBuilder.select(UsuarioConectadoUsuario, ['id_usuario1', 'id_usuario2', 'aceptada']);
        query = query.join(Usuario, 'U1', equal(prop('UsuarioConectadoUsuario', 'id_usuario1'), prop('U1', 'id')), ['email', 'nick', 'nombres', 'apellidos']);
        query = query.join(Usuario, 'U2', equal(prop('UsuarioConectadoUsuario', 'id_usuario2'), prop('U2', 'id')), ['email', 'nick', 'nombres', 'apellidos']);
        query.where(or(equal(prop('UsuarioConectadoUsuario', 'id_usuario1'), cons(id)), equal(prop('UsuarioConectadoUsuario', 'id_usuario2'), cons(id))));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        // Cuando no se encuentran conexiones, se retorna un arreglo vacío

        // Convertir respuesta a DTO
        let conexiones: ConexionDTO[] = [];
        for (let i = 0; i < response.rowCount; i++) {
            let conexion: ConexionDTO = new ConexionDTO();
            conexion.userId = response.rows[i].usuarioconectadousuario_id_usuario1 == id ? response.rows[i].usuarioconectadousuario_id_usuario2 : response.rows[i].usuarioconectadousuario_id_usuario1;
            conexion.email = response.rows[i].usuarioconectadousuario_id_usuario1 == id ? response.rows[i].u2_email : response.rows[i].u1_email;
            conexion.nick = response.rows[i].usuarioconectadousuario_id_usuario1 == id ? response.rows[i].u2_nick : response.rows[i].u1_nick;
            conexion.name = response.rows[i].usuarioconectadousuario_id_usuario1 == id ? response.rows[i].u2_nombres : response.rows[i].u1_nombres;
            conexion.lastName = response.rows[i].usuarioconectadousuario_id_usuario1 == id ? response.rows[i].u2_apellidos : response.rows[i].u1_apellidos;
            conexion.aceptada = response.rows[i].usuarioconectadousuario_id_aceptada;
            conexiones.push(conexion);
        }

        // Retornar DTO
        return conexiones;
    }

    public async insUsuarioConexion(data: ConexionAccionDTO): Promise<any> {
        // Preparar consulta
        let query = this._queryBuilder.insert(UsuarioConectadoUsuario, ['id_usuario1', 'id_usuario2', 'aceptada']);
        query = query.values([Math.min(data.activeUserId, data.passiveUserId), Math.max(data.activeUserId, data.passiveUserId), false]);

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo agregar la conexión");
    }

    public async updUsuarioConexionAceptar(id: number, connection_id: number): Promise<any> {
        // Preparar consulta
        let query = this._queryBuilder.update(UsuarioConectadoUsuario, ['aceptada'], [true]);
        let where: Expression[] = [];
        where.push(and(equal(prop('UsuarioConectadoUsuario', 'id_usuario1'), cons(connection_id)), equal(prop('UsuarioConectadoUsuario', 'id_usuario2'), cons(id))));
        where.push(and(equal(prop('UsuarioConectadoUsuario', 'id_usuario1'), cons(id)), equal(prop('UsuarioConectadoUsuario', 'id_usuario2'), cons(connection_id))));
        query = query.where(or(where[0], where[1]));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo aceptar la conexión");
    }

    public async dltUsuarioConexion(id: number, connection_id: number): Promise<any> {
        // Preparar consulta
        let query = this._queryBuilder.delete(UsuarioConectadoUsuario);
        let where: Expression[] = [];
        where.push(and(equal(prop('UsuarioConectadoUsuario', 'id_usuario1'), cons(connection_id)), equal(prop('UsuarioConectadoUsuario', 'id_usuario2'), cons(id))));
        where.push(and(equal(prop('UsuarioConectadoUsuario', 'id_usuario1'), cons(id)), equal(prop('UsuarioConectadoUsuario', 'id_usuario2'), cons(connection_id))));
        query = query.where(or(where[0], where[1]));

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo eliminar la conexión");
    }

    private async sortUsuariosByCoefficient(currentUserId: number, users: UsuarioDTO[]): Promise<UsuarioDTO[]> {
        // Preparar consulta
        let query = this._queryBuilder.select(UsuarioConectadoUsuario, ['id_usuario1', 'id_usuario2']);

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            return users;

        // Calcular coeficiente de cada usuario
        const connections: Map<number, number[]> = new Map<number, number[]>();
        for (let i = 0; i < response.rowCount; i++) {
            const user1 = response.rows[i].usuarioconectadousuario_id_usuario1;
            const user2 = response.rows[i].usuarioconectadousuario_id_usuario2;

            if (!connections.has(user1))
                connections.set(user1, []);
            if (!connections.has(user2))
                connections.set(user2, []);

            connections.get(user1)!.push(user2);
            connections.get(user2)!.push(user1);
        }

        // Filtrar conexiones del usuario actual
        const currentConnections: number[] = connections.get(currentUserId) || [];
        const filteredUsers: UsuarioDTO[] = users.filter(user => !currentConnections.includes(user.id));

        const orderedUsers: IOrderedUsers[] = filteredUsers.map(user => { return { user: user, coefficient: 0 } });
        for (const user of orderedUsers) {
            const user1Connections: number[] = connections.get(currentUserId) || [];
            const user2Connections: number[] = connections.get(user.user.id) || [];

            const commonConnections: number[] = intersection(user1Connections, user2Connections);
            const totalConnections: number[] = union(user1Connections, user2Connections);

            const coefficient: number = commonConnections.length / totalConnections.length;
            user.coefficient = coefficient;
        }

        // Ordenar usuarios por coeficiente
        orderedUsers.sort((a, b) => b.coefficient - a.coefficient);

        // Retornar usuarios ordenados
        return orderedUsers.map(user => user.user);

        interface IOrderedUsers {
            coefficient: number;
            user: UsuarioDTO;
        }
    }
}