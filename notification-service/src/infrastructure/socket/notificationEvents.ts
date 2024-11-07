import { Socket } from "socket.io";

const handleNotificationEvents = (socket: Socket, io: any, ) => {


    socket.on("text", (h: Number) => {
        console.log(`User with socket ID ${socket.id} has the hhhhhhhhhhhhhh${h}`);
        
      });

 
};

export default handleNotificationEvents;
