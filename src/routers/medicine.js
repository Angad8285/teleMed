const express = require('express')
const router = new express.Router()

router.get('/medicinehome', async (req, res) => {
    //shows two options to either go to the medicine store or the consultation page
    // res.json({ message: 'Telemed route, either consultation or medicine' })
    res.status(201).send({message: "this is medicines route"})
})

module.exports = router