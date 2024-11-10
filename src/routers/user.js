const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const Consultation = require('../models/consultation')

router.get('/userhome', async (req, res) => {
    try{
        res.status(201).send({message: "this is users route"})
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send({ message: "Created new user", user })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        res.status(201).send({message: "user login route" })
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', async (req, res)=>{
    try{
        res.status(201).send({message: "user logout route" })
    } catch(e){
        res.status(400).send(e)
    }
})

// get consultation details
router.get('/users/consultations/:doctorId', auth, async (req, res)=>{
    const {doctorId} = req.params
    try{
        const consultations = await Consultation.find({ userId: req.user._id, doctorId})
        res.status(200).send(consultations)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router