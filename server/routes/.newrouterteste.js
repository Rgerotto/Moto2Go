const express = require('express');
const NewMotorcycle = require('../Model/.newModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const motorcycles = await NewMotorcycle.find({});
      console.log('Motorcycles found:', motorcycles); // This should log motorcycles from the 'motorcycles' collection
      res.json(motorcycles);
    } catch (error) {
      console.error('Error fetching motorcycles:', error);
      res.status(500).json({ error: 'Error fetching motorcycles' });
    }
});

module.exports = router;