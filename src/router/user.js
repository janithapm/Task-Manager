const express = require('express')
const router = express.Router()

//user model
const User = require("../model/user")

//authentication middleware
const authentication = require('../middleware/auth')

router.use(express.json())

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(401).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', authentication, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({ message: "logged out" })
    }
    catch (e) {
        res.status(500).send()

    }
})

router.post('/users/logoutall', authentication, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({message:"logged out from all sessions"})
    }
    catch (e) {

    }
})

router.get('/users/me', authentication, (req, res) => {
    try {
        res.send(req.user)
    }
    catch (e) {
        res.status(400).send()
    }

})

router.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(404)
        res.send(e)
    })
})

router.patch('/users/:id', async (req, res) => {

    allowedUpdates = ['name', 'age', 'email']
    updates = Object.keys(req.body)
    isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ message: "bad request" })
    }

    try {

        //const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})

        //this user is not still updated
        const updatedUser = await User.findById(req.params.id)
        updates.forEach(update => updatedUser[update] = req.body[update]);

        await updatedUser.save()

        if (!updatedUser) {
            return res.status(404).send({ error: "no user for the id" })
        }

        return res.send(updatedUser)
    }
    catch (e) {

        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.status(404).send({ "error": "no user" })
        }
        res.send(deletedUser)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router