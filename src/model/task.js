var mongoose = require('mongoose')

var taskSchema = mongoose.Schema({
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

taskSchema.pre('save',function (next){
    const task = this;
    console.log("task saved")
    next()
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task