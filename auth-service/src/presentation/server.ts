import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import { PORT } from "../config/envConfig/config";
import { errorHandler } from "../utils/error/errorHandler";
import { authRoutes } from "../infrastructure/routes/authRoutes";
import { dependencies } from "../config/dependencies";
import { connectRabbitMQ } from "../infrastructure/rabbitMQ/rabbitmqConfig";
import { userRoutes } from "../infrastructure/routes/userRoutes";
import morgan from 'morgan'

dotenv.config();

const app: Application = express();
const PORTNUMBER: number = PORT || 5001;


const corsOptions = {
    origin: String('http://localhost:5173'), 
    credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(morgan('tiny'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', authRoutes(dependencies));
app.use('/user', userRoutes(dependencies));

// app.use('/', (req, res) => {
//     console.log('This is the REST API');
//     res.json({ message: 'This is auth api return' });
// });
// app.use('/user', (req, res) => {
//     console.log('This is the REST API');
//     res.json({ message: 'This is user api return' });
// });

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
