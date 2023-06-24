import { IDBServiceFactory } from '../core/patterns/factory/idb-service-factory';
import { UsuarioFiltro } from '../core/dtos/usuario-filtro';
import { IUsuariosService } from '../core/services/iusuarios-service';
import { UsuariosService } from '../data-pg/services/usuarios-service';
import app from './server';
import dotenv from 'dotenv';
import { DBServiceFactory } from '../data-pg/patterns/factory/db-service-factory';

dotenv.config();

let testFilter: UsuarioFiltro = new UsuarioFiltro();
testFilter.email = 'asd@asd.com';
testFilter.fullName = 'asd';
testFilter.nick = 'asd';
testFilter.skills = [1, 2, 3];

let service: IUsuariosService = new UsuariosService();
console.log(service.getUsuariosFiltered(testFilter));


let factory: IDBServiceFactory = DBServiceFactory.instance;
console.log(factory);


/*

const hostname = process.env.HOSTNAME || 'localhost';
const port = Number(process.env.PORT || 3000);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/