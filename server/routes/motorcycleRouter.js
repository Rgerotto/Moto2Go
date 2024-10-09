const express = require('express');
const Motorcycle = require('../Model/motorcycleModel');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({});
    console.log('Motorcycle sended to frontend', motorcycles);
    res.json(motorcycles);
  } catch (error) {
    console.error('Error to founded Motorcycles:', error);
    res.status(500).json({ error: 'Error to founded Motorcycles' });
  }
});
module.exports = router;


/* const express = require('express');
const Motorcycle = require('../Model/motorcycleModel');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({});
    console.log('Motorcycle sended to frontend', motorcycles);
    res.json(motorcycles);
  } catch (error) {
    console.error('Error to founded Motorcycles:', error);
    res.status(500).json({ error: 'Error to founded Motorcycles' });
  }
});
module.exports = router; */


