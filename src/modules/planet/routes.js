const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/planets', controller.list)
router.get('/planet/name/:nome', controller.findPlanetByName)
router.get('/planet/id/:id', controller.findPanetById)
router.post('/planet/create', controller.create)
router.patch('/planet/id/:nome', controller.updateById)
router.delete('/planet/id/:id', controller.delete)

module.exports = router