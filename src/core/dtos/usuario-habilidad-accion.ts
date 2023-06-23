export class UsuarioHabilidadAccion {
    [key: string]: any;

    public userId: number;
    public skillId: number;

    constructor() {
        this.userId = 0;
        this.skillId = 0;
    }

    public set(property: string, value: any): UsuarioHabilidadAccion {
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

    static fromJson(json: any): UsuarioHabilidadAccion {
        let result = new UsuarioHabilidadAccion();
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

    public clone(): UsuarioHabilidadAccion {
        return UsuarioHabilidadAccion.fromJson(this.toJson());
    }
}
