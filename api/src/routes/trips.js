const express = require("express");
const router = express.Router();
const { Trip } = require("../db");

/**
 * @swagger
 * components:
 *  schemas:
 *   Trip:
 *    type: object
 *     properties:
 *      origen:
 *       type: string
 *       description: lugar de salida
 *      destino:
 *       type: string
 *       description: lugar de destino
 *      ida:
 *       type: string
 *       description: fecha de salida
 *      vuelta:
 *       type: string
 *       description: fecha de vuelta
 *      usuarioId:
 *       type: array
 *       description: array de id de los usuarios
 *      colectivoId: 
 *       type: integer
 *       description: id del bus
 *      required:
 *       - origen
 *       - destino
 *       - ida
 *       - vuelta
 *      example:
 *       origen: Paraná
 *       destino: Buenos Aires
 *       ida: 07-08-2023
 *       vuelta: 15-08-2023
 *       usuarioId: [1, 2, 3, 4, 5]
 *       colectivoId: 1
 */

/**
 * get all trips
 * @swagger
 * /api/trips:
 *  get:
 *   summary: return all trips from the database
 *   tags: 
 *    - Trip
 *   responses:
 *    '200':
 *     description: all the trips from the database are returned
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Trip'
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
 * get trip by id
 * @swagger
 * /api/trips/{id}:
 *  get:
 *   summary: get trip by id
 *   parameters:
 *    - name: id
 *      in: path
 *      description: the trip identifier
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    '200':
 *     description: one trip is returned
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Trip'
 *    '404':
 *     description: trip not found
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
 * post trip
 * @swagger
 * /api/trips:
 *  post:
 *   summary: create a new trip
 *   tags: 
 *    - Trip
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Trip'
 *   responses:
 *    '200':
 *     description: new trip created 
 */

router.post("/", async (req, res) => {
	try {
		const { origen, destino, ida, vuelta, usuarioId, colectivoId } =
			req.body;
			
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
 * delete trip
 * @swagger
 * /api/trips/{id}:
 *  delete:
 *   summary: delete a trip from the database
 *   tags: 
 *    - Trip
 *   parameters:
 *    - name: id
 *      in: path
 *      description: the trip identifier
 *      required: true
 *      schema:
 *       type: integer   
 *   responses:
 *    '200':
 *     description: trip deleted
 *    '404':
 *     description: trip not found
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
    res.send("done");
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * update trip
 * @swagger
 * /api/trips:
 *  put:
 *   summary: update a trip
 *   tags: 
 *    - User
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Trip'
 *   responses:
 *    '200':
 *     description: trip updated
 *    '404':
 *     description: trip not found
 */

router.put("/", async (req, res) => {
	const { origen, destino, ida, vuelta, usuarioId, colectivoId, id } =
			req.body;

	try {
		const trip = await Trip.findByPk(id);

		await trip.update({
			origen, destino, ida, vuelta, usuarioId, colectivoId
		});

		const updatedTrip = await Trip.findOne({
			where: { destino: destino },
		});

		res.send(updatedTrip);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;
