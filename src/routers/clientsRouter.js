import express from 'express';
import { createClient } from '../controllers/clientsController.js';
import { validateClient } from '../middlewares/clientsMiddleware.js';

const router = express.Router();

router.post('/clients', validateClient, createClient);

export default router;