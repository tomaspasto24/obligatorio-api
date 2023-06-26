import { Habilidad as HabilidadDTO } from "../../core/dtos/habilidad";
import { HabilidadesCategoria } from "../../core/dtos/habilidades-categoria";
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

        //Se convierte la respuesta a Habilidad
        let habilidades: HabilidadDTO[] = [];
        for (let i = 0; i < result.rowCount; i++) {
            let habilidad: HabilidadDTO = new HabilidadDTO();
            habilidad.id = result.rows[i].habilidad_codigo;
            habilidad.name = result.rows[i].habilidad_habilidad;
            habilidad.description = result.rows[i].habilidad_descripcion;
            habilidad.categoryId = result.rows[i].habilidad_codigo_categoria;
            habilidad.categoryName = result.rows[i].c_nombre
            habilidades.push(habilidad);
        }

        //Se retorna habilidades
        return habilidades;
    }

    public async getHabilidadesCategorias(): Promise<HabilidadesCategoria[]> {
        //Se prepara la consulta
        let query = this._queryBuilder.select(Categoria, ['codigo', 'nombre']);

        //Se ejecuta la consulta
        let result = await this._database.query(query.build());

        //Se convierte la respuesta a HabilidadCategoriaDTO
        let categorias: HabilidadesCategoria[] = [];
        for (let i = 0; i < result.rowCount; i++) {
            let categoria: HabilidadesCategoria = new HabilidadesCategoria();
            categoria.id = result.rows[i].categoria_codigo;
            categoria.name = result.rows[i].categoria_nombre;
            categorias.push(categoria);
        }

        //Se retorna habilidades
        return categorias;
    }
}
