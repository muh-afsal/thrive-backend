import dotenv from 'dotenv'

dotenv.config()

const PORT: number = parseInt(process.env.PORT || '5003');
const RABBITMQ_URL: string = String(process.env.RABBITMQ_URL)
const AUTH_EMAIL:string=String(process.env.AUTH_EMAIL)
const AUTH_PASS:string=String(process.env.AUTH_PASS)
const MONGODB_URL: string = String(process.env.MONGODB_URL)


export {
    PORT,
    RABBITMQ_URL,
    AUTH_EMAIL,
    AUTH_PASS,
    MONGODB_URL
}

