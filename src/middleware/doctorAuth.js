const jwt = require('jsonwebtoken')
const Doctor = require('../models/doctor')

const doctorAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const doctor = await Doctor.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!doctor) {
            throw new Error()
        }

        console.log(decoded.role)
        req.token = token
        req.doctor = doctor
        next()
    } catch (e) {
        res.status(401).send('please authenticate')
    }
}

module.exports = doctorAuth