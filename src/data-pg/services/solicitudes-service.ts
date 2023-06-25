import { Chat } from "../../core/dtos/chat";
import { Solicitud as SolicitudDTO } from "../../core/dtos/solicitud";
import { SolicitudAceptacion } from "../../core/dtos/solicitud-aceptacion";
import { SolicitudActiva } from "../../core/dtos/solicitud-activa";
import { SolicitudCreacion } from "../../core/dtos/solicitud-creacion";
import { SolicitudFinalizacion } from "../../core/dtos/solicitud-finalizacion";
import { SolicitudRelevante } from "../../core/dtos/solicitud-relevante";
import { ISolicitudesService } from "../../core/services/isolicitudes-service";
import { IQueryBuilder } from "../../core/patterns/builder/query-builder";
import { IDatabase } from "../../core/database/idatabase";
import { Database } from "../database/database";
import { PGQueryBuilder, and, cons, equal, in_, like, or, prop } from "../patterns/builder/query-builder";
import { Usuario } from "../../core/models/usuario";
import { Solicitud } from "../../core/models/solicitud";
import { SolicitudHabilidad } from "../../core/models/solicitud-habilidad";


export class SolicitudesService implements ISolicitudesService {

    private _database: IDatabase;
    private _queryBuilder: IQueryBuilder;

    public constructor() {
        this._database = Database.instance;
        this._queryBuilder = new PGQueryBuilder();
    }

    public async getSolicitudesRelevantes(id: number): Promise<SolicitudRelevante[]> {
        throw new Error("Method not implemented.");
    }
    public async getSolicitudesActivas(id: number): Promise<SolicitudActiva[]> {
        throw new Error("Method not implemented.");
    }

    public async getSolicitud(id: number): Promise<SolicitudDTO> {
        // Se prepara la consulta
        let query = this._queryBuilder.select(Solicitud, ['id', 'localizacion', 'fecha_creacion', 'id_creador', 'id_acepta', 'titulo', 'descripcion', 'opinion_creador', 'opinion_acepta', 'estado']);
        // Datos del usuario creador
        query.join(Usuario, 'C', equal(prop('Solicitud', 'id_creador'), prop('C', 'id')),  ['nombres', 'apellidos']);
        // Datos del usuario que acepta      ¿Que pasa si la solicitud no ha sido aceptada?
        query.join(Usuario, 'A', equal(prop('Solicitud', 'id_acepta'), prop('A', 'id')),  ['nombres', 'apellidos']);

        // Obtengo el id de las habilidades 
        query.join(SolicitudHabilidad, 'SH', equal(prop('Solicitud', 'id'), prop('SH', 'id_solicitud')),  ['codigo_habilidad']);
     
        query.where(equal(prop('Solicitud', 'id'), cons(id)));

        // Se ejecuta la consulta
        let response = await this._database.query(query.build());

        // Verificar respuesta
        if (response.rowCount == 0)
            throw new Error("Solicitud no encontrada");
        if (response.rowCount > 1)
            throw new Error("Error de integridad de datos");

        // Convertir respuesta a SolicitudDTO
        let solicitud: SolicitudDTO = new SolicitudDTO();
        solicitud.id = response.rows[0].solicitud_id;
        solicitud.location = response.rows[0].solicitud_localizacion;
        solicitud.title = response.rows[0].solicitud_titulo
        solicitud.description = response.rows[0].solicitud_descripcion;
        solicitud.timeStart = new Date(response.rows[0].solicitud_fecha_creacion);
        solicitud.skill
        solicitud.status = response.rows[0].solicitud_estado; //De tipo enum ?
        
        solicitud.requesterId = response.rows[0].solicitud_id_creador;
        solicitud.requesterName = response.rows[0].c_nombres;
        solicitud.requesterLastName = response.rows[0].c_apellidos;

        solicitud.providerId = response.rows[0].solicitud_id_acepta;
        solicitud.providerName = response.rows[0].a_nombres;
        solicitud.providerLastName = response.rows[0].a_apellidos;
       
        solicitud.requesterProviderConnection

        solicitud.activeUserRol

        // Retornar Solicitud
        return solicitud;
    }

    public async updSolicitud(id: number, data: SolicitudDTO): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public async insSolicitud(data: SolicitudCreacion): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public async updSolicitudAceptar(data: SolicitudAceptacion): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public async updSolicitudFinalizar(data: SolicitudFinalizacion): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public async getSolicitudChat(id: number): Promise<Chat> {
        throw new Error("Method not implemented.");
    }
    public async insSolicitudChatMensaje(id: number, data: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public async dltSolicitudChatMensaje(id: number, mensaje: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

}