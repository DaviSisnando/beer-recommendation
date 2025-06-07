import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

let channel: amqp.Channel;

const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URI as string);
  channel = await connection.createChannel();
  await channel.assertQueue('beerStyleQueue', { durable: true });
};

const sendMessage = (queue: string, message: string) => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
};

export { connectRabbitMQ, sendMessage };