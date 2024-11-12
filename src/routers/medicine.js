const express = require("express");
const router = new express.Router();
const { MongoClient } = require("mongodb");

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://angadworks247:password44@telemedscluster0.9apec.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function findDocuments(productName) {
  try {
    // Connect to the MongoDB Atlas server
    await client.connect();
    console.log("Connected to the MongoDB Atlas database");

    ///////////debugging
        // // List all databases
        // const adminDb = client.db().admin();
        // const dbs = await adminDb.listDatabases();
        // console.log("Databases in the cluster:");
        // dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
        // // Log collections for each database
        // for (const db of dbs.databases) {
        //   const database = client.db(db.name);
        //   const collections = await database.listCollections().toArray();
        //   console.log(`Collections in the database '${db.name}':`);
        //   collections.forEach(collection => console.log(`-- ${collection.name}`));
        // }

    // Access the 'test' database and the 'medicine_halved' collection
    const database = client.db("test");
    const collection = database.collection("medicines_halved");


    const query = { product_name: { $regex: productName, $options: "i" } };
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
