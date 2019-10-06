const express = require('express')
const router = express.Router()

//user model
const User = require("../model/user")

router.use(express.json())

router.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    })

})

router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500)
        res.send(e)
    })
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

module.exports = router


