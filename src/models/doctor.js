const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    availability: {
        start_time: String,
        end_time: String
    },
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

doctorSchema.methods.generateAuthToken = async function(){
    const doctor = this
    const token = jwt.sign({ _id: doctor._id.toString() }, process.env.JWT_SECRET)
    doctor.tokens = doctor.tokens.concat({token})
    await doctor.save()
    return token
}

doctorSchema.statics.findByCredentials = async (email, password) => {
    const doctor = await Doctor.findOne({ email })

    if (!doctor) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, doctor.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return doctor
}

doctorSchema.pre('save', async function (next) {
    const doctor = this

    if (doctor.isModified('password')) {
        doctor.password = await bcrypt.hash(doctor.password, 8)
    }

    next()
})

const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor