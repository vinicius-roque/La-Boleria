import express from 'express';
import { createCake } from '../controllers/cakesController.js';
import { validateCake } from '../middlewares/cakesMiddleware.js';

const router = express.Router();

router.post('/cakes', validateCake, createCake);

export default router;