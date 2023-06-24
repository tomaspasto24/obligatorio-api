import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/iniciar-sesion', (req: any, res: any) => {
    
});

router.post('/registrar-usuario', (req: any, res: any) => {
    
});

router.get('/habilidades', (req: any, res: any) => {
    let habilidades: Habilidad[] = [];
});

router.get('/habilidades-categorias', (req: any, res: any) => {
    
});

router.get('/solicitudes', (req: any, res: any) => {
    
});

router.get('/solicitudes-relevantes', (req: any, res: any) => {
    
});

router.get('/solicitudes-activas', (req: any, res: any) => {
    
});

router.post('/aceptar-solicitud', (req: any, res: any) => {
    
});

router.post('/solicitud', (req: any, res: any) => { //crear-solicitud
    
});

router.get('/solicitud-chat', (req: any, res: any) => { 
    
});

router.post('/solicitud-chat-mensaje', (req: any, res: any) => { 
    
});

router.post('/finalizar-solicitud', (req: any, res: any) => { 
    
});

router.post('/solicitud-chat-mensaje', (req: any, res: any) => { 
    
});

export default router;