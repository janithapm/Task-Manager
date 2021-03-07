const request = require('supertest')
const { app } = require('../src/app')

const Task = require('../src/model/task')

const {setUpDatabase,userOne,userOneId} = require('./fixtures/db')

beforeEach(async () => {
    setUpDatabase
})

test("shoul create task for user", () => {

})