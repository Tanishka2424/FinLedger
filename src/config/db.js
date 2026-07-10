const mongoose = require("mongoose");

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Server connected to MongoDB");
        })
        .catch(err => {
            console.error("MongoDB Connection Error:");
            console.error(err);   // <-- IMPORTANT
            process.exit(1);
        });
}

module.exports = connectToDB;