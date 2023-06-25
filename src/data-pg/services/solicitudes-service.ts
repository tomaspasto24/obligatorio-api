import { Chat } from "../../core/dtos/chat";
import { Solicitud } from "../../core/dtos/solicitud";
import { SolicitudAceptacion } from "../../core/dtos/solicitud-aceptacion";
import { SolicitudActiva } from "../../core/dtos/solicitud-activa";
import { SolicitudCreacion } from "../../core/dtos/solicitud-creacion";
import { SolicitudFinalizacion } from "../../core/dtos/solicitud-finalizacion";
import { SolicitudRelevante } from "../../core/dtos/solicitud-relevante";
import { ISolicitudesService } from "../../core/services/isolicitudes-service";

export class SolicitudesService implements ISolicitudesService {
    public async getSolicitudesRelevantes(id: number): Promise<SolicitudRelevante[]> {
        throw new Error("Method not implemented.");
    }
    public async getSolicitudesActivas(id: number): Promise<SolicitudActiva[]> {
        throw new Error("Method not implemented.");
    }
    public async getSolicitud(id: number): Promise<Solicitud> {
        throw new Error("Method not implemented.");
    }
    public async updSolicitud(id: number, data: Solicitud): Promise<any> {
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