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
 *        description: patente del bus
 *      asientos:
 *        type: integer
 *        description: cantidad de asientos del bus
 *      modelo:
 *        type: integer
 *        description: modelo del bus
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
 *     summary: Return all the buses from the database
 *     tags:
 *       - Bus
 *     responses:
 *       '200':
 *         description: All the buses from the database are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 */

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
 *         description: The bus identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: One bus is returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       '404':
 *         description: Bus not found
 */

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
 *         description: New bus created
 */

router.post("/", async (req, res) => {
  try {
    const { patente, asientos, modelo } = req.body;

    const bus = await Bus.create({
      patente, asientos, modelo,
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
 *         description: The bus identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Bus deleted
 *       '404':
 *         description: Bus not found
 */

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
 * /api/buses:
 *   put:
 *     summary: Update a bus
 *     tags:
 *       - Bus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       '200':
 *         description: Bus updated
 *       '404':
 *         description: Bus not found
 */

router.put("/:id", async (req, res) => {
  const { id, patente, asientos, modelo } = req.body;

  try {
    const bus = await Bus.findByPk(id);

    if (!bus) {
      return res.status(404).send("Colectivo no encontrado");
    }

    await bus.update({
      patente, asientos, modelo,
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
