import mongoose from "mongoose";
import {MONGODB_URL} from "../../config/envConfig/config";
 



export default async()=>{
    try {

        const mongoUrl = MONGODB_URL;
        console.log(mongoUrl);
        
        if (!mongoUrl) {
            throw new Error("MongoDB connection string not provided in environment variables");
        }

        await mongoose.connect(mongoUrl.trim());

        console.log(` 🍃🍃🍃🍃🍃🍃 MongoDB connected to user service!🍃🍃🍃🍃🍃🍃`);
      
    } catch (error:any) {
        console.error(`🍁🍁🍁🍁🍁 Database Connection failed 🍁🍁🍁🍁🍁`);
        console.error(error.message);
        process.exit(1)
    }
}