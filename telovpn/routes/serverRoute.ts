import express from 'express';
import { serverController } from '../controllers/serverController';
const router = express.Router();

router.post('/server', serverController.addServer);
router.get('/servers', serverController.getServers)
router.put('/server', serverController.updateServer)
router.delete('/server', serverController.deleteServers)
router.get('/server/best', serverController.bestServer)

export default router;
