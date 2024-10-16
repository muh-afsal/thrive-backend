"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
const chatEvents_1 = __importDefault(require("./chatEvents"));
const callEvents_1 = __importDefault(require("./callEvents"));
const connectSocketIo = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    const userSocketMap = {};
    const rooms = {};
    io.on("connection", (socket) => {
        console.log("Socket Connected", socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap[userId] = socket.id;
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        (0, chatEvents_1.default)(socket, io, userSocketMap);
        (0, callEvents_1.default)(socket, io, rooms);
        socket.on("disconnect", (reason) => {
            console.log(`User disconnected: ${reason}`);
            const disconnectedUserId = Object.keys(userSocketMap).find((id) => userSocketMap[id] === socket.id);
            if (disconnectedUserId) {
                for (const roomId in rooms) {
                    if (rooms[roomId].includes(disconnectedUserId)) {
                        rooms[roomId] = rooms[roomId].filter((peerId) => peerId !== disconnectedUserId);
                        io.to(roomId).emit("user-disconnected", {
                            peerId: disconnectedUserId,
                            remainingParticipants: rooms[roomId],
                        });
                        if (rooms[roomId].length === 0) {
                            delete rooms[roomId];
                        }
                    }
                }
                delete userSocketMap[disconnectedUserId];
                io.emit("getOnlineUsers", Object.keys(userSocketMap));
            }
        });
    });
};
exports.default = connectSocketIo;
