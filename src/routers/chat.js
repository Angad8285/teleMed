const express = require('express');
const Consultation = require('../models/consultation');
const router = new express.Router();

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