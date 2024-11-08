const express = require('express')
const router = new express.Router()
const user = require('../models/user')

router.get('/userhome', async (req, res) => {
    res.status(201).send({message: "this is users route"})
})

router.post('/users', async (req, res) => {
    res.status(201).send({ message: "Created new user" })
})



module.exports = router