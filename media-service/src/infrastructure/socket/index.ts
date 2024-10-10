import { Socket } from "socket.io";
import { Server } from "http";
import { v4 as uuidV4 } from "uuid";
const socketIo = require("socket.io");

const connectSocketIo = (server: Server) => {
  const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  interface IRoomParams {
    roomId: string;
    peerId: string;
  }

  // Maps userId to their socketId
  const userSocketMap: { [key: string]: string } = {};

  // Maps roomId to array of peerIds
  const rooms: Record<string, string[]> = {};

  const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
  };

  io.on("connection", (socket: Socket) => {
    console.log("Socket Connected", socket.id);

    // Fetch userId from the handshake query
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    // Notify all clients of the updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("joinRoom", (roomId: string) => {
      console.log(`User with socket ID ${socket.id} is joining room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on("newMessage", (data: any) => {
      const { obj } = data;
      const roomId = obj.chat;
      const chatData = data.obj;

      const { attachments, chat, content, sender, createdAt, _id } = chatData;
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

    socket.on("create-room", () => {
      const roomId = uuidV4();
      rooms[roomId] = [];
      socket.emit("room-created", { roomId });
      console.log(`Room created: ${roomId}`);
    });

    socket.on("join-room", ({ roomId, peerId }: IRoomParams) => {
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      console.log(`User joining room: ${roomId} with peerId: ${peerId}`);
      console.log("Current room participants:", rooms[roomId]);

      // Add peerId to the room if not already in it
      if (!rooms[roomId].includes(peerId)) {
        rooms[roomId].push(peerId);
        socket.join(roomId);
        socket.to(roomId).emit("user-joined",{peerId})
        console.log(`Peer ${peerId} added to room ${roomId}`);
      }

      // Emit updated participants list to the room
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });

      console.log("Updated room participants:", rooms[roomId]);
    });



    



    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${reason}`);

      // Find the userId associated with this socket
      const disconnectedUserId = Object.keys(userSocketMap).find(
        (id) => userSocketMap[id] === socket.id
      );

      if (disconnectedUserId) {
        // Clean up the user from all rooms they were in
        for (const roomId in rooms) {
          if (rooms[roomId].includes(disconnectedUserId)) {
            rooms[roomId] = rooms[roomId].filter(
              (peerId) => peerId !== disconnectedUserId
            );

            // Notify other participants in the room
            io.to(roomId).emit("user-disconnected", {
              peerId: disconnectedUserId,
              remainingParticipants: rooms[roomId],
            });

            console.log(`Removed ${disconnectedUserId} from room ${roomId}`);
            console.log(`Remaining participants in room ${roomId}:`, rooms[roomId]);

            // If room is empty after user removal, delete it
            if (rooms[roomId].length === 0) {
              delete rooms[roomId];
              console.log(`Room ${roomId} deleted as it's empty`);
            }
          }
        }

        // Remove the disconnected user from the userSocketMap
        delete userSocketMap[disconnectedUserId];

        // Notify all clients of the updated online users list
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
};

export default connectSocketIo;
