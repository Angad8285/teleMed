const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        console.log(decoded.role)
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send('please authenticate')
    }
}

module.exports = userAuth