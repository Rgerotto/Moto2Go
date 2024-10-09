const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI; // Call the string connection from .env


mongoose.connect(mongoURI, { // Connect to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB'); // Log when connected

    // List collections
    //check all the collection I do have ate my DB
    /* const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in the database:', collections); */
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose; // Export the module
