const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController.js');

router.post('/user', userController.addUser);
router.get('/users', userController.getUsers);
router.get('/user/:user_id', userController.getUser);
router.put('/user', userController.updateUser);
router.post('/user/pay/success', userController.updateUserAfterFirstPay);
router.delete('/user/:user_id', userController.deleteUser);
router.get('/user/server/:user_id', userController.getUserServer);
router.get('/users/notpay', userController.getUsersNotPay);
router.get('/users/endsub', userController.getUsersEndSubscribtion);

module.exports = router;
