const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userResource = require('../resources/userResource')

exports.register = async (req, res) => {
     /* ----- The email is unique and it shouldn't have been used before ----- */
    const userAlreadyExists = await User.findOne({email: req.body.email})
    if(userAlreadyExists) {
        return res.status(422).json({errors: ['The email was already taken']})
    }

    /* ----- Creating the user ----- */
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10) // Hashing the password
    })

    res.status(201).json(userResource(user)) // the userResource is used to format the user data
}

exports.login = async (req, res) => {
    const user = await User.findOne({email: req.body.email}) // Check if a user with that email exists
    
    // If there is no user with that email or comparing the hash isn't the same we throw an error
    if(!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(422).json({errors: ['Wrong username or password']})
    }

    // We create a token for the user
    jwt.sign({userId: user._id}, process.env.JWT_SECRET, (err, token) => {

        // If an error happens we throw it
        if(err) {
            throw new Error('Could not generate token')
        }

        // We return back the user and token
        res.json({
            user: userResource(user),
            token
        })
    }) 
    
}

exports.account = async (req, res) => {
    // We return the current authenticated user
    res.json(userResource(req.user))
}

