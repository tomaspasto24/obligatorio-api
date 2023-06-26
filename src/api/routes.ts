import express, { Router } from 'express';
import { AuthenticationController } from './controllers/authentication-controller';
import { AuthenticationMiddleware } from './middlewares/authentication-middleware';
import { UsuariosController } from './controllers/usuarios-controller';
import { HabilidadesController } from './controllers/habilidades-controller';
import { SolicitudesController } from './controllers/solicitudes-controller';

export const closedRouter: Router = express.Router();
export const openRouter: Router = express.Router();

closedRouter.use(AuthenticationMiddleware.authenticate);

// Los endpoints que requieren autenticación se definen en closedRouter
// Los endpoints que no requieren autenticación se definen en openRouter

// Endpoints de registro e inicio de sesión
openRouter.post('/iniciar-sesion', AuthenticationController.login);
openRouter.post('/registrar-usuario', AuthenticationController.register);


// Endpoints de manejo de usuarios
openRouter.post('/usuarios', UsuariosController.insUsuario);
closedRouter.post('/usuarios/search', UsuariosController.insUsuariosSearch);
closedRouter.get('/usuarios/:id', UsuariosController.getUsuarioById);
closedRouter.get('/usuarios/:id/habilidades', UsuariosController.getUsuarioHabilidades);
closedRouter.post('/usuarios/:id/habilidades', UsuariosController.insUsuarioHabilidades);
closedRouter.delete('/usuarios/:id/habilidades', UsuariosController.dltUsuarioHabilidades);
closedRouter.put('/usuarios/:id', UsuariosController.updUsuarioById);
closedRouter.get('/usuarios/:id/conexiones', UsuariosController.getUsuarioConexiones);
closedRouter.post('/usuarios/:id/conexiones', UsuariosController.insUsuarioConexiones);
closedRouter.delete('/usuarios/:id/conexiones/:cId', UsuariosController.dltUsuarioConexiones);
closedRouter.put('/usuarios/:id/conexiones/:cId', UsuariosController.updUsuarioConexiones);
closedRouter.post('/usuarios/:id/password', UsuariosController.insUsuarioPassChange);
closedRouter.put('/usuarios/:id/password', UsuariosController.updUsuarioPassChange);
closedRouter.get('/usuarios/:id/solicitudes/relevantes', UsuariosController.getUsuarioSolicitudesRelevantes);
closedRouter.get('/usuarios/:id/solicitudes/activas', UsuariosController.getUsuarioSolicitudesActivas);


// Endpoints de manejo de habilidades
openRouter.get('/habilidades', HabilidadesController.getHabilidades);
openRouter.get('/habilidades/categorias', HabilidadesController.getHabilidadesCategorias);
closedRouter.post('/habilidades', HabilidadesController.insHabilidades);
closedRouter.put('/habilidades/:id', HabilidadesController.updHabilidades);
closedRouter.delete('/habilidades/:id', HabilidadesController.dltHabilidades);


// Endpoints de manejo de solicitudes
closedRouter.get('/solicitudes/:id', SolicitudesController.getSolicitud);
closedRouter.post('/solicitudes', SolicitudesController.insSolicitud);
closedRouter.put('/solicitudes/:id', SolicitudesController.updSolicitud);
closedRouter.post('/solicitudes/:id/aceptar', SolicitudesController.updSolicitudAceptar);
closedRouter.get('/solicitudes/:id/chat', SolicitudesController.getSolicitudChat);
closedRouter.post('/solicitudes/:id/chat/mensajes', SolicitudesController.insSolicitudChatMensaje);
closedRouter.delete('/solicitudes/:id/chat/mensajes/:msgId', SolicitudesController.dltSolicitudChatMensaje);
closedRouter.post('/solicitudes/:id/finalizar', SolicitudesController.updSolicitudFinalizar);