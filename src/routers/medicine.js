const express = require('express')
const router = new express.Router()

router.get('/medicinehome', async (req, res) => {
    try{
        res.status(201).send({message: "this is medicines route"})
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/medicines/:id', async (req, res)=>{
    try{
        res.status(201).send({message: "search medicine by id"})
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router