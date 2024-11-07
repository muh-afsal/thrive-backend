"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const handleCallEvents = (socket, io, rooms) => {
    socket.on("create-room", ({ currentUserId }) => {
        const roomId = (0, uuid_1.v4)();
        rooms[roomId] = { users: [], host: currentUserId };
        socket.emit("room-created", { roomId });
    });
    socket.on("join-room", ({ roomId, userId }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = { users: [], host: userId };
        }
        rooms[roomId].users.push(userId);
        socket.join(roomId);
        if (!rooms[roomId].host) {
            rooms[roomId].host = userId;
        }
        io.to(socket.id).emit("existing-users", rooms[roomId].users.filter((id) => id !== userId));
        io.to(socket.id).emit("host-users", { host: rooms[roomId].host });
        rooms[roomId].users.forEach((existingUserId) => {
            if (existingUserId !== userId) {
                socket.to(existingUserId).emit("new-user-joined", userId);
            }
        });
    });
    socket.on("remove-user", ({ roomId, userIdToRemove }) => {
        const room = rooms[roomId];
        if (room) {
            const userExists = room.users.includes(userIdToRemove);
            if (userExists) {
                room.users = room.users.filter((id) => id !== userIdToRemove);
                io.to(roomId).emit("remove-user-stream", { userId: userIdToRemove });
                socket.to(roomId).emit("user-removed", userIdToRemove);
                io.to(roomId).emit("user-removed-from-room", userIdToRemove);
                io.to(userIdToRemove).socketsLeave(roomId);
                if (room.host === userIdToRemove) {
                    room.host = room.users.length > 0 ? room.users[0] : null;
                    io.to(roomId).emit("host-users", { host: room.host });
                }
            }
        }
        else {
            console.log(`Room ${roomId} does not exist.`);
        }
    });
    socket.on("disconnect", () => {
        Object.keys(rooms).forEach((roomId) => {
            const room = rooms[roomId];
            room.users = room.users.filter((id) => id !== socket.id);
            if (room.users.length === 0) {
                delete rooms[roomId];
            }
            else if (room.host === socket.id) {
                room.host = room.users[0];
                io.to(roomId).emit("host-users", { host: room.host });
            }
            socket.to(roomId).emit("user-disconnected", socket.id);
        });
    });
};
exports.default = handleCallEvents;
