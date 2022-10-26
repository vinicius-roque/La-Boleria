import express from 'express';
import { createClient, showClientsOrders } from '../controllers/clientsController.js';
import { validateClient } from '../middlewares/clientsMiddleware.js';

const router = express.Router();

router.post('/clients', validateClient, createClient);
router.get('/clients/:id/orders', showClientsOrders);

export default router;