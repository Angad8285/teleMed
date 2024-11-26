const express = require('express')
const doctorAuth = require('../middleware/doctorAuth')
const User = require('../models/user')
const Doctor = require('../models/doctor')
const Consultation = require('../models/consultation')

const router = new express.Router()

const convertToIST = (utcDate) => {
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    return new Date(utcDate.getTime() + ISTOffset);
}

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
router.post('/doctors/login', async (req, res) => {
    try {
        const doctor = await Doctor.findByCredentials(req.body.email, req.body.password)
        const token = await doctor.generateAuthToken()
        res.status(200).send({ doctor, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//get doctor profile
router.get('/doctors/me', doctorAuth, async (req, res) => {
    res.send(req.doctor)
})

//logout doctor
router.post('/doctors/logout', doctorAuth, async (req, res) => {
    try {
        req.doctor.tokens = req.doctor.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.doctor.save()
        res.send({ message: "Doctor has logged out" })
    } catch (e) {
        res.status(500).send()
    }
})

// Route to get doctors by name and/or specialization
router.get('/doctors/search', async (req, res) => {
    const { name, specialization } = req.query;

    try {
        // Dynamically construct the query object
        const query = {};

        // Add filters only if they have meaningful values
        if (name && name.trim() !== '') {
            query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search for name
        }
        if (specialization && specialization.trim() !== '') {
            query.specialization = { $regex: new RegExp(specialization, 'i') }; // Case-insensitive search for specialization
        }

        // Fetch doctors based on the query
        const doctors = await Doctor.find(query);

        // Send the filtered list
        res.status(200).send({ doctors });
    } catch (e) {
        res.status(400).send({ error: 'Failed to fetch doctors', details: e.message });
    }
});




//route to get available slots for a doctor
router.get('/doctors/:doctorId/available-slots', async (req, res) => {
    const { doctorId } = req.params;

    try {
        // Fetch doctor's availability
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).send({ error: 'Doctor not found' });

        const { start_time, end_time } = doctor.availability;

        // Convert "today" to IST
        const now = new Date();
        const ISTOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
        const todayIST = new Date(now.getTime() + ISTOffset);

        // Format "today" date part for IST
        const todayDate = todayIST.toISOString().split('T')[0];

        // Convert start_time and end_time to full Date objects in IST
        const start = new Date(`${todayDate}T${start_time}:00`);
        const end = new Date(`${todayDate}T${end_time}:00`);

        // Generate all 20-minute slots
        const slots = [];
        for (let time = start; time < end; time = new Date(time.getTime() + 20 * 60000)) {
            slots.push(new Date(time));
        }

        // Fetch booked consultations for today
        const bookedConsultations = await Consultation.find({
            doctorId,
            time: { $gte: start, $lt: end }
        }).select('time');

        const bookedTimes = bookedConsultations.map(c => c.time.toISOString());

        // Filter out booked slots
        const availableSlotsUTC = slots.filter(slot => !bookedTimes.includes(slot.toISOString()));

        // Convert available slots to IST
        const availableSlotsIST = availableSlotsUTC.map(slot => {
            const istSlot = convertToIST(slot);
            return istSlot.toISOString().split('T')[1].substring(0, 5); // Format as "HH:MM"
        });

        res.status(200).send(availableSlotsIST);
    } catch (e) {
        res.status(500).send({ error: 'Failed to fetch available slots' });
    }
});

module.exports = router