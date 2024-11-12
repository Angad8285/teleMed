const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect("mongodb+srv://angadworks247:password44@telemedscluster0.9apec.mongodb.net/")
        console.log('database connection successful!')
    }
    catch (error) {
        console.log(error)
    }
}
main()

//|| "mongodb://localhost:27017/"