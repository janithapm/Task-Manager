// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const {MongoClient,ObjectID} = require("mongodb")
const id = new ObjectID()
console.log(id)

const connectionURL = 'mongodb://127.0.0.1'
const dbName = 'task-manager'

// MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
//     if(error){
//         return console.log("connection couldn't established")
//     }
//     console.log("connection established")
//     const db = client.db(dbName)

//     db.collection('users').insertMany(
//         [{
//             name : "Janitha",
//             age:"26"
//         },
//         {
//             name : "Ajitha",
//             age:"26"
//         }],
//         (error,result)=>{
//             if(error){
//                 return console.log("could not save the document")
//             }
//             console.log(result.ops)
//         }
//     )
// })

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,connect)=>{
    if(error){
        return console.log("could not establish the connection")
    }

    console.log("connection established")
    const db = connect.db(dbName)

    db.collection("newTasks").insertMany(
        [
            {   _id : 3,
                description : "add a new app",
                completed: true
            },
            {
                description:"create mongo app",
                completed: false
            },
            {
                description:"iron the clothes",
                completed: false
            }
        ],
        (error,result)=>{
            if(error){
                return console.log(error)
            }

            console.log("documents inserted")
            console.log(result.ops)
        }
    )
})
