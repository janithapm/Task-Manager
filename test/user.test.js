const request = require('supertest')
const { app } = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../src/model/user')

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

beforeEach(async () => {
    await User.deleteMany({})
    await User(userOne).save()
})

test("should sign up a new user", async () => {

    const response = await request(app).post('/users').send({
        name: "Ishara",
        email: "ishara@gmail.com",
        password: "myPass234!"
    }).expect(201)

    // assert that user has stored in the db
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response
    expect(response.body.user.name).toBe("Ishara")
    expect(response.body).toMatchObject({
        user:{
            name:"Ishara",
            email:"ishara@gmail.com"
        },
        token:user.tokens[0].token
    })
    expect(user.password).not.toBe("myPass234!")

})

test("should log in existing user", async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)

    // // validate new token is saved
    expect(response.body.token).toBe(user.tokens[1].token)

})

test("should not log in nonexistient user", async () => {
    await request(app).post('/users/login').send({
        email: 'nonexistient@gmail.com',
        password: 'nonexistient'
    }).expect(400)
})

test("should get profile for user", async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization','Bearer '+userOne.tokens[0].token )
    .send()
    .expect(200)
})

test("should not get profile for unauthenticated user",async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test("should delete account for user",async () => {
    let response = await request(app)
    .delete('/users/me')
    .set('Authorization','Bearer '+userOne.tokens[0].token )
    .send()
    .expect(200)

    let user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("should not delete account for unauthenticated user",async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test("should update valid user fields", async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization','Bearer '+userOne.tokens[0].token)
    .send({name:"Ishara Uditha"})
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Ishara Uditha')
})

test("should not update invalid user fields", async () => {
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization','Bearer '+userOne.tokens[0].token)
    .send({location:"Colombo"})
    .expect(400)
})
