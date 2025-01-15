const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Middleware to veryfiy token
module.exports = async(req, res, next) => {
    try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if(err) {
            return res.status(400).json({message: 'Unauthenticated'})
        }

        req.user = await User.findById(data.userId)
        next()
    })

    } catch(e) {
        res.status(400).json({message: 'Unauthenticated'})
    }
}