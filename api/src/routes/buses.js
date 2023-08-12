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
 *      patente:
 *        type: string
 *        description: Patente del bus
 *      asientos:
 *        type: integer
 *        description: Cantidad de asientos del bus
 *      modelo:
 *        type: integer
 *        description: Modelo del bus
 *    required:
 *      - patente
 *      - asientos
 *      - modelo
 *    example:
 *      patente: ABC 123
 *      asientos: 100
 *      modelo: 1
 */

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Obtener todos los colectivos de la base de datos
 *     tags:
 *       - Colectivo
 *     responses:
 *       '200':
 *         description: Todos los colectivos fueron obtenidos exitosamente
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
 *     summary: Obtener colectivo por ID
 *     tags:
 *       - Colectivo
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del colectivo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Colectivo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       '404':
 *         description: Colectivo no encontrado
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
 *     summary: Crear un nuevo colectivo
 *     tags:
 *       - Colectivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       '201':
 *         description: Colectivo creado exitosamente
 *       '500':
 *         description: Error al crear colectivo
 */

// Ruta para crear un nuevo colectivo
router.post("/", async (req, res) => {
	try {
		const { patente, asientos, modelo } = req.body;

		const bus = await Bus.create({
			patente,
			asientos,
			modelo,
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
 *     summary: Eliminar un colectivo de la base de datos
 *     tags:
 *       - Colectivo
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del colectivo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Colectivo eliminado exitosamente
 *       '404':
 *         description: Colectivo no encontrado
 */

// Ruta para eliminar un colectivo por su ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedBus = await Bus.destroy({
			where: { id: id },
		});
		if (deletedBus === 0) {
			return res.status(404).send("Colectivo no encontrado");
		}
		res.send("Colectivo eliminado correctamente");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al eliminar colectivo");
	}
});

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Actualizar un colectivo
 *     tags:
 *       - Colectivo
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del colectivo
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
 *         description: Colectivo actualizado exitosamente
 *       '404':
 *         description: Colectivo no encontrado
 */

// Ruta para actualizar un colectivo por su ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { patente, asientos, modelo } = req.body;

	try {
		const bus = await Bus.findByPk(id);

		if (!bus) {
			return res.status(404).send("Colectivo no encontrado");
		}

		await bus.update({
			patente,
			asientos,
			modelo,
		});

		const updatedBus = await Bus.findOne({
			where: { patente: patente },
		});

		res.send(updatedBus);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al actualizar colectivo");
	}
});

module.exports = router;
