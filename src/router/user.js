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

router.patch('/users/:id',async(req,res)=>{

    allowedUpdates = ['name','age']
    updates = Object.keys(req.body)
    isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({message:"bad request"})
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})

        if(!updatedUser){
            return res.status(404).send({error:"no user for the id"})
        }
        return res.send(updatedUser)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id',async(req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(404).send({"error":"no user"})
        }
        res.send(deletedUser)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router