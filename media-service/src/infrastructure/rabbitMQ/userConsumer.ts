import { getChannel } from "./rabbitmqConfig";
import { User } from "../../infrastructure/database/mongodb/models/UserSchema";

export const userDataConsumer = async (queueName: string) => {
  const channel = await getChannel();
  if (channel) {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Consuming from queue: ${queueName}`);

    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        try {
          const userData = JSON.parse(msg.content.toString());
          console.log("Received user data:", userData);


          await User.findOneAndUpdate(
            { _id: userData._id }, 
            { $set: userData }, 
            { upsert: true, new: true }
          );

          console.log("User upserted successfully");
          channel.ack(msg);
        } catch (error) {
          console.error("Error processing user data:", error);
          channel.nack(msg, false, true);
        }
      }
    });
  } else {
    console.error("Channel is not available");
  }
};
