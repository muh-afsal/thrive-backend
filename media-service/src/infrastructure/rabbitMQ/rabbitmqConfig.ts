import amqp, { Channel, Connection } from 'amqplib';
import { RABBITMQ_URL } from '../../config/envConfig/config';

let connection: Connection | null = null; 
let channel: Channel | null = null;
const RETRY_INTERVAL = 5000;

export const connectRabbitMQ = async () => {
    try {
        if (connection) {
            console.warn('Already connected to RabbitMQ');
            return;
        }
        
        connection = await amqp.connect(RABBITMQ_URL || 'amqp://localhost');
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');

        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
            handleConnectionClose();
        });

        connection.on('close', () => {
            console.warn('RabbitMQ connection closed, retrying...');
            handleConnectionClose();
        });

    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        scheduleReconnect();
    }
};

const handleConnectionClose = () => {
    connection = null;
    channel = null;
    scheduleReconnect(); 
};

const scheduleReconnect = () => {
    console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
    setTimeout(connectRabbitMQ, RETRY_INTERVAL);
};

export const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not created yet.');
    }
    return channel;
};
