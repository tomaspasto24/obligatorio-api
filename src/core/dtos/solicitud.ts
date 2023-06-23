import { EstadoSolicitud } from "../types/estado-solicitud";
import { Habilidad } from "./habilidad";
import { RolUsuario } from "../types/rol-usuario";

export class Solicitud {
    [key: string]: any;

    public id: number;
    public title: string;
    public description: string;
    public timeStart: Date;
    public location: string;
    public requesterId: number;
    public requesterName: string;
    public requesterLastName: string;
    public providerId: number;
    public providerName: string;
    public providerLastName: string;
    public requesterProviderConnection: string;
    public activeUserRol: RolUsuario | null;
    public skill: Habilidad | null;
    public status: EstadoSolicitud | null;

    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.timeStart = new Date();
        this.location = '';
        this.requesterId = 0;
        this.requesterName = '';
        this.requesterLastName = '';
        this.providerId = 0;
        this.providerName = '';
        this.providerLastName = '';
        this.requesterProviderConnection = '';
        this.activeUserRol = null;
        this.skill = null;
        this.status = null;
    }

    public getPassiveUserName(): string {
        if (this.activeUserRol === RolUsuario.Solicitante) {
            return this.providerName + ' ' + this.providerLastName;	
        }
        else if (this.activeUserRol === RolUsuario.Ayudante) {
            return this.requesterName + ' ' + this.requesterLastName;
        }
        else {
            return '';
        }
    }

    public set(property: string, value: any): Solicitud {
        if (this.hasOwnProperty(property)) {
            try {
                let type = typeof this[property];
                let typedValue = <typeof type>value;
                this[property] = typedValue;
                return this;
            }
            catch (error) {
                throw new Error(`Error setting property ${property} with value ${value}.`);
            }
        }
        else {
            throw new Error(`Property ${property} does not exist.`);
        }
    }

    static fromJson(json: any): Solicitud {
        let result = new Solicitud();
        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                result.set(key, json[key]);
            }
        }
        return result;
    }
    
    public toJson(): any {
        let result: any = {};
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                result[key] = this[key];
            }
        }
        return result;
    }

    public clone(): Solicitud {
        return Solicitud.fromJson(this.toJson());
    }
}
