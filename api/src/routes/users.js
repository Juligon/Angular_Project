const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { Op } = require("sequelize");

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      nombre:
 *        type: string
 *        description: nombre del usuario
 *      apellido:
 *        type: string
 *        description: apellido del usuario
 *      edad:
 *        type: integer
 *        description: edad del usuario
 *    required:
 *      - nombre
 *      - apellido
 *      - edad
 *    example:
 *      nombre: John
 *      apellido: Doe
 *      edad: 33
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Return all users from the database
 *     tags:
 *       - User
 *     parameters:
 *       - name: nombre
 *         in: query
 *         description: Filter users by name
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: All users from the database are returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/", async (req, res) => {
	const { nombre } = req.query;
	try {
		const users = await User.findAll();
		if (nombre) {
			const filteredUsers = users.filter(user =>
				user.nombre.toLowerCase().includes(nombre.toLowerCase())
			);
			return filteredUsers.length
				? res.json(filteredUsers)
				: res.status(404).send("Usuario no encontrado");
		}
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener usuarios" });
	}
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: One user is returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 */

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).send("Usuario no encontrado");
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error al obtener usuario" });
	}
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: New user created
 *       '409':
 *         description: User already exists
 */

router.post("/", async (req, res) => {
	try {
		const { nombre, apellido, edad } = req.body;

		const existingUser = await User.findOne({
			where: { nombre: { [Op.iLike]: `%${nombre}%` } }
		});

		if (existingUser) {
			return res.status(409).send("El usuario ya existe");
		}

		const newUser = await User.create({
			nombre: nombre,
			apellido: apellido,
			edad: edad,
		});
		res.status(201).json(newUser);
	} catch (error) {
		console.error("Error al insertar usuario:", error);
		res.status(500).json({ error: "Error al insertar usuario" });
	}
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user from the database
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted
 *       '404':
 *         description: User not found
 */

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.destroy({
			where: { id: id },
		});
		if (deletedUser === 0) {
			return res.status(404).send("Usuario no encontrado");
		}
		res.send("Usuario eliminado correctamente");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al eliminar usuario");
	}
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user identifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated
 *       '404':
 *         description: User not found
 */

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { nombre, apellido, edad } = req.body;

	try {
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).send("Usuario no encontrado");
		}

		await user.update({
			nombre,
			apellido,
			edad,
		});

		const updatedUser = await User.findOne({
			where: { nombre: nombre },
		});

		res.send(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al actualizar usuario");
	}
});

module.exports = router;
