const express = require('express');
const router = express.Router();

const Bus = require('../models/Bus').Bus;

router.get('/', async (req, res) => {
  try {
    const buses = await Bus.findAll();
    res.json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { plate, seats, model } = req.body;
    const viaje = await Bus.create(req.body);
    res.json(viaje);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el viaje' });
  }
});


module.exports = router;