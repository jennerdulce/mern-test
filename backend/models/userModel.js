const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    // name: {
    //     type: String,
    //     required: [true, 'Please add a ']
    // }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)