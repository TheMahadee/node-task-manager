const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
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
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
}, {
    timestamps: true
})

//Virtual property (relationship between 2 entity)
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

//Restrics User data for response
userSchema.methods.toJSON = function() {
    const user = this
    const userPublicData = user.toObject()
    delete userPublicData.password
    delete userPublicData.tokens
    return userPublicData
}

//JSON WEB TOKEN
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecretcode')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//Login 
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to log in!')
    }
    return user
}

//Hashing password
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Delete users task when user is deleted
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User