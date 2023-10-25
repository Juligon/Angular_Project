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
 *      origin:
 *        type: string
 *        description: Departure location
 *      destination:
 *        type: string
 *        description: Destination location
 *      departure:
 *        type: string
 *        description: Departure date
 *      regress:
 *        type: string
 *        description: Return date
 *      userId:
 *        type: array
 *        description: Array of user IDs
 *      busId:
 *        type: integer
 *        description: Bus ID
 *    required:
 *      - origin
 *      - destination
 *      - departure
 *      - regress
 *    example:
 *      origin: Paraná
 *      destination: Buenos Aires
 *      departure: 07-08-2023
 *      regress: 15-08-2023
 *      userId: [1, 2, 3, 4, 5]
 *      busId: 1
 */

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips from the database
 *     tags:
 *       - Trip
 *     responses:
 *       '200':
 *         description: All trips were obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */

// Ruta para obtener todos los viajes
router.get("/", async (req, res, next) => {
  try {
    const trips = await Trip.findAll();
    res.status(201).json(trips);
  } catch (error) {
    next(error);
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
 *         description: Trip identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Trip obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '404':
 *         description: Trip not found
 */

// Ruta para obtener un viaje por su ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).send("Not found");
    }
    res.status(201).json(trip);
  } catch (error) {
    next(error);
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
 *       '500':
 *         description: Error creating trip
 */

// Ruta para crear un nuevo viaje
router.post("/", async (req, res, next) => {
  try {
    const { origin, destination, departure, regress, userId, busId } = req.body;

    const trip = await Trip.create({
      origin, destination, departure, regress, userId, busId
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
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
 *         description: Trip identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Trip deleted successfully
 *       '404':
 *         description: Trip not found
 */

// Ruta para eliminar un viaje por su ID
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTrip = await Trip.destroy({
      where: { id: id },
    });
    if (deletedTrip === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ message: "Succesfully deleted" });
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Update a trip
 *     tags:
 *       - Trip
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Trip identifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '200':
 *         description: Trip updated successfully
 *       '404':
 *         description: Trip not found
 */

// Ruta para actualizar un viaje por su ID
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { origin, destination, departure, regress, userId, busId } = req.body;

  try {
    const trip = await Trip.findByPk(id);

    if (!trip) {
      return res.status(404).send("Not found");
    }

    await trip.update({
      origin, destination, departure, regress, userId, busId
    });

    const updatedTrip = await Trip.findOne({
      where: { destination: destination },
    });

    res.send(updatedTrip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
