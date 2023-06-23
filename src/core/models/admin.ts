import { IModelEntity } from "./ientity-model";

export class Admin implements IModelEntity {
    public id: number = 0;
    public email: string = '';
    public contraseña: string = '';
    public nick: string = '';
    public nombres: string = '';
    public apellidos: string = '';
    public fecha_registro: Date = new Date();
    public eliminado: boolean = false;
}