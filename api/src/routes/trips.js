const express = require("express");
const router = express.Router();
const { Trip } = require("../db"); 

/**
 * @swagger
 * components:
 *  schemas:
 *   Trip:
 *    type: object
 *    properties:
 *      origen:
 *        type: string
 *        description: lugar de salida
 *      destino:
 *        type: string
 *        description: lugar de destino
 *      ida:
 *        type: string
 *        description: fecha de salida
 *      vuelta:
 *        type: string
 *        description: fecha de vuelta
 *      usuarioId:
 *        type: array
 *        description: array de id de los usuarios
 *      colectivoId: 
 *        type: integer
 *        description: id del bus
 *    required:
 *      - origen
 *      - destino
 *      - ida
 *      - vuelta
 *    example:
 *      origen: Paraná
 *      destino: Buenos Aires
 *      ida: 07-08-2023
 *      vuelta: 15-08-2023
 *      usuarioId: [1, 2, 3, 4, 5]
 *      colectivoId: 1
 */

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Return all trips from the database
 *     tags: 
 *       - Trip
 *     responses:
 *       '200':
 *         description: All trips from the database are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */

router.get("/", async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
});

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get trip by ID
 *     tags: 
 *       - Trip
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The trip identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: One trip is returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '404':
 *         description: Trip not found
 */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).send("Viaje no encontrado");
    }
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener viaje" });
  }
});

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: 
 *       - Trip
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '201':
 *         description: New trip created 
 */

router.post("/", async (req, res) => {
  try {
    const { origen, destino, ida, vuelta, usuarioId, colectivoId } = req.body;

    const trip = await Trip.create({
      origen, destino, ida, vuelta, usuarioId, colectivoId,
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear viaje" });
  }
});

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete a trip from the database
 *     tags: 
 *       - Trip
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The trip identifier
 *         required: true
 *         schema:
 *           type: integer   
 *     responses:
 *       '200':
 *         description: Trip deleted
 *       '404':
 *         description: Trip not found
 */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrip = await Trip.destroy({
      where: { id: id },
    });
    if (deletedTrip === 0) {
      return res.status(404).send("Viaje no encontrado");
    }
    res.send("Viaje eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar viaje");
  }
});

/**
 * @swagger
 * /api/trips:
 *   put:
 *     summary: Update a trip
 *     tags: 
 *       - Trip
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '200':
 *         description: Trip updated
 *       '404':
 *         description: Trip not found
 */

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { origen, destino, ida, vuelta, usuarioId, colectivoId } = req.body;

  try {
    const trip = await Trip.findByPk(id);

    if (!trip) {
      return res.status(404).send("Viaje no encontrado");
    }

    await trip.update({
      origen, destino, ida, vuelta, usuarioId, colectivoId
    });

    const updatedTrip = await Trip.findOne({
      where: { destino: destino },
    });

    res.send(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar viaje");
  }
});

module.exports = router;
