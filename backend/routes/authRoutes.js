const express = require('express')
const authController = require('../controllers/authController')
const validator = require('../middlewares/validatorMiddleware')
const { registerSchema, loginSchema } = require('../validations/authValidation')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/auth/register', validator(registerSchema), authController.register)
router.post('/auth/login', validator(loginSchema), authController.login)
router.get('/auth/account', authMiddleware, authController.account)

module.exports = router