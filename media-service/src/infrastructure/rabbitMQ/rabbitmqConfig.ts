import amqp, { Channel, Connection } from 'amqplib';
import { RABBITMQ_URL } from '../../config/envConfig/config';

let connection: Connection;
let channel: Channel;
const RETRY_INTERVAL = 5000;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL || 'amqp://localhost');
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
        setTimeout(connectRabbitMQ, RETRY_INTERVAL);
    }

    connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err);
        setTimeout(connectRabbitMQ, RETRY_INTERVAL);
    });

    connection.on('close', () => {
        console.warn('RabbitMQ connection closed, retrying...');
        setTimeout(connectRabbitMQ, RETRY_INTERVAL);
    });
};

export const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not created yet.');
    }
    return channel;
};
