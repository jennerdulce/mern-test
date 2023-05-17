const colors = require('colors')
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const app = express()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// Connection to MongoDB Atlas
connectDB()

// Allows req.body to be used
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))