const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectMongoDB(url){
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// Call the connection function
module.exports = {
    connectMongoDB,
};
