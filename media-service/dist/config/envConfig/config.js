"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URL = exports.RABBITMQ_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || '5004');
exports.PORT = PORT;
const RABBITMQ_URL = String(process.env.RABBITMQ_URL);
exports.RABBITMQ_URL = RABBITMQ_URL;
const MONGODB_URL = String(process.env.MONGODB_URL);
exports.MONGODB_URL = MONGODB_URL;
