import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database';
import { connectRabbitMQ } from './messaging/rabbitmq';
import router from './routes'

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

connectRabbitMQ().then(() => console.log('Connected to RabbitMQ'));

app.use(router);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 Beer Style Service running on http://localhost:${PORT}`);
});