import dotenv from 'dotenv'

dotenv.config()

const PORT: number = parseInt(process.env.PORT || '5002');
const MONGODB_URL: string = String(process.env.MONGODB_URL)
const RABBITMQ_URL: string = String(process.env.RABBITMQ_URL)
const STRIPE_SECRET: string = String(process.env.STRIPE_SECRET_KEY)
const FRONTEND_URL: string = String(process.env.FRONTEND_URL)
const STRIPE_ENDPOINT_SECRET_KEY: string = String(process.env.STRIPE_ENDPOINT_SECRET)


export {
    PORT,
    MONGODB_URL,
    RABBITMQ_URL,
    STRIPE_SECRET,
    FRONTEND_URL,
    STRIPE_ENDPOINT_SECRET_KEY
}