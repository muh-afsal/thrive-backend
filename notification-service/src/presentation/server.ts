import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import { PORT } from "../config/envConfig/config";
// import { authRoutes } from "../infrastructure/routes/authRoutes";
// import { dependencies } from "../config/dependencies";
import { connectRabbitMQ } from "../infrastructure/rabbitMQ/rabbitmqConfig";
import { notificationConsumer } from "../infrastructure/rabbitMQ/consumer";
import connectSocketIo from "../infrastructure/socket";
import http from 'http'
import { notificationRoutes } from "../infrastructure/routes/notificationRoutes";
import { dependencies } from "../config/dependencies";


dotenv.config();

const app: Application = express();
const PORTNUMBER: number = PORT || 5003;


const corsOptions = {
    origin: String('http://localhost:5173'), 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};


app.use(cors(corsOptions)); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
app.use(cookieParser());

app.use('/', notificationRoutes(dependencies));
// connectSocketIo(server)



app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("API not found: auth service");
});

// app.use(errorHandler);


app.listen(PORTNUMBER, async () => {
    console.log(`User service running on port ${PORTNUMBER}`);
    await connectRabbitMQ();  
    await notificationConsumer('sendOtpQueue'); 
    await notificationConsumer('sendEventEmailQueue'); 
});


export default app;
