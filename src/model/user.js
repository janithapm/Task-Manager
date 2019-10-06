var mongoose = require('mongoose')
var validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email not valid')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0)
                throw new Error('age must be positive');

        }
    },
    password: {
        type: String,
        trim: true,
        minLength: 6,
        validate(value) {
            if (validator.contains(value, 'password'))
                throw new Error('contains word \"password\"')
        },
        required: true
    }
})

module.exports = User