import { buildApp } from './server';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const hostname = process.env.API_HOSTNAME || 'localhost';
const port = Number(process.env.API_PORT || 3000);
const corsOrigin = process.env.API_CORS_ORIGIN || 'http://localhost:4200';

const app: express.Express = buildApp(corsOrigin);
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});