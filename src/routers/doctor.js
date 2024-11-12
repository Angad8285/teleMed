const express = require('express')
const doctorAuth = require('../middleware/doctorAuth')
const User = require('../models/user')
const Doctor = require('../models/doctor')
const Consultation = require('../models/consultation')

const router = new express.Router()

// register new doctor
router.post('/doctors', async (req, res) => {
    const doctor = new Doctor(req.body)

    try {
        await doctor.save()
        const token = await doctor.generateAuthToken()
        res.status(201).send({ doctor, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//login doctor
router.post('/doctors/login', async (req, res)=>{
    try{
        const doctor = await Doctor.findByCredentials(req.body.email, req.body.password)
        const token = await doctor.generateAuthToken()
        res.status(200).send({doctor, token})
    } catch(e){
        res.status(400).send(e)
    }
})

//get doctor profile
router.get('/doctors/me', doctorAuth, async (req, res) => {
    res.send(req.doctor)
})

//logout doctor
router.post('/doctors/logout', doctorAuth, async (req, res)=>{
    try {
        req.doctor.tokens = req.doctor.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.doctor.save()
        res.send({message: "Doctor has logged out"})
    } catch (e) {
        res.status(500).send()
    }
})

//route to get doctors by specialization
router.get('/doctors/speciality/:speciality', async (req,res)=> {
    const {speciality} = req.params
    try{
        const doctors = await Doctor.find({specialization: speciality })
        res.status(200).send({doctors})
    } catch(e){
        res.status(400).send(e)
    }
})


module.exports = router