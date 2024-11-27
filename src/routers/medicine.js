const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");

// Function to find documents in the database
async function findDocuments(productName) {
  try {
    // Access the 'test' database and the 'sample_data' collection
    const database = mongoose.connection.useDb("test");
    const collection = database.collection("sample_data");

    // Query for documents matching the product name
    const query = { product_name: { $regex: productName, $options: "i" } };
    const documents = await collection.find(query).toArray();

    return documents; // Return the array of documents
  } catch (err) {
    console.error("Error:", err);
    return []; // Return an empty array if there's an error
  }
}

// Route for searching documents
router.get("/medicine/search", async (req, res) => {
  console.log(req.query);
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
