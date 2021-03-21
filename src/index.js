const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//Server starter
app.listen(port, () => {
    console.log('Server is up on port ' + port)
    console.log('--------------------------------------------------CONSOLE--------------------------------------------------------------')
})


//Use populate and execPopulate
// const Task = require('./models/task')
// const User = require('./models/user')

// const temp = async() => {
//     // const task = await Task.findById('6057516d3a8cf315a00291be')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('60574f981ec5881c782d488d')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// temp()