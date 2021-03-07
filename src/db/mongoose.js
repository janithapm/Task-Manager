var mongoose = require('mongoose')
const mongoose_url = process.env.MNGODB_URL
mongoose.connect(mongoose_url,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then((success) => {
        console.log("successefully created db task-manager-api")
    }).catch((err) => {
        console.log(err)
    })




