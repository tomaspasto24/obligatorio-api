import { Habilidad } from "./habilidad";

export class SolicitudRelevante {
    [key: string]: any;

    public id: number;
    public title: string;
    public description: string;
    public timeStart: Date;
    public location: string;
    public requesterId: number;
    public requesterName: string;
    public requesterLastName: string;
    public requesterProviderConnection: string;
    public skill: Habilidad | null;

    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.timeStart = new Date();
        this.location = '';
        this.requesterId = 0;
        this.requesterName = '';
        this.requesterLastName = '';
        this.requesterProviderConnection = '';
        this.skill = null;
    }

    public set(property: string, value: any): SolicitudRelevante {
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

    static fromJson(json: any): SolicitudRelevante {
        let result = new SolicitudRelevante();
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

    public clone(): SolicitudRelevante {
        return SolicitudRelevante.fromJson(this.toJson());
    }
}
