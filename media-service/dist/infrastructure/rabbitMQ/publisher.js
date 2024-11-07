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
exports.publishToQueue = void 0;
const rabbitmqConfig_1 = require("./rabbitmqConfig");
const publishToQueue = (queueName, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channel = yield (0, rabbitmqConfig_1.getChannel)();
        yield channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });
        console.log(`Message sent to queue ${queueName}:`, message);
    }
    catch (error) {
        console.error('Error publishing to queue:', error);
    }
});
exports.publishToQueue = publishToQueue;
