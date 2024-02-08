const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')

router.post('/user', userController.addUser)
router.get('/users', userController.getUsers)
router.get('/user/:user_id', userController.getUser)
router.put('/user', userController.updateUser)
router.delete('/user/:user_id', userController.deleteUser)

module.exports = router