"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
const notificationEvents_1 = __importDefault(require("./notificationEvents"));
const connectSocketIo = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("Socket Connected", socket.id);
        // const userId = socket.handshake.query.userId as string;
        (0, notificationEvents_1.default)(socket, io);
        socket.on("disconnect", (reason) => {
            console.log(`User disconnected: ${reason}`);
        });
    });
};
exports.default = connectSocketIo;
