const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Generate JWT Token to be used
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc Get logged in user data
// @route GET /api/users/all
// @access Public

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

// @desc Register a user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // Tokens do not need to be saved   
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Get logged in user data
// @route GET /api/users/me
// @access Public

const getMe = asyncHandler(async (req, res) => {
    // res.json({ message: 'User data displayed '})
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})

// @desc Authenticate and log a user in
// @route POST /api/users/login
// @access Public
    // is public because all users begin not logged in, this should be usable by everyone

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne( {email} )

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: 'User successfully logged in!'
           }) 
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
})

module.exports = {
    getMe,
    loginUser,
    registerUser,
    getAllUsers
}