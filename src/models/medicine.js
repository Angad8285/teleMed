const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    brand:{
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Medicine = mongoose.model('Medicine', medicineSchema)
module.exports = Medicine;