import { EstadoSolicitud } from "../types/estado-solicitud";

export class SolicitudFinalizacion {
    [key: string]: any;

    public requestId: number;
    public userId: number;
    public status: EstadoSolicitud | null;
    public opinion: string;

    constructor() {
        this.requestId = 0;
        this.userId = 0;
        this.status = null;
        this.opinion = '';
    }

    public set(property: string, value: any): SolicitudFinalizacion {
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

    static fromJson(json: any): SolicitudFinalizacion {
        let result = new SolicitudFinalizacion();
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

    public clone(): SolicitudFinalizacion {
        return SolicitudFinalizacion.fromJson(this.toJson());
    }
}
