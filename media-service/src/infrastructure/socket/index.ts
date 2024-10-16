import { Socket } from "socket.io";
import { Server } from "http";
const socketIo = require("socket.io");
import handleChatEvents from "./chatEvents";
import handleCallEvents from "./callEvents";

const connectSocketIo = (server: Server) => {
  const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap: { [key: string]: string } = {};

  const rooms: Record<string, string[]> = {};

  io.on("connection", (socket: Socket) => {
    console.log("Socket Connected", socket.id);

    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    handleChatEvents(socket, io, userSocketMap);
    handleCallEvents(socket, io, rooms);

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${reason}`);

      const disconnectedUserId = Object.keys(userSocketMap).find(
        (id) => userSocketMap[id] === socket.id
      );

      if (disconnectedUserId) {
        for (const roomId in rooms) {
          if (rooms[roomId].includes(disconnectedUserId)) {
            rooms[roomId] = rooms[roomId].filter(
              (peerId) => peerId !== disconnectedUserId
            );

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

export default connectSocketIo;
