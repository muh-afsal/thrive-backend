import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import { PORT } from "../config/envConfig/config";
import { dependencies } from "../config/dependencies";
import { connectRabbitMQ } from "../infrastructure/rabbitMQ/rabbitmqConfig";
import { mediaRoutes } from "../infrastructure/routes/mediaRoutes";
import { userDataConsumer } from "../infrastructure/rabbitMQ/userConsumer";
import http from 'http'
import connectSocketIo from "../infrastructure/socket/index";


dotenv.config();

const app: Application = express();
const PORTNUMBER: number = PORT || 5004;

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




app.use('/', mediaRoutes(dependencies));
connectSocketIo(server)


app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("API not found: media service");
});

// app.use(errorHandler);


server.listen(PORTNUMBER, async () => {
    console.log(`media service running on port ${PORTNUMBER}`);
    await connectRabbitMQ();  
    await userDataConsumer('userDataQueue'); 
    
});


export default app;
