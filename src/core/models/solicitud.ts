import { IModelEntity } from "./ientity-model";

export class Solicitud implements IModelEntity {
    public id: number = 0;
    public localizacion: string = '';
    public fecha_creacion: Date = new Date();
    public id_creador: number = 0;
    public id_acepta: number = 0;
    public titulo: string = '';
    public descripcion: string = '';
    public opinion_creador: string = '';
    public opinion_acepta: string = '';
    public estado: string = '';
}