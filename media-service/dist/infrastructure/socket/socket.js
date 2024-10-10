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
const setLastSeen_1 = require("../database/mongo/repositories/setLastSeen");
const messageSeen_1 = require("../database/mongo/repositories/messageSeen");
const socketIo = require('socket.io');
const connectSocketIo = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: ['https://e-tutor-umber.vercel.app'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    const userSocketMap = {};
    const getReceiverSocketId = (receiverId) => {
        return userSocketMap[receiverId];
    };
    io.on('connection', (socket) => {
        console.log('Socket Connected', socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap[userId] = socket.id;
            (0, setLastSeen_1.setLastSeen)(userId, Date.now());
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
        socket.on('newMessage', (newMessage) => {
            console.log('New Message:', newMessage);
            const receiverSocketId = getReceiverSocketId(newMessage.obj.reciever);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newMessage', newMessage);
                (0, setLastSeen_1.setLastSeen)(newMessage.obj.sender, Date.now());
            }
            else {
                console.log('Receiver is offline');
            }
        });
        socket.on('messageSeen', (_a) => __awaiter(void 0, [_a], void 0, function* ({ messageId, chatId, recieverId }) {
            console.log(`Message seen: ${messageId}, ${chatId}, ${recieverId}`);
            yield (0, messageSeen_1.messageSeen)(messageId);
            const receiverSocketId = getReceiverSocketId(recieverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('messageSeen', { messageId, chatId });
            }
        }));
        socket.on('typing', ({ receiverId, sender }) => {
            console.log(`Typing from ${sender} to ${receiverId}`);
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('typing', { sender });
            }
        });
        socket.on('stopTyping', ({ receiverId, sender }) => {
            console.log(`Stop typing from ${sender} to ${receiverId}`);
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('stopTyping', { sender });
            }
            else {
                console.log("Receiver not found to stop typing");
            }
        });
        socket.on("videoCall", (data) => {
            console.log("hello chat in Videochat", data);
            const targetSocketId = getReceiverSocketId(data.id);
            console.log(targetSocketId);
            io.to(targetSocketId).emit('incomingCall', { data });
        });
        socket.on('joinCall', ({ callId }) => {
            console.log(`Joining call with callId ${callId}`);
            socket.join(callId);
        });
        socket.on('offer', ({ offer, callId }) => {
            console.log(`Offer received for call ${callId}`);
            socket.to(callId).emit('offer', { offer });
        });
        socket.on('answer', ({ answer, callId }) => {
            console.log(`Answer received for call ${callId}`);
            socket.to(callId).emit('answer', { answer });
        });
        socket.on('ice-candidate', ({ candidate, callId }) => {
            console.log(`ICE candidate received for call ${callId}`);
            socket.to(callId).emit('ice-candidate', { candidate });
        });
        socket.on('endCall', ({ callId }) => {
            console.log(`Ending call with callId ${callId}`);
            io.to(callId).emit('callEnded');
            io.in(callId).socketsLeave(callId);
        });
        socket.on('acceptCall', ({ senderId, receiverId }) => {
            console.log(`Accepting call from ${senderId} by ${receiverId}`);
            const senderSocketId = getReceiverSocketId(senderId);
            if (senderSocketId) {
                io.to(senderSocketId).emit('callAccepted', { receiverId });
            }
            else {
                console.log("Sender not found to accept call");
            }
        });
        socket.on('declineCall', ({ senderId, receiverId }) => {
            console.log(`Declining call from ${senderId} by ${receiverId}`);
            const senderSocketId = getReceiverSocketId(senderId);
            if (senderSocketId) {
                io.to(senderSocketId).emit('callDeclined', { receiverId });
            }
            else {
                console.log("Sender not found to decline call");
            }
        });
        socket.on('disconnect', () => {
            console.log('Socket Disconnected', socket.id);
            Object.keys(userSocketMap).forEach((key) => {
                if (userSocketMap[key] === socket.id) {
                    delete userSocketMap[key];
                    (0, setLastSeen_1.setLastSeen)(key, Date.now());
                }
            });
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });
};
exports.default = connectSocketIo;
