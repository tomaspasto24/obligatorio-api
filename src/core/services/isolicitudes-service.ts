import { SolicitudActiva as SolicitudActivaDTO} from "../dtos/solicitud-activa";
import { SolicitudRelevante as SolicitudRelevanteDTO } from "../dtos/solicitud-relevante";
import { Solicitud as SolicitudDTO } from "../dtos/solicitud";
import { SolicitudCreacion as SolicitudCreacionDTO } from "../dtos/solicitud-creacion";
import { SolicitudAceptacion as SolicitudAceptacionDTO } from "../dtos/solicitud-aceptacion";
import { SolicitudFinalizacion as SolicitudFinalizacionDTO } from "../dtos/solicitud-finalizacion";
import { Chat as ChatDTO } from "../dtos/chat";
import { IDBService } from "./idb-service";

export interface ISolicitudesService extends IDBService {
    getSolicitudesRelevantes(id: number, count: number): Promise<SolicitudRelevanteDTO[]>;
    getSolicitudesActivas(id: number): Promise<SolicitudActivaDTO[]>;
    getSolicitud(id: number) : Promise<SolicitudDTO>;
    updSolicitud(id: number, data: SolicitudCreacionDTO): Promise<any>;
    insSolicitud(data: SolicitudCreacionDTO): Promise<any>;
    updSolicitudAceptar(data: SolicitudAceptacionDTO): Promise<any>;
    updSolicitudFinalizar(data: SolicitudFinalizacionDTO): Promise<any>;
    getSolicitudChat(id: number, activeUserId: number): Promise<ChatDTO>;
    insSolicitudChatMensaje(id: number, data: string, user_id: number): Promise<any>;
    dltSolicitudChatMensaje(activeUserId: number, id: number): Promise<any>;
}