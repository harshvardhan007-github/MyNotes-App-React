// Connecting with the database using mongoose

const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"

// using the async await syntax: the program will wait for every indtruction of code where await is written
const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };

module.exports = connectToMongo // exporting the connectToMongo function
