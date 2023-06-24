import { IDBServiceFactory } from '../core/patterns/factory/idb-service-factory';
import { UsuarioFiltro } from '../core/dtos/usuario-filtro';
import { IUsuariosService } from '../core/services/iusuarios-service';
import { UsuariosService } from '../data-pg/services/usuarios-service';
import app from './server';
import dotenv from 'dotenv';
import { DBServiceFactory } from '../data-pg/patterns/factory/db-service-factory';

dotenv.config();

const hostname = process.env.API_HOSTNAME || 'localhost';
const port = Number(process.env.API_PORT || 3000);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});