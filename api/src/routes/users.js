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
 *      name:
 *        type: string
 *        description: User's name
 *      last name:
 *        type: string
 *        description: User's last name
 *      edad:
 *        type: integer
 *        description: User's age
 *    required:
 *      - name
 *      - last name
 *      - age
 *    example:
 *      name: John
 *      last name: Doe
 *      age: 33
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users from the database
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
 *         description: All users were obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// Ruta para obtener todos los usuarios
router.get("/", async (req, res, next) => {
	const { name } = req.query;
	try {
		const users = await User.findAll();
		if (name) {
			const filteredUsers = users.filter((user) =>
				user.name.toLowerCase().includes(name.toLowerCase())
			);
			if (filteredUsers.length === 0) {
				return res.status(404).send("Not found");
			}
			return res.status(201).json(filteredUsers);
		}
		res.status(201).json(users);
	} catch (error) {
		next(error);
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
 *         description: User identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 */

// Ruta para obtener un usuario por su ID
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).send("Not found");
		}
		res.status(201).json(user);
	} catch (error) {
		next(error);
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
 *         description: User created successfully
 *       '409':
 *         description: The user already exists
 *       '500':
 *         description: Error creating user
 */

// Ruta para crear un nuevo usuario
router.post("/", async (req, res, next) => {
	try {
		const { name, lastName, age } = req.body;

		const existingUser = await User.findOne({
			where: { name: { [Op.iLike]: `%${name}%` } },
		});

		if (existingUser) {
			return res.status(409).send("Something went wrong");
		}

		const newUser = await User.create({
			name,
			lastName,
			age,
		});
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
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
 *         description: User identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */

// Ruta para eliminar un usuario por su ID
router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.destroy({
			where: { id: id },
		});
		if (deletedUser === 0) {
			return res.status(404).json({ error: "Not found" });
		}
		res.status(200).json({ message: "Succesfully deleted" });
	} catch (error) {
		next(error);
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
 *         description: User identifier
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
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 */

// Ruta para actualizar un usuario por su ID
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { name, lastName, age } = req.body;

	try {
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).send("Not found");
		}

		await user.update({
			name,
			lastName,
			age,
		});

		const updatedUser = await User.findOne({
			where: { name: name },
		});

		res.send(updatedUser);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
