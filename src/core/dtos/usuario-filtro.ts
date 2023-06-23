export class UsuarioFiltro {
    [key: string]: any;

    public email: string;
    public fullName: string;
    public nick: string;
    public skills: number[];

    constructor() {
        this.email = '';
        this.fullName = '';
        this.nick = '';
        this.skills = [];
    }

    public set(property: string, value: any): UsuarioFiltro {
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

    static fromJson(json: any): UsuarioFiltro {
        let result = new UsuarioFiltro();
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

    public clone(): UsuarioFiltro {
        return UsuarioFiltro.fromJson(this.toJson());
    }
}
