export class PasswordCambioRealizacion {
    [key: string]: any;

    public userId: number;
    public password: string;
    public authCode: string;

    constructor() {
        this.userId = 0;
        this.password = '';
        this.authCode = '';
    }

    public set(property: string, value: any): PasswordCambioRealizacion {
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

    static fromJson(json: any): PasswordCambioRealizacion {
        let result = new PasswordCambioRealizacion();
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

    public clone(): PasswordCambioRealizacion {
        return PasswordCambioRealizacion.fromJson(this.toJson());
    }
}
