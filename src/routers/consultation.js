const express = require('express');
const Consultation = require('../models/consultation');
const router = new express.Router();

const convertToIST = (utcDate) => {
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    return new Date(utcDate.getTime() + ISTOffset);
}

// Combined endpoint to fetch pending consultations for a user or doctor
router.get('/consultations/pending', async (req, res) => {
    const { userId, doctorId } = req.query;

    try {
        // Validate input
        if (!userId && !doctorId) {
            return res.status(400).send({ error: 'Either userId or doctorId is required' });
        }

        const currentDate = new Date(); // Current date and time

        // Build the query based on the presence of userId or doctorId
        const query = {
            time: { $gte: currentDate } // Scheduled for today or later
        };
        if (userId) query.userId = userId;
        if (doctorId) query.doctorId = doctorId;

        // Find consultations
        const consultations = await Consultation.find(query).select('_id time');

        // Convert consultation times to IST before sending the response
        const consultationsIST = consultations.map((consultation) => ({
            id: consultation._id,
            time: convertToIST(consultation.time),
        }));

        // Respond with the filtered consultations
        res.status(200).send({ consultations: consultationsIST });
    } catch (e) {
        res.status(400).send({ error: 'Failed to fetch consultations', details: e.message });
    }
});

// get previous consultations
router.get('/consultations/previous', async (req, res) => {
    const { userId } = req.query;

    try {
        // Validate that userId is provided
        if (!userId) {
            return res.status(400).send({
                error: 'userId is required to fetch previous consultations.',
            });
        }

        // Build query to fetch consultations before the current time
        const query = {
            userId,
            time: { $lt: new Date() }, // Fetch consultations scheduled in the past
        };

        // Fetch previous consultations
        const previousConsultations = await Consultation.find(query, 'time _id')
            .sort({ time: -1 }) // Sort by time in descending order
            .exec();

        // Convert consultation times to IST
        const consultationsWithIST = previousConsultations.map((consultation) => ({
            consultationId: consultation._id,
            consultationTime: convertToIST(consultation.time),
        }));

        // Send response
        res.status(200).send({
            previousConsultations: consultationsWithIST,
        });
    } catch (error) {
        console.error('Error fetching previous consultations:', error.message);
        res.status(500).send({
            error: 'Failed to fetch previous consultations.',
            details: error.message,
        });
    }
});


// Get chat history for a consultation
router.get('/chats/:consultationId', async (req, res) => {
    try {
        const messages = await Consultation.findById(req.params.consultationId).select('messages');
        res.status(200).send(messages);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Save a message to the chat history (can also be handled via Socket.io)
router.post('/chats/:consultationId/messages', async (req, res) => {
    const { sender, content } = req.body;
    try {
        const consultation = await Consultation.findById(req.params.consultationId);
        if (!consultation) return res.status(404).send({ message: 'Consultation not found' });

        // Add the new message to the messages array
        consultation.messages.push({ sender, content });
        await consultation.save();
        res.status(201).send(consultation.messages);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;