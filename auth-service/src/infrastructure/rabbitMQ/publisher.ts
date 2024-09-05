import { getChannel } from './rabbitmqConfig';

export const publishCreatedUser = async (queueName: string, message: any) => {
    try {
        const channel = await getChannel();
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });
        console.log(`Message sent to queue ${queueName}:`, message);
    } catch (error) {
        console.error('Error publishing to queue:', error);
    }
};
