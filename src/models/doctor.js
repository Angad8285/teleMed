const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
                
            }
        }
    },
    specialization: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    gender: { // male/female/angad
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    availability: [{
        day: String,
        start_time: String,
        end_time: String
    }],
    consultations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation'
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor