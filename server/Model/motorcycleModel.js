const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this is the reservation module
const reservationSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});


//this is the motorcycle module
const motorcycleSchema = new Schema({
  name: {type: String},
  description: {
    es:{type: String},
    en:{type: String},
    fr:{type: String}
  },
  type:{type: String},
  deposit:{type: Number},
  price:{type: Number},
  photo:{
    1:{type: String},
    2:{type: String}
  },
  reservation: [reservationSchema]
},
{collection: 'motocycles'})//to make sure this is the collection at the DB




//Create the model
const Motorcycle = mongoose.model('Motorcycle', motorcycleSchema);

module.exports = Motorcycle;

