var mongoose = require('mongoose')

var taskSchema = mongoose.Schema({
    description: {
        type: String
    },
    completed: {
        type: Boolean
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

taskSchema.pre('save',function (next){
    const task = this;
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task