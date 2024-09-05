import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { userRoutes } from '../infrastructure/routes/userRoutes';
import { connectRabbitMQ } from '../infrastructure/rabbitMQ/rabbitmqConfig';
import { Userconsumer } from '../infrastructure/rabbitMQ/consumer';
import { PORT } from '../config/envConfig/config';
import { dependencies } from '../config/dependencies';
import cors from 'cors'


dotenv.config();

const app: Application = express();
const PORTNUMBER: number = PORT || 5002;

const corsOptions = {
    origin: String('http://localhost:5173'), 
    credentials: true, 
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', userRoutes(dependencies));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const errorResponse = {
        errors: [{ message: err?.message || "Something went wrong" }],
    };
    return res.status(500).json(errorResponse);
});

app.listen(PORTNUMBER, async () => {
    console.log(`User service running on port ${PORTNUMBER}`);
    await connectRabbitMQ();  
    await Userconsumer('userDataQueue'); 
});

export default app;
