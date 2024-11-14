const express = require('express')
const userAuth = require('../middleware/userAuth')
const User = require('../models/user')
const Doctor = require('../models/doctor')
const Consultation = require('../models/consultation')

const router = new express.Router()

// register new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//login user
router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch(e){
        res.status(400).send(e)
    }
})

//get user profile
router.get('/users/me', userAuth, async (req, res) => {
    res.send(req.user)
})

//logout user
router.post('/users/logout', userAuth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send({message: "User has logged out"})
    } catch (e) {
        res.status(500).send()
    }
})

// Route to schedule an appointment
router.post('/users/:doctorId/consultations', userAuth, async (req, res) => {
    const { doctorId } = req.params
    const { time } = req.body
    const userId = req.user._id
    try {

        const doctor = await Doctor.findById(doctorId)
        const user = await User.findById(userId)

        if(!doctor || !user){
            return res.status(404).send({message: "Doctor or user not found"})
        }

        if(await Consultation.findOne({userId, doctorId, time})){
            return res.status(400).send({message: "Consultation already present"})
        }

        const consultation = new Consultation({ userId, doctorId, time })
        await consultation.save()

        // Update User to include this consultation
        await User.findByIdAndUpdate(userId, { $push: { consultations: consultation._id } });

        // Update Doctor to include this consultation
        await Doctor.findByIdAndUpdate(doctorId, { $push: { consultations: consultation._id } });

        res.status(201).send({ message: 'Consultation scheduled', consultation })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get consultation details and chat history
router.get('/users/consultations/:doctorId', userAuth, async (req, res)=>{
    const {doctorId} = req.params
    try{
        const consultations = await Consultation.find({ userId: req.user._id, doctorId})
        if(consultations.length == 0){
            return res.status(404).send({message: "consultation not found"})
        }
        res.status(200).send(consultations)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router