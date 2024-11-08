const express = require('express')
const router = new express.Router()
const user = require('../models/user')

router.get('/userhome', async (req, res) => {
    try{
        res.status(201).send({message: "this is users route"})
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/users', async (req, res) => {
    try{
        res.status(201).send({ message: "Create new user" })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        res.status(201).send({message: "user login route" })
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', async (req, res)=>{
    try{
        res.status(201).send({message: "user logout route" })
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router