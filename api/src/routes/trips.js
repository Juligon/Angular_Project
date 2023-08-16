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
 *        description: Lugar de salida
 *      destino:
 *        type: string
 *        description: Lugar de destino
 *      ida:
 *        type: string
 *        description: Fecha de salida
 *      vuelta:
 *        type: string
 *        description: Fecha de vuelta
 *      usuarioId:
 *        type: array
 *        description: Array de IDs de los usuarios
 *      colectivoId:
 *        type: integer
 *        description: ID del autobús
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
 *     summary: Obtener todos los viajes de la base de datos
 *     tags:
 *       - Viaje
 *     responses:
 *       '200':
 *         description: Todos los viajes fueron obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */

// Ruta para obtener todos los viajes
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
 *     summary: Obtener viaje por ID
 *     tags:
 *       - Viaje
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del viaje
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Viaje obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       '404':
 *         description: Viaje no encontrado
 */

// Ruta para obtener un viaje por su ID
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
 *     summary: Crear un nuevo viaje
 *     tags:
 *       - Viaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '201':
 *         description: Viaje creado exitosamente
 *       '500':
 *         description: Error al crear viaje
 */

// Ruta para crear un nuevo viaje
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
 *     summary: Eliminar un viaje de la base de datos
 *     tags:
 *       - Viaje
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del viaje
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Viaje eliminado exitosamente
 *       '404':
 *         description: Viaje no encontrado
 */

// Ruta para eliminar un viaje por su ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrip = await Trip.destroy({
      where: { id: id },
    });
    if (deletedTrip === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    res.status(200).json({ message: "Viaje eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar viaje" });
  }
});


/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Actualizar un viaje
 *     tags:
 *       - Viaje
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del viaje
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
 *         description: Viaje actualizado exitosamente
 *       '404':
 *         description: Viaje no encontrado
 */

// Ruta para actualizar un viaje por su ID
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
