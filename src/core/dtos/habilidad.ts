export class Habilidad {
    [key: string]: any;

    public id: number;
    public name: string;
    public description: string;
    public categoryId: number;
    public categoryName: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.categoryId = 0;
        this.categoryName = '';
    }

    public set(property: string, value: any): Habilidad {
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

    static fromJson(json: any): Habilidad {
        let result = new Habilidad();
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

    public clone(): Habilidad {
        return Habilidad.fromJson(this.toJson());
    }
}
