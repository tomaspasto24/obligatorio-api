import { Habilidad as HabilidadDTO} from "../../core/dtos/habilidad";
import { HabilidadesCategoria as HabilidadesCategoriaDTO } from "../../core/dtos/habilidades-categoria";
import { IHabilidadesService } from "../../core/services/ihabilidades-service";
import { IQueryBuilder } from "../../core/patterns/builder/query-builder";
import { IDatabase } from "../../core/database/idatabase";
import { Database } from "../database/database";
import { PGQueryBuilder, and, cons, equal, in_, like, or, prop } from "../patterns/builder/query-builder";
import { Categoria } from "../../core/models/categoria";
import { Habilidad } from "../../core/models/habilidad";


export class HabilidadesService implements IHabilidadesService {

    private _database: IDatabase;
    private _queryBuilder: IQueryBuilder;

    public constructor() {
        this._database = Database.instance;
        this._queryBuilder = new PGQueryBuilder();
    }

    public async getHabilidades(): Promise<HabilidadDTO[]> {
        //Se prepara la consulta
        let query = this._queryBuilder.select(Habilidad, ['codigo', 'habilidad', 'descripcion', 'codigo_categoria']);
        query.join(Categoria, 'C', equal(prop('Habilidad', 'codigo_categoria'), prop('C', 'codigo')), ['nombre']);

        //Se ejecuta la consulta
        let result = await this._database.query(query.build());

        //Se convierte la respuesta a HabilidadDTO
        let habilidades: HabilidadDTO[] = [];
        for (let i = 0; i < result.rowCount; i++) {
            let habilidad: HabilidadDTO = new HabilidadDTO();
            habilidad.id = result.rows[i].codigo;
            habilidad.name = result.rows[i].habilidad;
            habilidad.description = result.rows[i].descripcion;
            habilidad.categoryId = result.rows[i].codigo_categoria;
            habilidad.categoryName = result.rows[i].c_nombre
            habilidades.push(habilidad);
        }

        //Se retorna habilidades
        return habilidades;
    }

    public async getHabilidadesCategorias(): Promise<HabilidadesCategoriaDTO[]> {
        //Se prepara la consulta
        let query = this._queryBuilder.select(Categoria, ['codigo', 'nombre']);

        //Se ejecuta la consulta
        let result = await this._database.query(query.build());

        //Se convierte la respuesta a HabilidadCategoriaDTO
        let categorias: HabilidadesCategoriaDTO[] = [];
        for (let i = 0; i < result.rowCount; i++) {
            let categoria: HabilidadesCategoriaDTO = new HabilidadesCategoriaDTO();
            categoria.id = result.rows[i].codigo;
            categoria.name = result.rows[i].nombre;
            categorias.push(categoria);
        }

        //Se retorna habilidades
        return categorias;
    }
}
