const express = require('express')
const router = express.Router()
const TempoController = require('../controllers/TempoController')

router.get('/adicionar', TempoController.criarTempo)
router.post('/adicionar', TempoController.criarTempoPost)
router.post('/remove', TempoController.removeTempo)
router.get('/editar/:id', TempoController.atualizarTarefa)
router.post('/editar', TempoController.atualizarTarefaPost)
router.post('/atualizarstatus', TempoController.atualizarStatus)
router.get('/', TempoController.mostrarTempos)

module.exports = router