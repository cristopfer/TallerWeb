const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment_controller')

router.post('/comentar', commentController.insert_comment)
router.post('/listadoComentarioProfesor', commentController.get_teacher_comments_list)