import express from 'express';
import { validateOrders } from '../middlewares/ordersMiddleware.js';
import { createOrders } from '../controllers/ordersController.js';

const router = express.Router();

router.post('/orders', validateOrders, createOrders);

export default router;