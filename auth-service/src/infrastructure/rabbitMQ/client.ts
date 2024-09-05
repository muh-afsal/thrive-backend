import amqp, { Connection } from "amqplib";
import { RABBITMQ_URL } from "../../config/envConfig/config";

class RabbitMQClient {
    private static instance: RabbitMQClient;
    private connection!: Connection;

    private constructor() {}

    static async getInstance(): Promise<RabbitMQClient> {
        if (!RabbitMQClient.instance) {
            RabbitMQClient.instance = new RabbitMQClient();
            await RabbitMQClient.instance.connect();
        }
        return RabbitMQClient.instance;
    }

    private async connect() {
        this.connection = await amqp.connect(RABBITMQ_URL);
        console.log("RabbitMQ connection established.");
    }

    getConnection(): Connection {
        if (!this.connection) {
            throw new Error("RabbitMQ connection is not established.");
        }
        return this.connection;
    }
}

export default RabbitMQClient;
