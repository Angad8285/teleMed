const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model("Medicine", medicineSchema);