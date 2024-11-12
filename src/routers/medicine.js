const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Medicine = require("../models/medicine");


const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function findDocuments(productName) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to the database");

    // Access the 'testDatabase' database and the 'sample_data' collection
    const database = client.db("testDatabase");
    const collection = database.collection("sample_data");

    // Find documents with the specific product name
    const query = { product_name: productName };
    const documents = await collection.find(query).toArray();

    return documents; // Return the array of documents
  } catch (err) {
    console.error("Error:", err);
    return []; // Return an empty array if there's an error
  } finally {
    // Close the connection
    await client.close();
  }
}

// Route for the home page
router.get("/medicinehome", async (req, res) => {
  try {
    res.status(201).send({ message: "This is the medicines route" });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route for searching documents
router.get("/medicine/search", async (req, res) => {
    console.log(req.query)
  const { product_name } = req.query;

  if (!product_name) {
    return res.status(400).send({ error: "Product name is required" });
  }

  try {
    const results = await findDocuments(product_name);
    
    if (results.length === 0) {
      return res.status(404).send({ message: "No documents found" });
    }

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: `There was an error: ${error.message}` });
  }
});

module.exports = router;
