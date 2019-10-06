var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task-manager-api',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then((success) => {
        console.log("successefully created db task-manager-api")
    }).catch((err) => {
        console.log(err)
    })




