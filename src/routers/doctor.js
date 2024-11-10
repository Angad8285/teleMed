const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Doctor = require('../models/doctor')
const Consultation = require('../models/consultation')

router.get('/doctorhome', async (req, res) => {
    try{
        res.status(201).send({message: "this is doctors route"})
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/doctors', async (req, res) => {
    const doctor = new Doctor(req.body)

    try{
        await doctor.save()
        res.status(201).send({ message: "Create new doctor", doctor })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/doctors/login', async (req, res)=>{
    try{
        res.status(201).send({message: "doctor login route" })
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/doctors/logout', async (req, res)=>{
    try{
        res.status(201).send({message: "doctor logout route" })
    } catch(e){
        res.status(400).send(e)
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

// Route to schedule an appointment
router.post('/doctors/:doctorId/consultations', async (req, res) => {
    const { doctorId } = req.params
    const { userId, time } = req.body
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

module.exports = router