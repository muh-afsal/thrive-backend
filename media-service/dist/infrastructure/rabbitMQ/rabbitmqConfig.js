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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("../../config/envConfig/config");
let connection = null;
let channel = null;
const RETRY_INTERVAL = 5000;
const connectRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connection) {
            console.warn('Already connected to RabbitMQ');
            return;
        }
        connection = yield amqplib_1.default.connect(config_1.RABBITMQ_URL || 'amqp://localhost');
        channel = yield connection.createChannel();
        console.log('Connected to RabbitMQ');
        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
            handleConnectionClose();
        });
        connection.on('close', () => {
            console.warn('RabbitMQ connection closed, retrying...');
            handleConnectionClose();
        });
    }
    catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        scheduleReconnect();
    }
});
exports.connectRabbitMQ = connectRabbitMQ;
const handleConnectionClose = () => {
    connection = null;
    channel = null;
    scheduleReconnect();
};
const scheduleReconnect = () => {
    console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
    setTimeout(exports.connectRabbitMQ, RETRY_INTERVAL);
};
const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not created yet.');
    }
    return channel;
};
exports.getChannel = getChannel;
