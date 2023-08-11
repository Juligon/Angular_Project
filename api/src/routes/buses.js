const express = require("express");
const router = express.Router();
const { Bus } = require("../db");

/**
 * @swagger
 * components:
 *  schemas:
 *   Bus:
 *    type: object
 *     properties:
 *      patente:
 *       type: string
 *       description: patente del bus
 *      asientos:
 *       type: integer
 *       description: cantidad de asientos del bus
 *      modelo:
 *       type: integer
 *       description: modelo del bus
 *      required:
 *       - patente
 *       - asientos
 *       - modelo
 *      example:
 *       patente: ABC 123
 *       asientos: 100
 *       modelo: 1
 */

/**
 * get all the buses
 * @swagger
 * /api/buses:
 *  get:
 *   summary: return all the buses from the database
 *   tags: 
 *    - Bus
 *   responses:
 *    '200':
 *     description: all the buses from the database are returned
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Bus'
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
 * get bus by id
 * @swagger
 * /api/buses/{id}:
 *  get:
 *   summary: get bus by id
 *   parameters:
 *    - name: id
 *      in: path
 *      description: the bus identifier
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    '200':
 *     description: one bus is returned
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Bus'
 *    '404':
 *     description: bus not found
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
 * post bus
 * @swagger
 * /api/buses:
 *  post:
 *   summary: create a new bus
 *   tags: 
 *   - Bus
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Bus'
 *   responses:
 *    '200':
 *     description: new bus created 
 */

router.post("/", async (req, res) => {
	try {
		const { patente, asientos, modelo } =
			req.body;
			
		const bus = await Bus.create(req.body);
		res.status(201).json(bus);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al crear colectivo" });
	}
});

/**
 * delete bus
 * @swagger
 * /api/buses/{id}:
 *  delete:
 *   summary: delete a bus from the database
 *   tags: 
 *    - Bus
 *   parameters:
 *    - name: id
 *      in: path
 *      description: the bus identifier
 *      required: true
 *      schema:
 *       type: integer   
 *   responses:
 *    '200':
 *     description: bus deleted
 *    '404':
 *     description: bus not found
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
    res.send("done");
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * update bus
 * @swagger
 * /api/buses:
 *  put:
 *   summary: update a bus
 *   tags: 
 *    - Bus
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Bus'
 *   responses:
 *    '200':
 *     description: bus updated
 *    '404':
 *     description: bus not found
 */

router.put("/", async (req, res) => {
	const { id, patente, asientos, modelo } =
			req.body;

	try {
		const bus = await Bus.findByPk(id);

		await bus.update({
			patente, asientos, modelo,
		});

		const updatedBus = await Bus.findOne({
			where: { patente: patente },
		});

		res.send(updatedBus);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;

