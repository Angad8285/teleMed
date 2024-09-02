const express = require('express');
const router = express.Router();
const Telemed = require('../models/telemedModel');

router.get('/', async (req, res) => {
    //shows two options to either go to the medicine store or the consultation page
    res.json({ message: 'Telemed route, either consultation or medicine' });
});

router.get('/consultation', async (req, res) => {
    //consultation page
    //shows up a form for the user to fill up based on which the doctor will be assigned
    res.json({ message: 'Consultation route' });
});
router.post('/consultation', async (req, res) => {
    //consultation page
    //handles the form submission and assigns the doctor
});

router.get('/medicine', async (req, res) => {
    //medicine store
    //shows up the list of medicines available
    res.json({ message: "Medicine store" });
});
router.get('/medicine/:id', async (req, res) => {
    //medicine store
    //shows up the details of the medicine
    res.json({ message: "Medicine details" });
});

module.exports = router;