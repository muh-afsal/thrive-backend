import { getChannel } from './rabbitmqConfig';
import { sendmail } from '../../infrastructure/services/emailService';
import { eventNotifyEmail } from '../../infrastructure/services/eventNotifyEmail';

export const notificationConsumer = async (queueName: string) => {
    const channel = getChannel();
    if (channel) {
        await channel.assertQueue(queueName, { durable: true });
        console.log(`Consuming from queue: ${queueName}`);
        
        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                try {
                    const data = JSON.parse(msg.content.toString());
                    console.log('Received data from the queue:', data);

                    if (queueName === 'sendOtpQueue') {
                        const { email, otp } = data;
                        const result = await sendmail(email, otp);
                        console.log('OTP email sent:', result);
                    } 
                    
                    // else if (queueName === 'sendEventEmailQueue') {
                    //     const { members, eventDetails, admin } = data;
                    //     const adminInfo = admin;

                    //     for (const member of members) {
                    //         const result = await eventNotifyEmail(member.email, eventDetails, adminInfo);
                    //         console.log(`Event notification email sent to ${member.email}:`, result);
                    //     }
                    // }
                    
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
