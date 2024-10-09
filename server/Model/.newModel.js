const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this is the motorcycle module
const newMotorcycleSchema = new Schema({
    name: {type: String},
    description: {
      es:{type: String},
      en:{type: String},
      fr:{type: String}
    },
    type:{type: String},
    deposit:{type: Number},
    price:{type: Number},
    photo:[{type: String}]
  },
  {collection: 'motocycles'})//to make sure this is the collection at the DB

  const NewMotorcycle = mongoose.model('Motorbike', newMotorcycleSchema);

module.exports = NewMotorcycle;