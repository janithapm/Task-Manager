const express = require('express')
const router = express.Router()

//task model
const Task = require('../model/task')

router.use(express.json())

router.post('/tasks', (req, res) => {

    const task = new Task(req.body);

    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    })

})

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find({})
    if (tasks.length != 0)
        res.send(tasks)

    else res.status = 500
    res.send({ message: "can not find any data" })
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

router.patch('/tasks/:id', async (req, res) => {

    updates = Object.keys(req.body)
    allowedUpdates = ['description']
    isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ message: "not allowed" })
    }
        try {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: this.true,useFindAndModify:false })
    
            if (!updatedTask)
                return res.status(404).send({ "messsage": "no task for id" + req.params.id })
            return res.send(updatedTask)
        }
        catch (e) {
            res.status(400).send(e)
        }
})

router.delete('/tasks/:id',async(req,res)=>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if(!deletedTask){
            return res.status(404).send({"error":"no task"})
        }
        res.send(deletedTask)
    }
    catch(e){
        res.status(500).send(e)
    }
})
module.exports = router