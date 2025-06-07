import { Channel, ChannelModel, connect, ConsumeMessage, Replies } from "amqplib";
import { MessageBroker } from "./message-broker.interface";

export class RabbitMqServer implements MessageBroker {
  private connection!: ChannelModel;
  private channel!: Channel;

  constructor(private url: string) {
  }

  async start(): Promise<void> {
    this.connection = await connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async publishMessageInExchange(exchange: string, message: string): Promise<void> {
    await this.channel.assertExchange(exchange, 'fanout');
    this.channel.publish(exchange, '', Buffer.from(message));
    console.log('Message sended! %s', message);
  }

  async consume(queue: string, callback: (message: ConsumeMessage) => void): Promise<Replies.Consume> {
    return this.channel.consume(queue, (message: ConsumeMessage | null) => {
      if (message) {
        callback(message);
        this.channel.ack(message);
      }
    })
  }
}