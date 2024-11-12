const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/")
        console.log('database connection successful!')
    }
    catch (error) {
        console.log(error)
    }
}
main()