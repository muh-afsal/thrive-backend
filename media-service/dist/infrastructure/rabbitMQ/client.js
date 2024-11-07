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
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("../../config/envConfig/config");
class RabbitMQClient {
    constructor() { }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!RabbitMQClient.instance) {
                RabbitMQClient.instance = new RabbitMQClient();
                yield RabbitMQClient.instance.connect();
            }
            return RabbitMQClient.instance;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield amqplib_1.default.connect(config_1.RABBITMQ_URL);
            console.log("RabbitMQ connection established.");
        });
    }
    getConnection() {
        if (!this.connection) {
            throw new Error("RabbitMQ connection is not established.");
        }
        return this.connection;
    }
}
exports.default = RabbitMQClient;
