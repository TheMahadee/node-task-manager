const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email invalid')
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password too small!'],
        trim: true,
        validate(value) {
            if (/password/i.test(value)) {
                throw new Error('Password contains the word "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        min: [0, "Age can't be an negative number"]
    },
})

module.exports = User