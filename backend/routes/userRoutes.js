const express = require('express')
const router = express.Router()
const { registerUser, getMe, loginUser, getAllUsers } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)
router.get('/all', getAllUsers)

module.exports = router