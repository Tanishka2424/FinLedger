const mongoose = require("mongoose")





function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("Server is Connected to MongoDB")
    })
    .catch((err) =>{
        app.use(express.json()); // Parse JSON bodies        app.use(express.json()); // Parse JSON bodies        console.error("Error connecting to MongoDB:", err && err.message ? err.message : err)
        console.error(err)
        process.exit(1)
    })
}



module.exports = connectToDB