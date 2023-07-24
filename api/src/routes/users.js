const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	const { name } = req.query;
	try {
		const users = await User.findAll();
		if (name) {
			const user = await users.filter((e) =>
				e.name.toLowerCase().includes(name.toLowerCase())
			);
			user.length
				? res.json(user)
				: res.status(404).send("Usuario no encontrado");
		} else {
			res.json(users);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener usuarios" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, lastname, age } = req.body;
		console.log("Received data:", { name, lastname, age });

		const user = await User.findOne({
			where: { name: { [Op.iLike]: `%${name}%` } } //Op.iLike no distingue en mayúsculas y minúsculas
		});

		if (!user) {
			const newUser = await User.create({
				name: name,
				lastname: lastname,
				age: age,
			});
			res.status(201).json(newUser);
	} else {
		return res.status(404).send("El usuario ya existe");
	}
	} catch (error) {
		console.error("Error al insertar usuario:", error);
		res.status(500).json({ error: "Error al insertar usuario" });
	}
});

router.delete("/", async (req, res) => {
	const { id } = req.query;
	const user = await User.findByPk(id);
	try {
		const deletedUser = await User.destroy({
			where: { id: id },
		});
		res.send("done");
	} catch (error) {
		res.status(404).send(error);
	}
});

router.put("/", async (req, res) => {
	const { id, name, lastname, age } = req.body;

	try {
		const user = await User.findByPk(id);

		await user.update({
			name,
			lastname,
			age,
		});

		const updatedUser = await User.findOne({
			where: { name: name },
		});

		res.send(updatedUser);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;
