export class SolicitudCreacion {
    [key: string]: any;

    public title: string;
    public description: string;
    public location: string;
    public requesterId: number;
    public requesterName: string;
    public requesterLastName: string;
    public skill: number;

    constructor() {
        this.title = '';
        this.description = '';
        this.location = '';
        this.requesterId = 0;
        this.requesterName = '';
        this.requesterLastName = '';
        this.skill = 0;
    }

    public set(property: string, value: any): SolicitudCreacion {
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

    static fromJson(json: any): SolicitudCreacion {
        let result = new SolicitudCreacion();
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

    public clone(): SolicitudCreacion {
        return SolicitudCreacion.fromJson(this.toJson());
    }


}
