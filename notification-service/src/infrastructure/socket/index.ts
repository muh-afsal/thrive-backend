import { Socket } from "socket.io";
import { Server } from "http";
const socketIo = require("socket.io");
import handleNotificationEvents from "./notificationEvents";

const connectSocketIo = (server: Server) => {
  const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });


  io.on("connection", (socket: Socket) => {
    console.log("Socket Connected", socket.id);

    // const userId = socket.handshake.query.userId as string;

    handleNotificationEvents(socket, io);

    socket.on("disconnect", (reason: any) => {
      console.log(`User disconnected: ${reason}`);

   
    });
  });
};

export default connectSocketIo;
