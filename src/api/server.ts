
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    methods: "GET,PUT,POST,DELETE",
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(cookieParser());
//app.use(authHelper.authenticateJWT);
app.use('/api', router)

export default app;