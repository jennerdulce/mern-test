const mongoose = require('mongoose')
const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: 'Us er' // Which MODEL this objectID in type refers to
    },
    text: {
        type: String,
        required: [true, 'Please add text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)