import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import { PORT } from "../config/envConfig/config";
import { errorHandler } from "../utils/error/errorHandler";
import { authRoutes } from "../infrastructure/routes/authRoutes";
import { dependencies } from "../config/dependencies";
import { connectRabbitMQ } from "../infrastructure/rabbitMQ/rabbitmqConfig";


dotenv.config();

const app: Application = express();
const PORTNUMBER: number = PORT || 5001;


const corsOptions = {
    origin: String('http://localhost:5173'), 
    credentials: true, 
};

app.use(cors(corsOptions)); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', authRoutes(dependencies));

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("API not found: auth service");
});

app.use(errorHandler);


app.listen(PORTNUMBER, async () => {
    console.log(`Connected to auth service at port ${PORTNUMBER}`);
    try {
        await connectRabbitMQ();
        console.log('RabbitMQ connected and channel created successfully');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
        process.exit(1);
    }
});

export default app;
