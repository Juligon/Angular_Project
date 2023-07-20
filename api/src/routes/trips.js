const express = require('express');
const router = express.Router();

const Trip = require('../models/Trip').Trip;

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { origin, destination, departure, regress, usersID, busID } = req.body;
    const trip = await Trip.create(req.body);
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el viaje' });
  }
});


module.exports = router;
