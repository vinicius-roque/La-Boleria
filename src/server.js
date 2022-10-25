import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cakesRouter from './routers/cakesRouter.js';
import clientsRouter from './routers/clientsRouter.js';
import ordersRouter from './routers/ordersRouter.js';

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());

server.use(cakesRouter);
server.use(clientsRouter);
server.use(ordersRouter);

server.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`));