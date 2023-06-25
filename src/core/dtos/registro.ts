export class Registro {
    [key: string]: any;

    public email: string;
    public password: string;
    public nick: string;
    public name: string;
    public lastName: string;
    public skills: number[];

    constructor() {
        this.email = '';
        this.password = '';
        this.nick = '';
        this.name = '';
        this.lastName = '';
        this.skills = [];
    }

    public set(property: string, value: any): Registro {
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

    static fromJson(json: any): Registro {
        let result = new Registro();
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

    public clone(): Registro {
        return Registro.fromJson(this.toJson());
    }
}
