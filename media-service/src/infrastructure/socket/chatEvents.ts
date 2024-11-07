import { Socket } from "socket.io";

const handleChatEvents = (socket: Socket, io: any, userSocketMap: Record<string, string>) => {


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
};

export default handleChatEvents;
