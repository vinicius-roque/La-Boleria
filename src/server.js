import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './database/database.js';
import cakesRouter from './routers/cakesRouter.js';

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());

server.use(cakesRouter);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});