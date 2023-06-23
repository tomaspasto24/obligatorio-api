import { SolicitudActiva as SolicitudActivaDTO} from "../dtos/solicitud-activa";
import { SolicitudRelevante as SolicitudRelevanteDTO } from "../dtos/solicitud-relevante";
import { Solicitud as SolicitudDTO } from "../dtos/solicitud";
import { SolicitudCreacion as SolicitudCreacionDTO } from "../dtos/solicitud-creacion";
import { SolicitudAceptacion as SolicitudAceptacionDTO } from "../dtos/solicitud-aceptacion";
import { SolicitudFinalizacion as SolicitudFinalizacionDTO } from "../dtos/solicitud-finalizacion";
import { Chat as ChatDTO } from "../dtos/chat";

export interface ISolicitudesService {
    getSolicitudesRelevantes(): Promise<SolicitudRelevanteDTO[]>;
    getSolicitudesActivas(id: number): Promise<SolicitudActivaDTO[]>;
    getSolicitud(id: number) : Promise<SolicitudDTO>;
    updSolicitud(id: number, data: SolicitudDTO): Promise<any>;
    insSolicitud(data: SolicitudCreacionDTO): Promise<any>;
    updSolicitudAceptar(data: SolicitudAceptacionDTO): Promise<any>;
    updSolicitudFinalizar(data: SolicitudFinalizacionDTO): Promise<any>;
    getSolicitudChat(id: number): Promise<ChatDTO>;
    insSolicitudChatMensaje(id: number, data: string): Promise<any>;
    dltSolicitudChatMensaje(id: number, mensaje: number): Promise<any>;
}