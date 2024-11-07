"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleNotificationEvents = (socket, io) => {
    socket.on("text", (h) => {
        console.log(`User with socket ID ${socket.id} has the hhhhhhhhhhhhhh${h}`);
    });
};
exports.default = handleNotificationEvents;
