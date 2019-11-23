const express = require('express')
const router = express.Router()

//task model
const Task = require('../model/task')

//user authentication
const auth = require('../middleware/auth')

router.use(express.json())

router.post('/tasks', auth, (req, res) => {

    const task = new Task({ ...req.body, owner: req.user._id });

    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    })

})

router.get('/tasks', auth, async (req, res) => {
    try {
        //const tasks = await Task.find({"owner":req.user._id})
        //other than above can use following,

        await req.user.populate("tasks").execPopulate()

        res.send(req.user.tasks)
    }
    catch (e) {
        res.status(400).send()
    }
})

// router.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id

//     Task.findById(_id).then((task) => {
//         res.send(task)
//     }).catch((e) => {
//         res.status(404)
//         res.send(e)
//     })
// })

router.patch('/tasks/:id', auth, async (req, res) => {

    updates = Object.keys(req.body)
    allowedUpdates = ['description']
    isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ message: "not allowed" })
    }
    try {
        //const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: this.true,useFindAndModify:false })

        const updatedTask = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        allowedUpdates.forEach(update => updatedTask[update] = req.body[update]);
        updatedTask.save()

        if (!updatedTask)
            return res.status(404).send({ "messsage": "no task for id" + req.params.id })
        return res.send(updatedTask)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!deletedTask)
            return res.status(404).send()

        res.send(deletedTask)
    }
    catch (e) {
        res.status(400).send()
    }
})
module.exports = router