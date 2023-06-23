
import express from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';

const corsOrigin = process.env.API_CORS_ORIGIN || 'http://localhost:4200';

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
//app.use(authHelper.authenticateJWT);
app.use('/api', router)

export default app;