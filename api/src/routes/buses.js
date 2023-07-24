const express = require("express");
const router = express.Router();
const { Bus } = require("../db");

router.get("/", async (req, res) => {
	try {
		const buses = await Bus.findAll();
		res.json(buses);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener colectivos" });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
try {
	const buses = await Bus.findAll();
	if (id) {
		const bus = await buses.filter((e) => e.id.toUpperCase().includes(id.toUpperCase())); 
		trip.length
			? res.json(bus)
			: res.status(404).send("Colectivo no encontrado");
	}
} catch (error) {
	console.log(error);
}
});

router.post("/", async (req, res) => {
	try {
		const { plate, seats, model } =
			req.body;
			
		const bus = await Bus.create(req.body);
		res.status(201).json(bus);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al crear colectivo" });
	}
});

router.delete("/", async (req, res) => {
	const { id } = req.query;
	const bus = await Bus.findByPk(id);
	try {
		const deletedBus = await Bus.destroy({
			where: { id: id },
		});
		res.send("done");
	} catch (error) {
		res.status(404).send(error);
	}
});

router.put("/", async (req, res) => {
	const { id, plate, seats, model } =
			req.body;

	try {
		const bus = await Bus.findByPk(id);

		await bus.update({
			plate, seats, model,
		});

		const updatedBus = await Bus.findOne({
			where: { plate: plate },
		});

		res.send(updatedBus);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;

