// CRUD

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

const id = new ObjectID()

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database. Error: ' + error)
    }

    //console.log('---------Connected----------')

    const db = client.db(dbName)

    //Create 
    /*
    db.collection('users').insertOne({
        name: 'Maruf',
        age: 13
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert data. Error: ' + error)
        }

        console.log(result.ops)
    })

    db.collection('users').insertMany([{
        name: 'Mahir',
        age: 3
    }, {
        name: 'Ana',
        age: 2
    }], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!')
        }

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([{
        description: 'Task 1',
        completed: true
    }, {
        description: 'Task 2',
        completed: false
    }, {
        description: 'Task 3',
        completed: true
    }], (error, result) => {
        if (error) {
            return console.log('Unable to insert document')
        }

        console.log(result.ops)
    }) */

    //Read
    /*
    db.collection('users').findOne({ age: 23 }, (error, user) => {
        if (error) {
            return console.log('Failed to retrieve data')
        }

        console.log(user)
    })

    db.collection('users').find({ age: 23 }).toArray((error, users) => {
        if (error) {
            console.log("Unable to retreive data")
        }

        console.log(users)
    }) 

    db.collection('tasks').findOne({ _id: new ObjectID("6033e4fc13fc4f0afca86953") }, (error, task) => {
        if (error) {
            console.log("Failed")
        }

        console.log(task)
    })

    db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
        if (error) {
            console.log("Failed")
        }

        console.log(tasks)
    }) */

    //Update
    /*
    db.collection('users').updateOne({
        _id: new ObjectID("6033ca29b3f971289052770e")
    }, {
        $inc: {
            age: 1,
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) 

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true,
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */

    //Delete
    /* 
    db.collection('users').deleteMany({
        age: 23,
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */

    db.collection('tasks').deleteOne({
        description: 'Task 2',
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})