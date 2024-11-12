const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const medicineSchema = new mongoose.Schema({
    _id: {
      $oid: String
    },
    sub_category: {
      type: String,
      required: true
    },
    product_name: {
      type: String,
      required: true
    },
    salt_composition: {
      type: String,
      required: true
    },
    product_price: {
      type: String,
      required: true
    },
    product_manufactured: {
      type: String,
      required: true
    },
    medicine_desc: {
      type: String,
      required: true
    },
    side_effects: {
      type: String,
      required: true
    },
    drug_interactions: {
      type: Object,
      required: true,
      properties: {
        drug: {
          type: Array,
          default: []
        },
        brand: {
          type: Array,
          default: []
        },
        effect: {
          type: Array,
          default: []
        }
      }
    }
  });


const Medicine = mongoose.model('Medicine', medicineSchema)
module.exports = Medicine;