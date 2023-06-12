const express = require('express')
const router = express.Router();
const controller = require('./user.controller')

// router.get('/', (req, res) => res.send('Hello World!'))
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.remove)
router.post('/', controller.create)

module.exports = router