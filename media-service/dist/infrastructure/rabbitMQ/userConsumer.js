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
exports.userDataConsumer = void 0;
const rabbitmqConfig_1 = require("./rabbitmqConfig");
const UserSchema_1 = require("../../infrastructure/database/mongodb/models/UserSchema");
const userDataConsumer = (queueName) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield (0, rabbitmqConfig_1.getChannel)();
    if (channel) {
        yield channel.assertQueue(queueName, { durable: true });
        console.log(`Consuming from queue: ${queueName}`);
        channel.consume(queueName, (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if (msg !== null) {
                try {
                    const userData = JSON.parse(msg.content.toString());
                    console.log("Received user data:", userData);
                    yield UserSchema_1.User.findOneAndUpdate({ _id: userData._id }, { $set: userData }, { upsert: true, new: true });
                    console.log("User upserted successfully");
                    channel.ack(msg);
                }
                catch (error) {
                    console.error("Error processing user data:", error);
                    channel.nack(msg, false, true);
                }
            }
        }));
    }
    else {
        console.error("Channel is not available");
    }
});
exports.userDataConsumer = userDataConsumer;
