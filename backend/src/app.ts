import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes';
import itemsRoutes from './routes/items.routes';
import errorHandler from './middlewares/error.middleware';


const app = express();

app.use(helmet());

app.use(express.json());

app.use(cors({
    origin :true,
    credentials : true
}))

app.use(rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 200
}))

app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);

app.use(errorHandler);

export default app




