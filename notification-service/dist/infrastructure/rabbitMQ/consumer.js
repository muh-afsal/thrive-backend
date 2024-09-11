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
// import { saveUserToDatabase } from '../../infrastructure/database/mongodb/repositories/saveUser';
const notificationConsumer = (queueName) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = (0, rabbitmqConfig_1.getChannel)();
    if (channel) {
        yield channel.assertQueue(queueName, { durable: true });
        console.log(`Consuming from queue: ${queueName}`);
        channel.consume(queueName, (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if (msg !== null) {
                try {
                    const otpdata = JSON.parse(msg.content.toString());
                    console.log('Received user data:', otpdata);
                    const { email, otp } = otpdata;
                    const res = yield (0, emailService_1.sendmail)(email, otp);
                    console.log(res);
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
