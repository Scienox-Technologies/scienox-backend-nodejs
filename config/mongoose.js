const mongoose = require("mongoose")


exports.connect = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }

    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URI, connectionParams)
        console.log("database connected successfully")
    } catch (error) {
        console.log("database connection failed. exiting now...")
        console.error(error)
        process.exit(1)
    }
}
