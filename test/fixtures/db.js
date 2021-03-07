const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/model/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "ABCD",
    email: "abcd@gmail.com",
    password: "dfdfdf",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const setUpDatabase = async () => {
    await User.deleteMany()
    await new User.find(userOne).save()
}

module.exports = {
    userOneId,userOne,setUpDatabase
}