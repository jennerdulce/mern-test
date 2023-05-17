const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register a user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Register user'})
})

// @desc Get logged in user data
// @route GET /api/users/me
// @access Public

const getMe = asyncHandler(async (req, res) => {
    res.json({ message: 'User data displayed '})
    const users = await User.find()
    // res.status(200).json(users)
})

// @desc Authenticate and log a user in
// @route POST /api/users/login
// @access Public
    // is public because all users begin not logged in, this should be usable by everyone

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login user'})
})

module.exports = {
    getMe,
    loginUser,
    registerUser
}