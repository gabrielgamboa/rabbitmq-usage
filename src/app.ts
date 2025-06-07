import express from 'express';
import { orderRoutes } from './http/routes';

const app = express();
app.use(express.json())
app.use('/orders', orderRoutes)
export { app }