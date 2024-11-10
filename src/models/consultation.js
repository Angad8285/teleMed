const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    speciality: String,
    time: Date, // Scheduled time
    messages: [{
        sender: String, // "user" or "doctor"
        content: String,
        timestamp: Date
    }]
}, {
    timestamps: true
})

const Consultation = mongoose.model('Consultation', consultationSchema)
module.exports = Consultation
