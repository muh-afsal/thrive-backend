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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = require("../infrastructure/routes/userRoutes");
const rabbitmqConfig_1 = require("../infrastructure/rabbitMQ/rabbitmqConfig");
const consumer_1 = require("../infrastructure/rabbitMQ/consumer");
const config_1 = require("../config/envConfig/config");
const dependencies_1 = require("../config/dependencies");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORTNUMBER = config_1.PORT || 5002;
const corsOptions = {
    origin: String('http://localhost:5173'),
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/', (0, userRoutes_1.userRoutes)(dependencies_1.dependencies));
app.use((err, req, res, next) => {
    console.error(err);
    const errorResponse = {
        errors: [{ message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong" }],
    };
    return res.status(500).json(errorResponse);
});
app.listen(PORTNUMBER, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`User service running on port ${PORTNUMBER}`);
    yield (0, rabbitmqConfig_1.connectRabbitMQ)();
    yield (0, consumer_1.Userconsumer)('userDataQueue');
}));
exports.default = app;
