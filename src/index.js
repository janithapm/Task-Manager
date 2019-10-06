const express = require('express')
require('./db/mongoose')

//models
const Task = require("./model/task")

//routes
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = 8080

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("server started at the port : " + port + ".")
})