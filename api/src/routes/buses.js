const express = require("express");
const router = express.Router();
const { Bus } = require("../db");

/**
 * @swagger
 * components:
 *  schemas:
 *   Bus:
 *    type: object
 *    properties:
 *      plate:
 *        type: string
 *        description: Bus license plate
 *      seats:
 *        type: integer
 *        description: Number of seats in the bus
 *      modelId:
 *        type: integer
 *        description: Bus model
 *    required:
 *      - plate
 *      - seats
 *      - modelId
 *    example:
 *      plate: ABC 123
 *      seats: 100
 *      modelId: 1
 */

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses from the database
 *     tags:
 *       - Bus
 *     responses:
 *       '200':
 *         description: All buses were obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 */

// Ruta para obtener todos los colectivos
router.get("/", async (req, res) => {
	try {
		const buses = await Bus.findAll();
		res.json(buses);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener colectivos" });
	}
});

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get bus by ID
 *     tags:
 *       - Bus
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Bus identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Bus obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       '404':
 *         description: Bus not found
 */

// Ruta para obtener un colectivo por su ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const bus = await Bus.findByPk(id);
		if (!bus) {
			return res.status(404).send("Colectivo no encontrado");
		}
		res.json(bus);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener colectivo" });
	}
});

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus
 *     tags:
 *       - Bus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       '201':
 *         description: Bus created successfully
 *       '500':
 *         description: Error creating bus
 */

// Ruta para crear un nuevo colectivo
router.post("/", async (req, res) => {
	try {
		const { plate, seats, modelId } = req.body;

		const bus = await Bus.create({
			plate,
			seats,
			modelId,
		});

		res.status(201).json(bus);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al crear colectivo" });
	}
});

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus from the database
 *     tags:
 *       - Bus
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Bus identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Bus deleted successfully
 *       '404':
 *         description: Bus not found
 */

// Ruta para eliminar un colectivo por su ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedBus = await Bus.destroy({
			where: { id: id },
		});
		if (deletedBus === 0) {
			return res.status(404).json({ error: "Colectivo no encontrado" });
		}
		res.status(200).json({ message: "Colectivo eliminado correctamente" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al eliminar colectivo" });
	}
});

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update a bus
 *     tags:
 *       - Bus
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Bus identifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       '200':
 *         description: Bus updated successfully
 *       '404':
 *         description: Bus not found
 */

// Ruta para actualizar un colectivo por su ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { plate, seats, modelId } = req.body;

	try {
		const bus = await Bus.findByPk(id);

		if (!bus) {
			return res.status(404).send("Colectivo no encontrado");
		}

		await bus.update({
			plate,
			seats,
			modelId,
		});

		const updatedBus = await Bus.findOne({
			where: { plate: plate },
		});

		res.send(updatedBus);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al actualizar colectivo");
	}
});

module.exports = router;
