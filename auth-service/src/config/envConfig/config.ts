import dotenv from 'dotenv'

dotenv.config()

const PORT: number = parseInt(process.env.PORT || '5001');
const MONGODB_URL: string = String(process.env.MONGODB_URL)
const AUTH_JWT_SECRET: string = String(process.env.AUTH_JWT_SECRET)
const AUTH_EMAIL: string = String(process.env.AUTH_EMAIL)
const AUTH_PASS: string = String(process.env.AUTH_PASS)
const RABBITMQ_URL = String (process.env.RABBITMQ_URL);
const GOOGLE_CLIENT_ID = String (process.env.GOOGLE_CLIENT_ID);




export {
    PORT,
    MONGODB_URL,
    AUTH_JWT_SECRET,
    AUTH_EMAIL,
    AUTH_PASS,
    RABBITMQ_URL,
    GOOGLE_CLIENT_ID
}