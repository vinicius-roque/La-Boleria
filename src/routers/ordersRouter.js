import express from 'express';
import { validateOrders } from '../middlewares/ordersMiddleware.js';
import { createOrders, showOrders, showOrdersById } from '../controllers/ordersController.js';

const router = express.Router();

router.post('/orders', validateOrders, createOrders);
router.get('/orders', showOrders);
router.get('/orders/:id', showOrdersById);

export default router;