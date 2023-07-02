
import express from 'express';
import cors from 'cors';
import { openRouter, closedRouter } from './routes';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { documentation } from './docs/apidoc';

export const buildApp = (corsOrigin?: string): express.Express => {
    const app = express();
    const corsOptions = {
        origin: corsOrigin,
        optionsSuccessStatus: 200,
        methods: "GET,PUT,POST,DELETE",
    }
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use('/api', openRouter);
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(documentation));
    app.use('/api', closedRouter);

    return app
}