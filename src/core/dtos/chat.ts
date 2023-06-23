import { EstadoSolicitud } from "../types/estado-solicitud";
import { Mensaje } from "./mensaje";

export class Chat {
    [key: string]: any;

    public requestId: number;
    public requestTitle: string;
    public requestStatus: EstadoSolicitud | null;
    public requesterId: number;
    public requesterName: string;
    public requesterLastName: string;
    public providerId: number;
    public providerName: string;
    public providerLastName: string;
    public messages: Mensaje[];

    constructor() {
        this.requestId = 0;
        this.requestTitle = '';
        this.requestStatus = null;
        this.requesterId = 0;
        this.requesterName = '';
        this.requesterLastName = '';
        this.providerId = 0;
        this.providerName = '';
        this.providerLastName = '';
        this.messages = [];
    }

    public set(property: string, value: any): Chat {
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

    static fromJson(json: any): Chat {
        let result = new Chat();
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

    public clone(): Chat {
        return Chat.fromJson(this.toJson());
    }
}
