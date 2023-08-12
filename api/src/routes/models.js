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
 *        description: nombre del modelo
 *      marca:
 *        type: string
 *        description: marca del modelo
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
 *     summary: Return all the models from the database
 *     tags:
 *       - Model
 *     responses:
 *       '200':
 *         description: All the models from the database are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Model'
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
 * @swagger
 * /api/models:
 *   post:
 *     summary: Create a new model of bus
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
 */

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

