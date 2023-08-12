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


