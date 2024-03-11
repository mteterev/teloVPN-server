import express from 'express';
import { priceController } from '../controllers/priceController';
const router = express.Router();

router.get('/price/:promocode', priceController.getPrice);
router.get('/price/id/:id', priceController.getPriceById);
router.post('/price', priceController.addPrice);
router.delete('/price/:promocode', priceController.deletePrice);

export default router;
