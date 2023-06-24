import { IUsuariosService } from "../../../core/services/iusuarios-service";
import { IDBService } from "../../../core/services/idb-service";
import { IHabilidadesService } from "../../../core/services/ihabilidades-service";
import { ISolicitudesService } from "../../../core/services/isolicitudes-service";
import { UsuariosService } from "../../../data-pg/services/usuarios-service";
import { HabilidadesService } from "../../../data-pg/services/habilidades-service";
import { SolicitudesService } from "../../../data-pg/services/solicitudes-service";
import { IDBServiceFactory } from "./idb-service-factory";

export abstract class BaseDBServiceFactory<T extends IDBServiceFactory > implements IDBServiceFactory {
    protected static _instance: IDBServiceFactory;

    protected _usuarios!: IUsuariosService;
    protected _habilidades!: IHabilidadesService;
    protected _solicitudes!: ISolicitudesService;

    protected constructor() {}

    public getUsuariosService(): IUsuariosService {
        return this._usuarios;
    }

    public getHabilidadesService(): IHabilidadesService {
        return this._habilidades;
    }

    public getSolicitudesService(): ISolicitudesService {
        return this._solicitudes;
    }

    public static getInstance(): IDBServiceFactory {
        return this.instance;
    }

    public static get instance(): IDBServiceFactory {
        throw new Error("Method not implemented.");
    }
}