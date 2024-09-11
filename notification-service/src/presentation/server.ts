import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import { PORT } from "../config/envConfig/config";
// import { authRoutes } from "../infrastructure/routes/authRoutes";
// import { dependencies } from "../config/dependencies";
import { connectRabbitMQ } from "../infrastructure/rabbitMQ/rabbitmqConfig";
import { notificationConsumer } from "../infrastructure/rabbitMQ/consumer";


dotenv.config();

const app: Application = express();
const PORTNUMBER: number = PORT || 5003;


const corsOptions = {
    origin: String('http://localhost:5173'), 
    credentials: true, 
};

app.use(cors(corsOptions)); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/', authRoutes(dependencies));

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("API not found: auth service");
});

// app.use(errorHandler);


app.listen(PORTNUMBER, async () => {
    console.log(`User service running on port ${PORTNUMBER}`);
    await connectRabbitMQ();  
    await notificationConsumer('sendOtpQueue'); 
});


export default app;
