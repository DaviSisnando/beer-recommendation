import express from 'express';
import dotenv from 'dotenv';
import recommendationRouter from './routes/recommendation';
import { connectRabbitMQ } from './messaging/rabbitmq';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', recommendationRouter);

connectRabbitMQ().then(() => {
  console.log('Connected to RabbitMQ');
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});