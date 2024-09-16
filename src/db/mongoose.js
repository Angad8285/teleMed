const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database connection successful!')
    }
    catch (error) {
        console.log('Unable to connect to database.')
    }
}
main()