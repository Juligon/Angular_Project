const express = require("express");
const router = express.Router();
const { Model } = require("../db");

/**
 * @swagger
 * components:
 *  schemas:
 *   Model:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: Model name
 *      brand:
 *        type: string
 *        description: Model brand
 *    required:
 *      - name
 *      - brand
 *    example:
 *      name: CHASIS O 500 UA
 *      brand: Mercedes Benz
 */

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Get all models from the database
 *     tags:
 *       - Model
 *     responses:
 *       '200':
 *         description: All models from the database were obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Model'
 */

// Ruta para obtener todos los modelos
router.get("/", async (req, res) => {
	try {
		const models = await Model.findAll();
		res.json(models);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener modelos" });
	}
});

/**
 * @swagger
 * /api/models/{id}:
 *   get:
 *     summary: Get model by ID
 *     tags:
 *       - Model
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Model identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Model obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Model'
 *       '404':
 *         description: Model not found
 */

// Ruta para obtener un modelo por su ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const model = await Model.findByPk(id);
		if (!model) {
			return res.status(404).send("Modelo no encontrado");
		}
		res.json(model);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener modelo" });
	}
});

/**
 * @swagger
 * /api/models:
 *   post:
 *     summary: Create a new bus model
 *     tags:
 *       - Model
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Model'
 *     responses:
 *       '201':
 *         description: New model created
 *       '500':
 *         description: Error creating model
 */

// Ruta para crear un nuevo modelo
router.post("/", async (req, res) => {
	try {
		const { name, brand } = req.body;

		const model = await Model.create({
			name,
			brand,
		});

		res.status(201).json(model);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al crear modelo" });
	}
});

module.exports = router;
