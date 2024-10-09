const express = require('express');
const Motorcycle = require('../Model/motorcycleModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nameMoto, startDate, endDate } = req.body;
    console.log("reservation:", req.body)
    // Find the motorcycle by name
    const motorcycle = await Motorcycle.findOne({ name: nameMoto });
    console.log("first", motorcycle)
    if (!motorcycle) {
      return res.status(404).json({ error: 'Motorcycle not found' });
    }

    const existingReservations = motorcycle.reservation.filter(reservation => {
      const startReservation = new Date(reservation.startDate);
      const endReservation = new Date(reservation.endDate);
      const newStartReservation = new Date(startDate);
      const newEndReservation = new Date(endDate);

      return (
        (newStartReservation >= startReservation && newStartReservation <= endReservation) || 
        (newEndReservation >= startReservation && newEndReservation <= endReservation) || 
        (newStartReservation <= startReservation && newEndReservation >= endReservation) 
      );
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ error: 'Error, this motorcycle is already reserved' });
    }
    
    // Push the new reservation to the motorcycle's reservations array
    motorcycle.reservation.push({ startDate: new Date(startDate), endDate: new Date(endDate) });
    await motorcycle.save();

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Error creating new Reservation:', error);
    res.status(500).json({ error: 'Error creating new Reservation' });
  }
});

module.exports = router;
