const express = require('express')
const router = new express.Router()
const doctor = require('../models/doctor')

router.get('/doctorhome', async (req, res) => {
    try{
        res.status(201).send({message: "this is doctors route"})
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/doctors', async (req, res) => {
    try{
        res.status(201).send({ message: "Create new doctor" })
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

module.exports = router