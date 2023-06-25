import { Habilidad } from "../dtos/habilidad";
import { HabilidadesCategoria } from "../dtos/habilidades-categoria";
import { IDBService } from "./idb-service";

export interface IHabilidadesService extends IDBService {
    getHabilidades(): Promise<Habilidad[]>;
    getHabilidadesCategorias(): Promise<HabilidadesCategoria[]>;
    
}