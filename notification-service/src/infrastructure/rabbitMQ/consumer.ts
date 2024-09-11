import { getChannel } from './rabbitmqConfig';
import { sendmail } from '../../infrastructure/services/emailService';
// import { saveUserToDatabase } from '../../infrastructure/database/mongodb/repositories/saveUser';

export const notificationConsumer = async (queueName: string) => {
    const channel = getChannel();
    if (channel) {
        await channel.assertQueue(queueName, { durable: true });
        console.log(`Consuming from queue: ${queueName}`);
        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                try {
                    const otpdata = JSON.parse(msg.content.toString());
                    console.log('Received user data:', otpdata);
                    const {email,otp}=otpdata;

                   const res= await sendmail(email,otp)
                       console.log(res);
                       
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                    channel.nack(msg, false, true);
                }
            }
        });
    } else {
        console.error('Channel is not available');
    }
};
