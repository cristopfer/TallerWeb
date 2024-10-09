const express = require('express')
const router = express.Router()
const messageController = require('../controllers/message_controller')

router.post('/mensaje', messageController.insert_message)
router.post('/listadoMensajeProfesor', messageController.get_teacher_message)
router.post('/verMensajePrivado', messageController.get_private_message)
router.post('/mensajePrivadoProfesor', messageController.insert_private_message)