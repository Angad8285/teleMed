const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function findDocuments(productName) {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to the database');

        // Access the 'testDatabase' database and the 'sample_data' collection
        const database = client.db('testDatabase');
        const collection = database.collection('sample_data');

        // Find documents with the specific product name
        const query = { product_name: productName };
        const documents = await collection.find(query).toArray();

        console.log('Documents found:', documents);
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Replace 'Sample Product' with user input or dynamic data
const userInputProductName = 'Alphagan Z Ophthalmic Solution';
findDocuments(userInputProductName);


password44

mongodb+srv://angadworks247:password44@telemedscluster0.9apec.mongodb.net/?retryWrites=true&w=majority&appName=teleMedsCluster0

mongodb+srv://angadworks247:password44@telemedscluster0.9apec.mongodb.net/test

mongoimport -- uri mongodb+srv://angadworks247:password44@telemedscluster0.9apec.mongodb.net/test --collection medicines_halved --file /Users/angad/Desktop/dev/webdev/telemed/csvTOjson/medicines.json --jsonArray

mongodb+srv://angadworks247:password44@telemedscluster0.9apec.mongodb.net/?retryWrites=true&w=majority&appName=teleMedsCluster0
mongodb+srv://<db_username>:<db_password>@telemedscluster0.9apec.mongodb.net/?retryWrites=true&w=majority&appName=teleMedsCluster0