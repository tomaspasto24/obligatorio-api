import { IHabilidadesService } from "../../../core/services/ihabilidades-service";
import { ISolicitudesService } from "../../../core/services/isolicitudes-service";
import { IUsuariosService } from "../../../core/services/iusuarios-service";

export interface IDBServiceFactory {
    getUsuariosService(): IUsuariosService;
    getHabilidadesService(): IHabilidadesService;
    getSolicitudesService(): ISolicitudesService;
}