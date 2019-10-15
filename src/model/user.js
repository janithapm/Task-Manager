var mongoose = require('mongoose')
var validator = require('validator')

const userSchema = mongoose.Schema({
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

userSchema.pre('save',async function(next){
    // cannot use an arrow function , since
    //this keyword is not accessible by an arrow function
    const user = this
    console.log("before saving user")
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User