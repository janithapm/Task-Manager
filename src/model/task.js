var mongoose = require('mongoose')

const Task = mongoose.model('tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

module.exports = Task