import express  from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import proxy  from "express-http-proxy";
import dotenv from 'dotenv'
const app=express();
const port=4000;

dotenv.config()

const corsOptions = {
    origin: String('http://localhost:5173'), 
    credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(express.json())
app.use(cookieParser())

// app.get('/test',(req,res)=>{
//     console.log("hello....");
//     res.json({success:"heeloooo"})
// })

app.use('/api/auth',proxy('http://localhost:5001'))
app.use('/api/payment',proxy('http://localhost:5002'))
app.use('/api/notification',proxy('http://localhost:5003'))
app.use('/api/media',proxy('http://localhost:5004'))
// app.use('/user',(req,res)=>{
//        console.log('reched herer 00000000000000000');
       
// })

app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
    
}) 