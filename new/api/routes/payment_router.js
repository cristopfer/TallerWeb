const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment_controller')

router.post('/pagarServicio', paymentController.pay_teacher)