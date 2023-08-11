const express = require("express");
const router = express.Router();
const { Model } = require("../db");

/**
 * @swagger
 * components:
 *  schemas:
 *   Model:
 *    type: object
 *     properties:
 *      nombre:
 *       type: string
 *       description: nombre del modelo
 *      marca:
 *       type: string
 *       description: marca del modelo
 *      required:
 *       - nombre
 *       - marca
 *      example:
 *       nombre: 
 *       marca: Mercedes Benz
 */

/**
 * get all models
 * @swagger
 * /api/models:
 *  get:
 *   summary: return all the models from the database
 *   tags: 
 *    - Model
 *   responses:
 *    '200':
 *     description: all the models from the database are returned
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Model'
 */

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
 * post user
 * @swagger
 * /api/models:
 *  post:
 *   summary: create a new model of bus
 *   tags: 
 *    - Model
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Model'
 *   responses:
 *    '200':
 *     description: new model created 
 */

router.post("/", async (req, res) => {
	try {
		const { nombre, marca } = req.body;
		const model = await Model.create(req.body);
		res.json(model);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al crear modelo" });
	}
});

module.exports = router;
