import dotenv from 'dotenv'

dotenv.config()

const PORT: number = parseInt(process.env.PORT || '5002');
const MONGODB_URL: string = String(process.env.MONGODB_URL)
const RABBITMQ_URL: string = String(process.env.RABBITMQ_URL)


export {
    PORT,
    MONGODB_URL,
    RABBITMQ_URL
}