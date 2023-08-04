const express = require("express");
const router = express.Router();
const { Person } = require("../db");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	const { nombre } = req.query;
	try {
		const persons = await Person.findAll();
		if (nombre) {
			const person = await persons.filter((e) =>
				e.nombre.toLowerCase().includes(nombre.toLowerCase())
			);
			person.length
				? res.json(person)
				: res.status(404).send("Usuario no encontrado");
		} else {
			res.json(persons);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener usuarios" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { nombre, apellido, edad } = req.body;
		console.log("Received data:", { nombre, apellido, edad });

		const person = await Person.findOne({
			where: { nombre: { [Op.iLike]: `%${nombre}%` } } //Op.iLike no distingue en mayúsculas y minúsculas
		});

		if (!person) {
			const newPerson = await Person.create({
				nombre: nombre,
				apellido: apellido,
				edad: edad,
			});
			res.status(201).json(newPerson);
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
	const person = await Person.findByPk(id);
	try {
		const deletedPerson = await Person.destroy({
			where: { id: id },
		});
		res.send("done");
	} catch (error) {
		res.status(404).send(error);
	}
});

router.put("/", async (req, res) => {
	const { id, nombre, apellido, edad } = req.body;

	try {
		const person = await Person.findByPk(id);

		await person.update({
			nombre, apellido, edad
		});

		const updatedPerson = await Person.findOne({
			where: { nombre: nombre },
		});

		res.send(updatedPerson);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;
