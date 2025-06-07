import { RabbitMqServer } from "../services/rabbitmq";

export async function orderWorker() {
  const rabbitMqServer = new RabbitMqServer('amqp://guest:guest@localhost:5672');
  await rabbitMqServer.start();

  rabbitMqServer.consume('orders-queue', (message) => {
    console.log('Order will be created... ', message.content.toString())
  });
}