import express, { Router } from 'express';
import { AuthenticationController } from './controllers/authentication-controller';
import { AuthenticationMiddleware } from './middlewares/authentication-middleware';

export const closedRouter: Router = express.Router();
export const openRouter: Router = express.Router();

closedRouter.use(AuthenticationMiddleware.authenticate);

openRouter.post('/iniciar-sesion', AuthenticationController.login);

openRouter.post('/registrar-usuario', (req: any, res: any) => {
    
});

openRouter.get('/habilidades', (req: any, res: any) => {
    //let habilidades: Habilidad[] = [];
});

openRouter.get('/habilidades-categorias', (req: any, res: any) => {
    
});

openRouter.get('/solicitudes', (req: any, res: any) => {
    
});

closedRouter.get('/solicitudes-relevantes', (req: any, res: any) => {
    
});

closedRouter.get('/solicitudes-activas', (req: any, res: any) => {
    
});

closedRouter.post('/aceptar-solicitud', (req: any, res: any) => {
    
});

closedRouter.post('/solicitud', (req: any, res: any) => { //crear-solicitud
    
});

closedRouter.get('/solicitud-chat', (req: any, res: any) => { 
    
});

closedRouter.post('/solicitud-chat-mensaje', (req: any, res: any) => { 
    
});

closedRouter.post('/finalizar-solicitud', (req: any, res: any) => { 
    
});

closedRouter.post('/solicitud-chat-mensaje', (req: any, res: any) => { 
    
});