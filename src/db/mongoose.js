const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

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

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

// const user = new User({
//     name: ' The Mahadee',
//     password: 'nanada',
//     email: ' mhassan@gmail.com ',
//     age: 23
// })

// user.save().then(() => {
//     console.log(user)
// }).catch((error) => {
//     console.log('Error: ' + error)
// })

const task = new Task({
    title: 'Eat something',
    description: ' Get something to eat. ',
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log('Error: ' + error)
})