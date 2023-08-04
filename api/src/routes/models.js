const express = require("express");
const router = express.Router();
const { Model } = require("../db");

router.get("/", async (req, res) => {
	try {
		const models = await Model.findAll();
		res.json(models);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener modelos" });
	}
});

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
