import { RabbitMqServer } from "../services/rabbitmq";

export class OrderWorker {
  static async start() {
    const rabbitMqServer = new RabbitMqServer('amqp://guest:guest@localhost:5672');
    await rabbitMqServer.start();

    rabbitMqServer.consume('orders-queue', (message) => {
      console.log('Order will be created... ', message.content.toString())
    });
  }
}