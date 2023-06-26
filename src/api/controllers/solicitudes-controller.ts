import { ISolicitudesService } from "../../core/services/isolicitudes-service";
import { DBServiceFactory } from "../../data-pg/patterns/factory/db-service-factory";
import { Solicitud } from "../../core/dtos/solicitud";
import { SolicitudCreacion } from "../../core/dtos/solicitud-creacion";
import { IRequestWrapper } from "../../core/types/request-wrapper";
import { SolicitudAceptacion } from "../../core/dtos/solicitud-aceptacion";
import { SolicitudFinalizacion } from "../../core/dtos/solicitud-finalizacion";
import { MensajeCreacion } from "../../core/dtos/mensaje-creacion";
import { Chat } from "../../core/dtos/chat";

export class SolicitudesController {

    static readonly getSolicitud = async (req: any, res: any) => {
        try {
            const id: number = req.params.id;
            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            const solicitud: Solicitud = await solicitudesService.getSolicitud(id);

            res.status(200).json(solicitud);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get solicitud' });
        }
    }

    static readonly insSolicitud = async (req: any, res: any) => {
        try {
            const body: SolicitudCreacion = SolicitudCreacion.fromJson((req.body as IRequestWrapper).body);

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.insSolicitud(body);

            return res.status(200).json({ message: 'Solicitud agregada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Error al insertar solicitud' });
        }
    }

    static readonly updSolicitud = async (req: any, res: any) => { //by id
        try {
            const id: number = req.params.id;
            const body: Solicitud = Solicitud.fromJson((req.body as IRequestWrapper).body);

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.updSolicitud(id, body);

            return res.status(200).json({ message: 'Solicitud actualizada' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar solicitud' });
        }
    }

    static readonly updSolicitudAceptar = async (req: any, res: any) => {
        try {
            const body: SolicitudAceptacion = SolicitudAceptacion.fromJson((req.body as IRequestWrapper).body);

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.updSolicitudAceptar(body);

            return res.status(200).json({ message: 'Solicitud actualizada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar solicitud' });
        }
    }

    static readonly getSolicitudChat = async (req: any, res: any) => {
        try {
            const id: number = req.params.id;
            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            const solicitud: Chat = await solicitudesService.getSolicitudChat(id);

            res.status(200).json(solicitud);
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to get solicitudChat' });
        }
    }

    static readonly insSolicitudChatMensaje = async (req: any, res: any) => {
        try {
            const solId: number = req.params.id;
            const activeUserId: number = req.body.userId
            const body: MensajeCreacion = MensajeCreacion.fromJson((req.body as IRequestWrapper).body);

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.insSolicitudChatMensaje(solId, body.contents, activeUserId);

            return res.status(200).json({ message: 'SolicitudChatMensaje agregada' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al insertar usuario' });
        }
    }

    static readonly dltSolicitudChatMensaje = async (req: any, res: any) => {
        try {
            const { msgId, id } = req.params;
            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.dltSolicitudChatMensaje(msgId);

            res.status(200).json({ message: 'Solicitud eliminada' });
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to delete solicitud' });
        }
    }

    static readonly updSolicitudFinalizar = async (req: any, res: any) => {
        try {
            const body: SolicitudFinalizacion = SolicitudFinalizacion.fromJson((req.body as IRequestWrapper).body);

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.updSolicitudFinalizar(body);

            return res.status(200).json({ message: 'Solicitud actualizada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar solicitud' });
        }
    }
}