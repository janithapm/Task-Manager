// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const {MongoClient,ObjectID} = require("mongodb")
const id = new ObjectID()
console.log(id)

const connectionURL = 'mongodb://127.0.0.1'
const dbName = 'task-manager'

// MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,connect)=>{
//     if(error){
//         return console.log("could not establish the connection")
//     }

//     console.log("connection established")
//     const db = connect.db(dbName)

//     db.collection("newTasks").insertMany(
//         [
//             {   _id : 3,
//                 description : "add a new app",
//                 completed: true
//             },
//             {
//                 description:"create mongo app",
//                 completed: false
//             },
//             {
//                 description:"iron the clothes",
//                 completed: false
//             }
//         ],
//         (error,result)=>{
//             if(error){
//                 return console.log(error)
//             }

//             console.log("documents inserted")
//             console.log(result.ops)
//         }
//     )
// })

//retrieve tasks

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error, connect)=>{
    if(error){
        return console.log("connection could not established")
    }

    console.log("coonection established")
    const db = connect.db(dbName)

    db.collection('newTasks').find({completed:"x"}).toArray((error,tasks)=>{
        if(error){
            return console.log("can not retireve the documents")
        }
    
        if(tasks.length==0){
            return console.log("returned object is empty")
        }
        return console.log(tasks)
    })
})