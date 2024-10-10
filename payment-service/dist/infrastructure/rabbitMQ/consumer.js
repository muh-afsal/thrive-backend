"use strict";
// import { getChannel } from "./rabbitmqConfig";
// // import { saveUserToDatabase } from "../database/mongodb/repositories/saveUser";
// export const Userconsumer = async (queueName: string) => {
//   const channel = getChannel();
//   if (channel) {
//     await channel.assertQueue(queueName, { durable: true });
//     console.log(`Consuming from queue: ${queueName}`);
//     channel.consume(queueName, async (msg) => {
//       if (msg !== null) {
//         try {
//           const user = JSON.parse(msg.content.toString());
//           console.log("Received user data:", user);
//           // await saveUserToDatabase(user);
//           channel.ack(msg);
//         } catch (error) {
//           console.error("Error processing message:", error);
//           channel.nack(msg, false, true);
//         }
//       }
//     });
//   } else {
//     console.error("Channel is not available");
//   }
// };
