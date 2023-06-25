import { Habilidad } from "../../core/dtos/habilidad";
import { HabilidadesCategoria } from "../../core/dtos/habilidades-categoria";
import { IHabilidadesService } from "../../core/services/ihabilidades-service";

export class HabilidadesService implements IHabilidadesService {
    getHabilidades(): Promise<Habilidad[]> {
        throw new Error("Method not implemented.");
    }
    getHabilidadesCategorias(): Promise<HabilidadesCategoria[]> {
        throw new Error("Method not implemented.");
    }

}