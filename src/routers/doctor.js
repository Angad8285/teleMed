const express = require('express')
const router = new express.Router()

router.get('/userhome', async (req, res) => {
    //shows two options to either go to the medicine store or the consultation page
    // res.json({ message: 'Telemed route, either consultation or medicine' })
    res.status(201).send({message: "this is doctors route"})
})

module.exports = router