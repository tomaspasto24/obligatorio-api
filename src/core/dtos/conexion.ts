export class Conexion {
    [key: string]: any;

    public userId: number;
    public email: string;
    public name: string;
    public lastName: string;
    public nick: string;
    public aceptada: boolean;

    constructor() {
        this.userId = 0;
        this.email = '';
        this.name = '';
        this.lastName = '';
        this.nick = '';
        this.aceptada = false;
    }

    public set(property: string, value: any): Conexion {
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

    static fromJson(json: any): Conexion {
        let result = new Conexion();
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

    public clone(): Conexion {
        return Conexion.fromJson(this.toJson());
    }
}
