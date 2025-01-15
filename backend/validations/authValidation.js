const Joi = require('joi')

exports.registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})


exports.loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})