import { HabilidadesCategoria as HabilidadesCategoriaDTO } from "../../core/dtos/habilidades-categoria";
import { Habilidad as HabilidadDTO } from "../../core/dtos/habilidad";
import { IHabilidadesService } from "../../core/services/ihabilidades-service";
import { DBServiceFactory } from "../../data-pg/patterns/factory/db-service-factory";

export class HabilidadesController {
    static readonly getHabilidades = async (req: any, res: any) => {
        try {
            let habilidadesService: IHabilidadesService = DBServiceFactory.instance.getHabilidadesService();
            const habilidades: HabilidadDTO[] = await habilidadesService.getHabilidades();

            res.status(200).json(habilidades);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get habilidades' });
        }
    }

    static readonly getHabilidadesCategorias = async (req: any, res: any) => {
        try {
            let habilidadesService: IHabilidadesService = DBServiceFactory.instance.getHabilidadesService();
            const categorias: HabilidadesCategoriaDTO[] = await habilidadesService.getHabilidadesCategorias();

            res.status(200).json(categorias);
        }
        catch (error: any) {
            res.status(500).json({ message: 'Failed to get categorias' });
        }
    }

    static readonly insHabilidades = async (req: any, res: any) => {
        throw new Error('Method not implemented.');
    }

    static readonly updHabilidades = async (req: any, res: any) => {
        throw new Error('Method not implemented.');
    }

    static readonly dltHabilidades = async (req: any, res: any) => {
        throw new Error('Method not implemented.');
    }
}