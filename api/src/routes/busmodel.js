const express = require('express');
const router = express.Router();

const Busmodel = require('../models/Busmodel').Busmodel;

router.get('/', async (req, res) => {
  try {
    const models = await Busmodel.findAll();
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, brand } = req.body;
    const viaje = await Busmodel.create(req.body);
    res.json(viaje);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el viaje' });
  }
});


module.exports = router;