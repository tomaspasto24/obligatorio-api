export class SolicitudAceptacion {
    [key: string]: any;

    public solicitudId: number;
    public providerId: number;

    constructor() {
        this.solicitudId = 0;
        this.providerId = 0;
    }

    public set(property: string, value: any): SolicitudAceptacion {
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

    static fromJson(json: any): SolicitudAceptacion {
        let result = new SolicitudAceptacion();
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

    public clone(): SolicitudAceptacion {
        return SolicitudAceptacion.fromJson(this.toJson());
    }
}
