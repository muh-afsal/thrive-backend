import dotenv from 'dotenv'

dotenv.config()

const PORT: number = parseInt(process.env.PORT || '5004');
const RABBITMQ_URL: string = String(process.env.RABBITMQ_URL)
const MONGODB_URL: string = String(process.env.MONGODB_URL)



export {
    PORT,
    RABBITMQ_URL,
    MONGODB_URL
}