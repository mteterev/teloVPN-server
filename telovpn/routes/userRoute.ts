import express from 'express';
import { userController } from '../controllers/userController';
const router = express.Router();

router.post('/user', userController.addUser);
router.get('/users', userController.getUsers);
router.get('/user/:user_id', userController.getUser);
router.put('/user', userController.updateUser);
router.put('/user/test', userController.updateUserTest);
router.post('/user/pay/success', userController.updateUserAfterFirstPay);
router.delete('/user/:user_id', userController.deleteUser);
router.get('/user/server/:user_id', userController.getUserServer);
router.get('/users/notpay', userController.getUsersNotPay);
router.get('/users/endsub', userController.getUsersEndSubscription);

export default router;
