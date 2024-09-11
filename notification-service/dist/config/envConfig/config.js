"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_PASS = exports.AUTH_EMAIL = exports.RABBITMQ_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || '5003');
exports.PORT = PORT;
const RABBITMQ_URL = String(process.env.RABBITMQ_URL);
exports.RABBITMQ_URL = RABBITMQ_URL;
const AUTH_EMAIL = String(process.env.AUTH_EMAIL);
exports.AUTH_EMAIL = AUTH_EMAIL;
const AUTH_PASS = String(process.env.AUTH_PASS);
exports.AUTH_PASS = AUTH_PASS;
