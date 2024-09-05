import amqp, { Connection, Channel } from "amqplib";
import { RABBITMQ_URL } from "../../config/envConfig/config";

let connection: Connection | null = null;
let channel: Channel | null = null;
const RETRY_INTERVAL = 5000;

export const connectRabbitMQ = async (): Promise<void> => {
    try {
        if (!connection) {
            connection = await amqp.connect(RABBITMQ_URL);
            console.log("RabbitMQ connection established.");

            // Handle connection errors and try to reconnect
            connection.on('error', (err) => {
                console.error('RabbitMQ connection error:', err);
                closeConnectionAndRetry();
            });

            // Handle connection closure and try to reconnect
            connection.on('close', () => {
                console.warn('RabbitMQ connection closed, retrying...');
                closeConnectionAndRetry();
            });
        }

        if (!channel) {
            channel = await connection.createChannel();
            console.log("RabbitMQ channel created.");
        }
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
        console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
        setTimeout(connectRabbitMQ, RETRY_INTERVAL);
    }
};

const closeConnectionAndRetry = () => {
    connection = null;
    channel = null;
    setTimeout(connectRabbitMQ, RETRY_INTERVAL);
};

export const getChannel = (): Channel => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not created yet.");
    }
    return channel;
};
