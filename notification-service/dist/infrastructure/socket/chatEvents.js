"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleNotificationEvents = (socket, io, userSocketMap) => {
    socket.on("joinRoom", (roomId) => {
        console.log(`User with socket ID ${socket.id} is joining room: ${roomId}`);
        socket.join(roomId);
    });
    socket.on("newMessage", (data) => {
        const { obj } = data;
        const roomId = obj.chat;
        const chatData = data.obj;
        const { attachments, chat, content, sender, createdAt, _id } = chatData;
        console.log(attachments, 'kkkkkkkkkkkkkkkkkkkkkkk');
        const senderId = obj.sender;
        io.to(roomId).emit("receiveMessage", {
            _id,
            createdAt,
            content,
            sender,
            chat,
            attachments,
        });
        console.log(`New message from ${senderId} in room ${roomId}:`);
    });
    socket.on("typing", ({ roomId, sender }) => {
        if (roomId) {
            socket.to(roomId).emit("userTyping", { sender });
        }
    });
    socket.on("stopTyping", ({ roomId, sender }) => {
        if (roomId) {
            socket.to(roomId).emit("hideTyping", { sender });
        }
    });
};
exports.default = handleNotificationEvents;
