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
 *      nombre:
 *        type: string
 *        description: Nombre del modelo
 *      marca:
 *        type: string
 *        description: Marca del modelo
 *    required:
 *      - nombre
 *      - marca
 *    example:
 *      nombre: CHASIS O 500 UA
 *      marca: Mercedes Benz
 */

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Obtener todos los modelos de la base de datos
 *     tags:
 *       - Modelo
 *     responses:
 *       '200':
 *         description: Todos los modelos de la base de datos son obtenidos exitosamente
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
 *     summary: Obtener modelo por ID
 *     tags:
 *       - Modelo
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del modelo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Modelo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Model'
 *       '404':
 *         description: Modelo no encontrado
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
 *     summary: Crear un nuevo modelo de colectivo
 *     tags:
 *       - Modelo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Model'
 *     responses:
 *       '201':
 *         description: Nuevo modelo creado
 *       '500':
 *         description: Error al crear modelo
 */

// Ruta para crear un nuevo modelo
router.post("/", async (req, res) => {
  try {
    const { nombre, marca } = req.body;

    const model = await Model.create({
      nombre, marca,
    });

    res.status(201).json(model);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear modelo" });
  }
});

module.exports = router;


