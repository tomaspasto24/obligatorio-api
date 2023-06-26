import { IModelEntity } from "./ientity-model";

export class Mensaje implements IModelEntity {
    public id: number = 0;
    public marca: Date = new Date();
    public contenido: string = '';
    public eliminado: boolean = false;
    public solicitud_id: number = 0;
    public id_emisor: number = 0;
}