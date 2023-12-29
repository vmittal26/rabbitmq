import amqp, { Channel } from "amqplib";

export class Producer {
  private channel: Channel | null = null;

  async createChannel() {
    const connection = await amqp.connect("amqp://rabbitmq-server.thankfulrock-9b69544f.centralindia.azurecontainerapps.io");

    console.log('connection established');
    this.channel = await connection.createChannel();
  }

  async publishMessage(key: string, message: any) {
    try {
      if (this.channel == null) {
        console.log('creating channel')
        await this.createChannel();
      }

      const exchangeName = "logExchange";
      await this.channel?.assertExchange(exchangeName, "direct");

      this.channel?.publish(
        exchangeName,
        key,
        Buffer.from(
          JSON.stringify({
            logType: key,
            message,
            dateTime: new Date(),
          })
        )
      );
      console.log("Message is published successfully");
    } catch (error) {
      console.log("Error ", error);
      throw error;
    }
  }
}
