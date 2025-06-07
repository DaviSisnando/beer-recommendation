import amqp from 'amqplib';
import { updateCache, removeFromCache } from '../cache/beerStyleCache';
import dotenv from 'dotenv';

dotenv.config();

export const connectRabbitMQ = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URI as string);
  const channel = await conn.createChannel();
  await channel.assertQueue('beerStyleQueue');

  channel.consume('beerStyleQueue', (msg) => {
    if (msg) {
      const event = JSON.parse(msg.content.toString());
      const { action, data } = event;

      if (action === 'created' || action === 'updated') updateCache(data);
      if (action === 'deleted') removeFromCache(data._id);

      channel.ack(msg);
    }
  });
};