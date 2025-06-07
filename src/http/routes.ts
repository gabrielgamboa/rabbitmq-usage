import { Router } from "express";
import { RabbitMqServer } from "../services/rabbitmq";

const orderRoutes = Router();

orderRoutes.post('/place-order', async (req, res) => {
  const { email, productName, quantity } = req.body;
  const rabbitMqServer = new RabbitMqServer('amqp://guest:guest@localhost:5672');
  await rabbitMqServer.start();
  rabbitMqServer.publishMessageInExchange('order.created', JSON.stringify({ email, productName, quantity }));
  res.status(200).json({ message: "Order created!"})
});

export { orderRoutes }