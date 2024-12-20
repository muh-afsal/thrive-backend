"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationConsumer = void 0;
const rabbitmqConfig_1 = require("./rabbitmqConfig");
const emailService_1 = require("../../infrastructure/services/emailService");
const notificationConsumer = (queueName) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = (0, rabbitmqConfig_1.getChannel)();
    if (channel) {
        yield channel.assertQueue(queueName, { durable: true });
        console.log(`Consuming from queue: ${queueName}`);
        channel.consume(queueName, (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if (msg !== null) {
                try {
                    const data = JSON.parse(msg.content.toString());
                    console.log('Received data from the queue:', data);
                    if (queueName === 'sendOtpQueue') {
                        const { email, otp } = data;
                        const result = yield (0, emailService_1.sendmail)(email, otp);
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
                }
                catch (error) {
                    console.error('Error processing message:', error);
                    channel.nack(msg, false, true);
                }
            }
        }));
    }
    else {
        console.error('Channel is not available');
    }
});
exports.notificationConsumer = notificationConsumer;
