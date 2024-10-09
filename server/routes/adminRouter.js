const express = require('express');
const Motorcycle = require('../Model/motorcycleModel');
const router = express.Router();

//Route to display all the motorcycle do you have on the DB
router.post('/api/motorcycles', async (req, res) => {
    const motorcycle = new Motorcycle(req.body);
    try {
        const savedMotorcycle = await motorcycle.save();
        res.status(201).json(savedMotorcycle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to add new motorcycle
router.post('/', async (req, res) => {
    const motorcycle = new Motorcycle(req.body);
    try {
        const savedMotorcycle = await motorcycle.save();
        res.status(201).json(savedMotorcycle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to remove motorcycle
router.delete('/:id', async (req, res) => {
    try {
        const deletedMotorcycle = await Motorcycle.findByIdAndDelete(req.params.id);
        if (!deletedMotorcycle) {
            return res.status(404).json({ message: 'Motorcycle not founded' });
        }
        res.json({ message: 'Motorcycle removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;