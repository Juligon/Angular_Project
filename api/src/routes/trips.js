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
 *     required:
 *      - origen
 *      - destino
 *      - ida
 *      - vuelta
 *     example:
 *      origen: Paraná
 *      destino: Buenos Aires
 *      ida: 07-08-2023
 *      vuelta: 15-08-2023
 *      usuarioId: [1, 2, 3, 4, 5]
 *      colectivoId: 1
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

router.get("/:id", async (req, res) => {
	const { id } = req.params;
try {
	const trips = await Trip.findAll();
	if (id) {
		const trip = await trips.filter((e) => e.id.toUpperCase().includes(id.toUpperCase())); 
		trip.length
			? res.json(trip)
			: res.status(404).send("Viaje no encontrado");
	}
} catch (error) {
	console.log(error);
}
});

router.post("/", async (req, res) => {
	try {
		const { lugarSalida, lugarDestino, fechaLlegada, fechaSalida, personaId, colectivoId } =
			req.body;
			
			const trip = await Trip.create({
				lugarSalida, lugarDestino, fechaLlegada, fechaSalida, personaId, colectivoId,
			});
		res.status(201).json(trip);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al crear viaje" });
	}
});

router.delete("/", async (req, res) => {
	const { id } = req.query;
	const trip = await Trip.findByPk(id);
	try {
		const deletedTrip = await Trip.destroy({
			where: { id: id },
		});
		res.send("done");
	} catch (error) {
		res.status(404).send(error);
	}
});

router.put("/", async (req, res) => {
	const { lugarSalida, lugarDestino, fechaLlegada, fechaSalida, personaId, colectivoId, id } =
			req.body;

	try {
		const trip = await Trip.findByPk(id);

		await trip.update({
			lugarSalida, lugarDestino, fechaLlegada, fechaSalida, personaId, colectivoId
		});

		const updatedTrip = await Trip.findOne({
			where: { lugarDestino: lugarDestino },
		});

		res.send(updatedTrip);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;
