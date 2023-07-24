const express = require("express");
const router = express.Router();
const { Trip } = require("../db");

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
		const { origin, destination, departure, regress, userId, busId } =
			req.body;
			
			const trip = await Trip.create({
				origin,
				destination,
				departure,
				regress,
				userId,
				busId,
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
	const { origin, destination, departure, regress, userId, busId, id } =
			req.body;

	try {
		const trip = await Trip.findByPk(id);

		await trip.update({
			origin, destination, departure, regress, userId, busId
		});

		const updatedTrip = await Trip.findOne({
			where: { destination: destination },
		});

		res.send(updatedTrip);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;
