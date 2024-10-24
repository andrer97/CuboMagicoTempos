const express = require('express')
const router = express.Router()
const TempoController = require('../controllers/TempoController')

router.get('/adicionar', TempoController.criarTempo)
router.post('/adicionar', TempoController.criarTempoPost)
router.post('/remove', TempoController.removeTempo)
router.get('/editar/:id', TempoController.atualizarTempo)
router.post('/editar', TempoController.atualizarTempoPost)
router.get('/', TempoController.mostrarTempos)

module.exports = router