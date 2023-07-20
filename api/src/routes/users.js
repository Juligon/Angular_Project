const express = require("express");
const router = express.Router();
const { User } = require("../db");

router.get("/", async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener los viajes" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, lastname, age } = req.body;
		console.log("Received data:", { name, lastname, age });

		const user = await User.create({
			name: name,
			lastname: lastname,
			age: age,
		});
		res.status(201).json(user);
	} catch (error) {
		console.error("Error al insertar usuario:", error);
		res.status(500).json({ error: "Error al insertar usuario" });
	}
});

module.exports = router;
