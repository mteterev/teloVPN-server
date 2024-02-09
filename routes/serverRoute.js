const Router = require('express')
const serverController = require('../controllers/serverController')
const router = new Router()

router.post('/server', serverController.addServer)
router.get('/servers', serverController.getServers)
router.put('/server', serverController.updateServer)
router.delete('/server', serverController.deleteServers)

module.exports = router