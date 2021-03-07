var mongoose = require('mongoose')
var validator = require('validator')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const Task = require('./task')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.__v

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('can not find the user')
    }

    const matchedPassword = await bcrypt.compare(password, user.password)

    if (!matchedPassword) {
        throw new Error('can not find the user')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    // cannot use an arrow function , since
    //this keyword is not accessible by an arrow function
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user = this
    const deletedTasks = await Task.deleteMany({'owner':user._id})
    next()
    
})

const User = mongoose.model('User', userSchema)

module.exports = User