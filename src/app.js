const express = require('express')
require('./db/mongoose')

//models
const Task = require("./model/task")


//routes
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()

app.use(express.json())

//middleware when the site is in the maintenance
// app.use((req,res,next)=>{
//     res.status(503).send({message:"web site is shut down for the maintenance"})
// })

app.use(userRouter)
app.use(taskRouter)
 
module.exports = {app}
// app.listen(port, () => {
//     console.log("server started at the port : " + port + ".")
// })