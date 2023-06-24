import { ISolicitudesService } from "../../../core/services/isolicitudes-service";
import { IHabilidadesService } from "../../../core/services/ihabilidades-service";
import { IUsuariosService } from "../../../core/services/iusuarios-service";
import { UsuariosService } from "../../../data-pg/services/usuarios-service";
import { HabilidadesService } from "../../../data-pg/services/habilidades-service";
import { SolicitudesService } from "../../../data-pg/services/solicitudes-service";
import { BaseDBServiceFactory } from "../../../core/patterns/factory/db-service-factory";
import { IDBServiceFactory } from "../../../core/patterns/factory/idb-service-factory";


export class DBServiceFactory extends BaseDBServiceFactory<DBServiceFactory> {
    private constructor() {
        super();
        this._usuarios = new UsuariosService();
        this._habilidades = new HabilidadesService();
        this._solicitudes = new SolicitudesService();
    }

    public static override get instance(): IDBServiceFactory {
        if (!this._instance) {
            this._instance = new DBServiceFactory();
        }
        return this._instance;

    }
}