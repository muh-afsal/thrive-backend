"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const handleCallEvents = (socket, io, rooms) => {
    socket.on("create-room", ({ currentUserId }) => {
        const roomId = (0, uuid_1.v4)();
        rooms[roomId] = [];
        socket.emit("room-created", { roomId });
    });
    socket.on("join-room", ({ roomId, userId }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        rooms[roomId].push(userId);
        socket.join(roomId);
        socket.to(roomId).emit("user-joined-room", userId);
        io.to(socket.id).emit("existing-users", rooms[roomId].filter((id) => id !== userId));
        // Send streams from existing users to the new user
        rooms[roomId].forEach((existingUserId) => {
            if (existingUserId !== userId) {
                socket.to(existingUserId).emit("new-user-joined", userId);
            }
        });
        socket.on("disconnect", () => {
            // Add a check to make sure roomId exists before accessing rooms[roomId]
            if (rooms[roomId]) {
                rooms[roomId] = rooms[roomId].filter((id) => id !== userId);
                if (rooms[roomId].length === 0) {
                    delete rooms[roomId]; // Optionally delete the room if it's empty
                }
            }
            socket.to(roomId).emit("user-disconnected", userId);
        });
    });
};
exports.default = handleCallEvents;
