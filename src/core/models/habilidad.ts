import { IModelEntity } from "./ientity-model";

export class Habilidad implements IModelEntity {
    public codigo: number = 0;
    public habilidad: string = '';
    public descripcion: string = '';
    public codigo_categoria: number = 0;
}