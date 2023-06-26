import { ISolicitudesService } from "../../core/services/isolicitudes-service";
import { DBServiceFactory } from "../../data-pg/patterns/factory/db-service-factory";
import { Solicitud as SolicitudDTO } from "../../core/dtos/solicitud";
import { SolicitudCreacion as SolicitudCreacionDTO } from "../../core/dtos/solicitud-creacion";
import { IRequestWrapper } from "../../core/types/request-wrapper";
import { SolicitudAceptacion as SolicitudAceptacionDTO } from "../../core/dtos/solicitud-aceptacion";
import { SolicitudFinalizacion as SolicitudFinalizacionDTO } from "../../core/dtos/solicitud-finalizacion";
import { MensajeCreacion as MensajeCreacionDTO } from "../../core/dtos/mensaje-creacion";
import { Chat as ChatDTO } from "../../core/dtos/chat";

export class SolicitudesController {

    static readonly getSolicitud = async (req: any, res: any) => {
        try {
            const id: number = Number(req.params.id);
            const activeUserId: number = req.body.userId;

            if (id <= 0) 
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId <= 0) 
                return res.status(400).json({ message: 'Invalid request' });

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            const solicitud: SolicitudDTO = await solicitudesService.getSolicitud(id);

            res.status(200).json(solicitud);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get solicitud' });
        }
    }

    static readonly insSolicitud = async (req: any, res: any) => {
        try {
            const activeUserId: number = req.body.userId;
            const body: SolicitudCreacionDTO = SolicitudCreacionDTO.fromJson((req.body as IRequestWrapper).body);
            const targetUserId: number = body.requesterId;

            if (activeUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (targetUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId !== targetUserId)
                return res.status(401).json({ message: 'Unauthorized' });

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
            const id: number = Number(req.params.id);
            const activeUserId: number = req.body.userId;
            const body: SolicitudCreacionDTO = SolicitudCreacionDTO.fromJson((req.body as IRequestWrapper).body);

            if (id <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId !== body.requesterId)
                return res.status(401).json({ message: 'Unauthorized' });

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.updSolicitud(id, body);

            return res.status(200).json({ message: 'Solicitud actualizada' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar solicitud' });
        }
    }

    static readonly updSolicitudAceptar = async (req: any, res: any) => {
        try {
            const id: number = Number(req.params.id);
            const activeUserId: number = Number(req.body.userId);
            const body: SolicitudAceptacionDTO = SolicitudAceptacionDTO.fromJson((req.body as IRequestWrapper).body);

            if (id <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId !== body.providerId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (body.solicitudId !== id)
                return res.status(400).json({ message: 'Invalid request' });

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
            const id: number = Number(req.params.id);
            const activeUserId: number = Number(req.body.userId);

            if (id <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            
            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            const chat: ChatDTO = await solicitudesService.getSolicitudChat(id, activeUserId);

            if (chat.providerId !== activeUserId && chat.requesterId !== activeUserId)
                return res.status(401).json({ message: 'Unauthorized' });

            res.status(200).json(chat);
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to get solicitudChat' });
        }
    }

    static readonly insSolicitudChatMensaje = async (req: any, res: any) => {
        try {
            const solId: number = Number(req.params.id);
            const activeUserId: number = Number(req.body.userId);
            const body: MensajeCreacionDTO = MensajeCreacionDTO.fromJson((req.body as IRequestWrapper).body);

            if (solId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
                
            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.insSolicitudChatMensaje(solId, body.contents, activeUserId);

            return res.status(200).json({ message: 'SolicitudChatMensaje agregada' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al insertar solicitudChatMensaje' });
        }
    }

    static readonly dltSolicitudChatMensaje = async (req: any, res: any) => {
        try {
            const solId = Number(req.params.id);
            const msgId = Number(req.params.msgId);
            const activeUserId: number = req.body.userId;

            if (solId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (msgId <= 0)
                return res.status(400).json({ message: 'Invalid request' });

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.dltSolicitudChatMensaje(activeUserId, msgId);

            res.status(200).json({ message: 'Solicitud eliminada' });
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to delete solicitud' });
        }
    }

    static readonly updSolicitudFinalizar = async (req: any, res: any) => {
        try {
            const solId = Number(req.params.id);
            const activeUserId: number = req.body.userId;
            const body: SolicitudFinalizacionDTO = SolicitudFinalizacionDTO.fromJson((req.body as IRequestWrapper).body);

            if (solId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId <= 0)
                return res.status(400).json({ message: 'Invalid request' });
            if (activeUserId !== body.userId)
                return res.status(401).json({ message: 'Unauthorized' });
            if (body.requestId !== solId)
                return res.status(400).json({ message: 'Invalid request' });

            let solicitudesService: ISolicitudesService = DBServiceFactory.instance.getSolicitudesService();
            await solicitudesService.updSolicitudFinalizar(body);

            return res.status(200).json({ message: 'Solicitud actualizada' });
        }
        catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar solicitud' });
        }
    }
}