import express from 'express';
import { createCake } from '../controllers/cakesController.js';

const router = express.Router();

router.post('/cakes', createCake);

export default router;