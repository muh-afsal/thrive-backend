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
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../config/envConfig/config");
const dependencies_1 = require("../config/dependencies");
const rabbitmqConfig_1 = require("../infrastructure/rabbitMQ/rabbitmqConfig");
const mediaRoutes_1 = require("../infrastructure/routes/mediaRoutes");
const userConsumer_1 = require("../infrastructure/rabbitMQ/userConsumer");
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("../infrastructure/socket/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORTNUMBER = config_1.PORT || 5004;
const corsOptions = {
    origin: String('http://localhost:5173'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const server = http_1.default.createServer(app);
app.use((0, cookie_parser_1.default)());
app.use('/', (0, mediaRoutes_1.mediaRoutes)(dependencies_1.dependencies));
(0, index_1.default)(server);
app.use("*", (req, res, next) => {
    res.status(404).send("API not found: media service");
});
// app.use(errorHandler);
server.listen(PORTNUMBER, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`media service running on port ${PORTNUMBER}`);
    yield (0, rabbitmqConfig_1.connectRabbitMQ)();
    yield (0, userConsumer_1.userDataConsumer)('userDataQueue');
}));
exports.default = app;
