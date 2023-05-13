const mongoose = require('mongoose')
const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add text vale']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)