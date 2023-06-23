export class HabilidadesFiltro {
    [key: string]: any;

    public userId: number;
    public requestId: number;
    public skillCategoryId: number;

    constructor() {
        this.userId = 0;
        this.requestId = 0;
        this.skillCategoryId = 0;
    }

    public set(property: string, value: any): HabilidadesFiltro {
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

    static fromJson(json: any): HabilidadesFiltro {
        let result = new HabilidadesFiltro();
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

    public clone(): HabilidadesFiltro {
        return HabilidadesFiltro.fromJson(this.toJson());
    }
}
