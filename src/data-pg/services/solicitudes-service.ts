import { Chat as ChatDTO } from "../../core/dtos/chat";
import { Solicitud as SolicitudDTO } from "../../core/dtos/solicitud";
import { SolicitudAceptacion as SolicitudAceptacionDTO } from "../../core/dtos/solicitud-aceptacion";
import { SolicitudActiva as SolicitudActivaDTO } from "../../core/dtos/solicitud-activa";
import { SolicitudCreacion as SolicitudCreacionDTO } from "../../core/dtos/solicitud-creacion";
import { SolicitudFinalizacion as SolicitudFinalizacionDTO } from "../../core/dtos/solicitud-finalizacion";
import { SolicitudRelevante as SolicitudRelevanteDTO } from "../../core/dtos/solicitud-relevante";
import { ISolicitudesService } from "../../core/services/isolicitudes-service";
import { IQueryBuilder, InsertQuery, Query } from "../../core/patterns/builder/query-builder";
import { IDatabase } from "../../core/database/idatabase";
import { Database } from "../database/database";
import { PGQueryBuilder, and, cons, equal, in_, like, or, prop } from "../patterns/builder/query-builder";
import { Usuario } from "../../core/models/usuario";
import { Solicitud } from "../../core/models/solicitud";
import { SolicitudHabilidad } from "../../core/models/solicitud-habilidad";
import { Mensaje } from "../../core/models/mensaje";
import { Mensaje as MensajeDTO } from "../../core/dtos/mensaje";
import { EstadoSolicitud } from "../../core/types/estado-solicitud";
import { Habilidad as HabilidadDTO } from "../../core/dtos/habilidad";
import { Habilidad } from "../../core/models/habilidad";
import { Expression } from "../../core/patterns/visitor/expression-visitor";
import { Categoria } from "../../core/models/categoria";
import { UsuarioConectadoUsuario as UsuarioConectadoUsuarioDTO } from "../../core/models/usuario-conectado-usuario";
import { intersection, union } from "lodash";

export class SolicitudesService implements ISolicitudesService {

    private _database: IDatabase;
    private _queryBuilder: IQueryBuilder;

    public constructor() {
        this._database = Database.instance;
        this._queryBuilder = new PGQueryBuilder();
    }

    public async getSolicitudesRelevantes(id: number, count: number): Promise<SolicitudRelevanteDTO[]> {
            let query = this._queryBuilder.select(Solicitud, ['id', 'localizacion', 'fecha_creacion', 'id_creador', 'id_acepta', 'titulo', 'descripcion', 'opinion_creador', 'opinion_acepta', 'estado', 'cerrado_creador', 'cerrado_acepta']);
            query = query.join(Usuario, 'C', equal(prop('Solicitud', 'id_creador'), prop('C', 'id')), ['nombres', 'apellidos']);
            query = query.join(SolicitudHabilidad, 'SH', equal(prop('Solicitud', 'id'), prop('SH', 'id_solicitud')), ['codigo_habilidad']);
            query = query.join(Habilidad, 'H', equal(prop('SH', 'codigo_habilidad', 'habilidad'), prop('H', 'codigo')), ['nombre', 'descripcion', 'codigo_categoria']);
            query = query.join(Categoria, 'CAT', equal(prop('H', 'codigo_categoria'), prop('CAT', 'codigo')), ['nombre']);
            query = query.where(equal(prop('Solicitud', 'estado'), cons(EstadoSolicitud.Abierta)));
            let response = await this._database.query(query.build());
            
            let solicitudes: SolicitudRelevanteDTO[] = [];
            for (let row of response.rows) {
                let solicitud: SolicitudRelevanteDTO = new SolicitudRelevanteDTO();
                solicitud.id = row.solicitud_id;
                solicitud.title = row.solicitud_titulo;
                solicitud.description = row.solicitud_descripcion;
                solicitud.timeStart = row.solicitud_fecha_creacion;
                solicitud.location = row.solicitud_localizacion;
                solicitud.requesterId = row.solicitud_id_creador;
                solicitud.requesterName = row.c_nombres;
                solicitud.requesterLastName = row.c_apellidos;
                solicitud.skill = new HabilidadDTO()
                    .set('id', row.h_codigo)
                    .set('name', row.h_nombre)
                    .set('description', row.h_descripcion)
                    .set('categoryId', row.h_codigo_categoria)
                    .set('categoryName', row.cat_nombre);
                solicitudes.push(solicitud);
            }
    
            // Ordenar usuarios por coeficiente
            solicitudes = solicitudes.filter(s => s.requesterId != id);
            solicitudes = await this.sortSolicitudesRelevantesByCoefficient(id, solicitudes);
            solicitudes = solicitudes.filter((s: SolicitudRelevanteDTO) => (new Date()).getTime() - s.timeStart.getTime() < 86400000);
            // TODO: Filtrar solicitudes por localizacion
            solicitudes = solicitudes.slice(0, count);
    
            return solicitudes;
    }
    
    public async getSolicitudesActivas(id: number): Promise<SolicitudActivaDTO[]> {
        let query = this._queryBuilder.select(Solicitud, ['id', 'localizacion', 'fecha_creacion', 'id_creador', 'id_acepta', 'titulo', 'descripcion', 'opinion_creador', 'opinion_acepta', 'estado', 'cerrado_creador', 'cerrado_acepta']);
        query = query.join(Usuario, 'C', equal(prop('Solicitud', 'id_creador'), prop('C', 'id')), ['nombres', 'apellidos']);
        query = query.join(Usuario, 'A', equal(prop('Solicitud', 'id_acepta'), prop('A', 'id')), ['nombres', 'apellidos']);
        query = query.join(SolicitudHabilidad, 'SH', equal(prop('Solicitud', 'id'), prop('SH', 'id_solicitud')), ['codigo_habilidad']);
        query = query.join(Habilidad, 'H', equal(prop('SH', 'codigo_habilidad', 'habilidad'), prop('H', 'codigo')), ['nombre', 'descripcion', 'codigo_categoria']);
        query = query.join(Categoria, 'CAT', equal(prop('H', 'codigo_categoria'), prop('CAT', 'codigo')), ['nombre']);

        let exp: Expression = or(equal(prop('Solicitud', 'cerrado_creador'), cons(false)), equal(prop('Solicitud', 'cerrado_acepta'), cons(false)));
        exp = and(exp, in_(prop('Solicitud', 'estado'), cons([EstadoSolicitud.Solucionado, EstadoSolicitud.Cancelado])));
        exp = and(exp, equal(prop('Solicitud', 'estado'), cons(EstadoSolicitud.Activa)));

        query = query.where(exp);

        let response = await this._database.query(query.build());

        let solicitudes: SolicitudActivaDTO[] = [];
        for (let row of response.rows) {
            let solicitud: SolicitudActivaDTO = new SolicitudActivaDTO();
            solicitud.id = row.solicitud_id;
            solicitud.title = row.solicitud_titulo;
            solicitud.description = row.solicitud_descripcion;
            solicitud.timeStart = row.solicitud_fecha_creacion;
            solicitud.location = row.solicitud_localizacion;
            solicitud.requesterId = row.solicitud_id_creador;
            solicitud.requesterName = row.c_nombres;
            solicitud.requesterLastName = row.c_apellidos;
            solicitud.providerId = row.solicitud_id_acepta;
            solicitud.providerName = row.a_nombres;
            solicitud.providerLastName = row.a_apellidos;
            solicitud.skill = new HabilidadDTO()
                .set('id', row.h_codigo)
                .set('name', row.h_nombre)
                .set('description', row.h_descripcion)
                .set('categoryId', row.h_codigo_categoria)
                .set('categoryName', row.cat_nombre);
            solicitud.status = row.solicitud_estado;
            solicitudes.push(solicitud);
        }

        return solicitudes;
    }

    public async getSolicitud(id: number): Promise<SolicitudDTO> {
        // Se prepara la consulta
        let query = this._queryBuilder.select(Solicitud, ['id', 'localizacion', 'fecha_creacion', 'id_creador', 'id_acepta', 'titulo', 'descripcion', 'opinion_creador', 'opinion_acepta', 'estado']);
        // Datos del usuario creador
        query = query.join(Usuario, 'C', equal(prop('Solicitud', 'id_creador'), prop('C', 'id')), ['nombres', 'apellidos']);
        // Datos del usuario que acepta      ¿Que pasa si la solicitud no ha sido aceptada?
        query = query.join(Usuario, 'A', equal(prop('Solicitud', 'id_acepta'), prop('A', 'id')), ['nombres', 'apellidos']);

        // Obtengo el id de las habilidades 
        query = query.join(SolicitudHabilidad, 'SH', equal(prop('Solicitud', 'id'), prop('SH', 'id_solicitud')), ['codigo_habilidad']);

        // Obtengo los datos de la Habilidad
        query = query.join(Habilidad, 'HAB', equal(prop('SH', 'codigo_habilidad'), prop('HAB', 'codigo')), ['habilidad', 'descripcion', 'codigo_categoria']);

        // Obtengo los datos de la Categoria
        query = query.join(Categoria, 'CAT', equal(prop('HAB', 'codigo_categoria'), prop('CAT', 'codigo')), ['nombre'] );

        query.where(equal(prop('Solicitud', 'id'), cons(id)));

        // Se ejecuta la consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("Solicitud no encontrada");
        if (response.rowCount > 1)
            throw new Error("Error de integridad de datos");

        // Convertir respuesta a HabilidadDTO
        let habilidad: HabilidadDTO = new HabilidadDTO();
        habilidad.id = response.rows[0].sh_codigo_habilidad;
        habilidad.name = response.rows[0].hab_habilidad;
        habilidad.description = response.rows[0].hab_descripcion;
        habilidad.categoryId = response.rows[0].hab_codigo_categoria;
        habilidad.categoryName = response.rows[0].cat_nombre;

        // Convertir respuesta a SolicitudDTO
        let solicitud: SolicitudDTO = new SolicitudDTO();
        solicitud.id = response.rows[0].solicitud_id;
        solicitud.location = response.rows[0].solicitud_localizacion;
        solicitud.title = response.rows[0].solicitud_titulo
        solicitud.description = response.rows[0].solicitud_descripcion;
        solicitud.timeStart = new Date(response.rows[0].solicitud_fecha_creacion);
        solicitud.skill = habilidad;
        solicitud.status = response.rows[0].solicitud_estado;

        solicitud.requesterId = response.rows[0].solicitud_id_creador;
        solicitud.requesterName = response.rows[0].c_nombres;
        solicitud.requesterLastName = response.rows[0].c_apellidos;

        solicitud.providerId = response.rows[0].solicitud_id_acepta;
        solicitud.providerName = response.rows[0].a_nombres;
        solicitud.providerLastName = response.rows[0].a_apellidos
        
        // Retornar Solicitud
        return solicitud;
    }

    public async updSolicitud(id: number, data: SolicitudCreacionDTO): Promise<any> {
        // Se prepara la consulta
        let queryA = this._queryBuilder.select(Solicitud, ['id_creador', 'estado']);
        queryA = queryA.where(equal(prop('Solicitud', 'id'), cons(id)));

        // Se ejecuta la consulta
        let responseA = await this._database.query(queryA.build());

        // Se verifica la respuesta
        if (responseA.rowCount == 0)
            throw new Error("Solicitud no encontrada");
        if (responseA.rowCount > 1)
            throw new Error("Error de integridad de datos");

        // Se verifica que la solicitud este abierta o activa
        let record = responseA.rows[0];
        if (record.solicitud_estado != 'activa' && record.solicitud_estado != 'abierta')
            throw new Error("La solicitud no esta abierta");
        
        // Se verifica que el usuario sea el creador de la solicitud
        if (record.solicitud_id_creador != data.requesterId)
            throw new Error("El usuario no es el creador de la solicitud");

        // Se prepara la consulta
        let query = this._queryBuilder.update(Solicitud, ['localizacion', 'titulo', 'descripcion'], [data.location, data.title, data.description]);
        query = query.where(equal(prop('Solicitud', 'id'), cons(id)));

        // Se ejecuta la consulta
        let response = await this._database.query(query.build());

        // Se verifica la respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo actualizar la solicitud");
    }

    public async insSolicitud(data: SolicitudCreacionDTO): Promise<any> {
        // Se prepara la consulta
        let queries: Query[] = [];
        let queryA: InsertQuery = this._queryBuilder.insert(Solicitud, ['localizacion', 'fecha_creacion', 'id_creador', 'titulo', 'descripcion', 'estado', 'cerrado_creador', 'cerrado_acepta']);
        queryA = queryA.values([data.location, new Date(), data.requesterId, data.title, data.description, 'abierta', false, false]);
        queryA = queryA.returning('id', 'solicitud_insertada');
        queries.push(queryA);

        let queryB: InsertQuery = this._queryBuilder.insert(SolicitudHabilidad, ['id_solicitud', 'codigo_habilidad']);
        queryB = queryB.from("solicitud_insertada", [prop("solicitud_insertada", "id"), cons(data.skill)]);
        queries.push(queryB);

        // Se ejecuta la consulta
        let response = await this._database.transaction(queries);

        // Se verifica la respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo agregar la solicitud");
    }

    public async updSolicitudAceptar(data: SolicitudAceptacionDTO): Promise<any> {
        // Se prepara la consulta
        let queryA = this._queryBuilder.select(Solicitud, ['id_creador', 'estado']);
        queryA = queryA.where(equal(prop('Solicitud', 'id'), cons(data.solicitudId)));

        // Se ejecuta la consulta
        let response = await this._database.query(queryA.build());
        
        // Se verifica la respuesta
        if (response.rowCount == 0)
            throw new Error("Solicitud no encontrada"); 
        if (response.rows[0].solicitud_estado != 'abierta') 
            throw new Error("La solicitud ya no se encuentra disponible");
        if (response.rows[0].solicitud_id_creador == data.providerId)
            throw new Error("No puedes aceptar tu propia solicitud");

        // Se prepara la consulta
        let query = this._queryBuilder.update(Solicitud, ['id_acepta', 'estado'], [data.providerId, 'activa']);
        query = query.where(equal(prop('Solicitud', 'id'), cons(data.solicitudId)));

        // Se ejecuta la consulta
        response = await this._database.query(query.build());

        // Se verifica la respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo actualizar la solicitud");
    }

    public async updSolicitudFinalizar(data: SolicitudFinalizacionDTO): Promise<any> {
        // Se prepara la consulta
        let queryA = this._queryBuilder.select(Solicitud, ['id_creador', 'id_acepta', 'cerrado_creador', 'cerrado_acepta', 'estado']);
        queryA = queryA.where(equal(prop('Solicitud', 'id'), cons(data.requestId)));

        // Se ejecuta la consulta
        let response = await this._database.query(queryA.build());

        // Se verifica la respuesta
        if (response.rowCount != 1)
            throw new Error("No se pudo actualizar la solicitud");
            
        let solicitud = response.rows[0];
        if ((solicitud.solicitud_cerrado_acepta || solicitud.solicitud_id_acepta !== null ) && solicitud.solicitud_cerrado_creador)
            throw new Error("No se pudo actualizar la solicitud");
        
        let suffix: string = "";
        let estado: EstadoSolicitud = EstadoSolicitud.Activa;
        if (solicitud.solicitud_id_creador == data.userId) {
            if (solicitud.solicitud_cerrado_creador)
                throw new Error("No se pudo actualizar la solicitud");
            suffix = "_creador";
            if (solicitud.solicitud_cerrado_acepta)
                estado = data.status == solicitud.solicitud_estado ? data.status! : EstadoSolicitud.Disputado;
            else
                estado = data.status!;
        } else if (solicitud.solicitud_id_acepta == data.userId) {
            if (solicitud.solicitud_cerrado_acepta)
                throw new Error("No se pudo actualizar la solicitud");
            suffix = "_acepta";
            if (solicitud.solicitud_cerrado_creador)
                estado = data.status == solicitud.solicitud_estado ? data.status! : EstadoSolicitud.Disputado;
            else
                estado = data.status!;
        } else {
            throw new Error("No se pudo actualizar la solicitud");
        }

        let queryB = this._queryBuilder.update(Solicitud, ['cerrado' + suffix, 'opinion' + suffix, 'estado'], [true, data.opinion, estado]);
        queryB = queryB.where(equal(prop('Solicitud', 'id'), cons(data.requestId)));

        // Se ejecuta la consulta
        response = await this._database.query(queryB.build());

        // Se verifica la respuesta
        if (response.rowCount == 0)
            throw new Error("No se pudo actualizar la solicitud");
    }

    public async getSolicitudChat(id: number, activeUserId: number): Promise<ChatDTO> {
        // Se prepara la consulta
        let query = this._queryBuilder.select(Solicitud, ['titulo', 'estado', 'id_creador', 'id_acepta']);
        query = query.join(Usuario, 'UC', equal(prop('UC', 'id'), prop('Solicitud', 'id_creador')), ['nombres', 'apellidos']);
        query = query.join(Usuario, 'UA', equal(prop('UA', 'id'), prop('Solicitud', 'id_acepta')), ['nombres', 'apellidos']);
        query = query.where(equal(prop('Solicitud', 'id'), cons(id)));
       
        // Se ejecuta la consulta
        let result = await this._database.query(query.build());

        // Se verifica la respuesta
        if (result.rowCount != 1)
            throw new Error("No se pudo obtener la solicitud");

        // Reglas de negocio
        let solicitud = result.rows[0];
        if (solicitud.solicitud_estado != EstadoSolicitud.Activa)
            throw new Error("La solicitud no se encuentra activa");
        if (solicitud.solicitud_id_creador != activeUserId && solicitud.solicitud_id_acepta != activeUserId)
            throw new Error("El usuario no tiene permisos para acceder a la solicitud");
        
        // Se crea el chat
        let chat: ChatDTO = new ChatDTO();       
        chat.requestId = id;
        chat.requestTitle = result.rows[0].solicitud_titulo;
        chat.requestStatus = result.rows[0].solicitud_estado;
        chat.requesterId = result.rows[0].solicitud_id_creador;
        chat.requesterName = result.rows[0].uc_nombres;
        chat.requesterLastName = result.rows[0].uc_apellidos;
        chat.providerId = result.rows[0].solicitud_id_acepta;
        chat.providerName = result.rows[0].ua_nombres;
        chat.providerLastName = result.rows[0].ua_apellidos;

        // Se prepara la consulta
        query = this._queryBuilder.select(Mensaje, ['id', 'marca', 'contenido', 'eliminado', 'id_emisor']);
        query = query.join(Usuario, 'U', equal(prop('U', 'id'), prop('Mensaje', 'id_emisor')), ['nombres', 'apellidos']);
        query = query.where(equal(prop('Mensaje', 'solicitud_id'), cons(id)));
       
        // Se ejecuta la consulta
        result = await this._database.query(query.build());

        // Convertir la respuesta a Mensaje
        let mensajes: MensajeDTO[] = []; 
        for (let i = 0; i < result.rowCount; i++) {
            let mensaje: MensajeDTO = new MensajeDTO();
            mensaje.messageId = result.rows[i].mensaje_id;
            mensaje.timeStamp = new Date(result.rows[i].mensaje_marca);
            mensaje.contents = result.rows[i].mensaje_eliminado ? '~Eliminado~' : result.rows[i].mensaje_contenido;
            mensaje.deleted = result.rows[i].mensaje_eliminado;
            mensaje.requestId = id;
            mensaje.senderId = result.rows[i].mensaje_id_emisor;
            mensaje.senderName = result.rows[i].u_nombres;
            mensaje.senderLastName = result.rows[i].u_apellidos
            mensajes.push(mensaje);
        }
        chat.messages = mensajes.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());

        return chat;
    }
    
    public async insSolicitudChatMensaje(id: number, data: string, userId: number): Promise<any> {
        // Se prepara la consulta
        let queryA = this._queryBuilder.select(Solicitud, ['id_creador', 'id_acepta', 'estado']);
        queryA = queryA.where(equal(prop('Solicitud', 'id'), cons(id)));

        // Se ejecuta la consulta
        let response = await this._database.query(queryA.build());

        // Se verifica la respuesta
        if (response.rowCount != 1)
            throw new Error("No se pudo actualizar la solicitud");

        // Reglas de negocio
        let solicitud = response.rows[0];
        if (solicitud.solicitud_id_creador != userId && solicitud.solicitud_id_acepta != userId)
            throw new Error("No se pudo actualizar la solicitud");
        if (solicitud.solicitud_estado != EstadoSolicitud.Activa)
            throw new Error("La solicitud no se encuentra activa");

        // Se prepara la consulta
        let query = this._queryBuilder.insert(Mensaje, ['solicitud_id', 'contenido', 'marca', 'eliminado', 'id_emisor']);
        query = query.values([id, data, new Date(), false, userId]);
        
        // Se ejecuta la consulta
        response = await this._database.query(query.build());

        return response;
    }
    
    public async dltSolicitudChatMensaje(activeUserId: number, id: number): Promise<any> {
        // Se prepara la consulta
        let queryA = this._queryBuilder.select(Mensaje, ['id_emisor']);
        queryA = queryA.join(Solicitud, 'S', equal(prop('S', 'id'), prop('Mensaje', 'solicitud_id')), ['estado']);
        queryA = queryA.where(equal(prop('Mensaje', 'id'), cons(id)));

        // Se ejecuta la consulta
        let response = await this._database.query(queryA.build());

        // Se verifica la respuesta 
        if (response.rowCount != 1)
            throw new Error("No se pudo actualizar la solicitud");

        // Reglas de negocio
        let mensaje = response.rows[0];
        if (mensaje.mensaje_id_emisor != activeUserId)
            throw new Error("No se pudo actualizar la solicitud");
        if (mensaje.mensaje_eliminado)
            throw new Error("El mensaje ya se encuentra eliminado");
        if (mensaje.s_estado != EstadoSolicitud.Activa)
            throw new Error("La solicitud no se encuentra activa");

        // Se prepara la consulta
        let query = this._queryBuilder.update(Mensaje, ['eliminado'], [true]);
        query = query.where(equal(prop('Mensaje', 'id'), cons(id)));

        // Se ejecuta la consulta
        response = await this._database.query(query.build());

        return response;
    }


    private async sortSolicitudesRelevantesByCoefficient(currentUserId: number, solicitudes: SolicitudRelevanteDTO[]): Promise<SolicitudRelevanteDTO[]> {
        // Preparar consulta
        let query = this._queryBuilder.select(UsuarioConectadoUsuarioDTO, ['id_usuario1', 'id_usuario2']);

        // Ejecutar consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            return solicitudes;

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
        const filteredSolicitudes: SolicitudRelevanteDTO[] = solicitudes.filter(solicitud => !currentConnections.includes(solicitud.requesterId));

        const orderedSolicitudes: IOrderedRequests[] = filteredSolicitudes.map(solicitud => { return { solicitud: solicitud, coefficient: 0 } });
        for (const solicitud of orderedSolicitudes) {
            const user1Connections: number[] = connections.get(currentUserId) || [];
            const user2Connections: number[] = connections.get(solicitud.solicitud.id) || [];

            const commonConnections: number[] = intersection(user1Connections, user2Connections);
            const totalConnections: number[] = union(user1Connections, user2Connections);

            const coefficient: number = commonConnections.length / totalConnections.length;
            solicitud.coefficient = coefficient;
        }

        // Ordenar usuarios por coeficiente
        orderedSolicitudes.sort((a, b) => b.coefficient - a.coefficient);

        // Retornar usuarios ordenados
        return orderedSolicitudes.map(solicitud => solicitud.solicitud);

        interface IOrderedRequests {
            coefficient: number;
            solicitud: SolicitudRelevanteDTO;
        }
    }
}