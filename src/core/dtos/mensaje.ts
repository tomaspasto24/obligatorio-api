export class Mensaje {
    [key: string]: any;

    public requestId: number;
    public messageId: number;
    public timeStamp: Date;
    public senderId: number;
    public senderName: string;
    public senderLastName: string;
    public contents: string;
    public deleted: boolean;

    constructor() {
        this.requestId = 0;
        this.messageId = 0;
        this.timeStamp = new Date();
        this.senderId = 0;
        this.senderName = '';
        this.senderLastName = '';
        this.contents = '';
        this.deleted = false;
    }

    public set(property: string, value: any): Mensaje {
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

    static fromJson(json: any): Mensaje {
        let result = new Mensaje();
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

    public clone(): Mensaje {
        return Mensaje.fromJson(this.toJson());
    }
}
