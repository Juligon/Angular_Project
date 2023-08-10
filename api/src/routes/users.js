const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { Op } = require("sequelize");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: nombre del usuario
 *         apellido:
 *           type: string
 *           description: apellido del usuario
 *         edad:
 *           type: integer
 *           description: edad del usuario
 *       required:
 *         - nombre
 *         - apellido
 *         - edad
 *       example:
 *         nombre: John
 *         apellido: Doe
 *         edad: 33
 */

/**
 * @swagger
 * /users:
 *  get:
 *   summary: return all users from the database
 *   tags: [User]
 *   responses:
 *    200:
 *     description: all users from the database are returned
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
	const { nombre } = req.query;
	try {
		const users = await User.findAll();
		if (nombre) {
			const user = await users.filter((e) =>
				e.nombre.toLowerCase().includes(nombre.toLowerCase())
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

/**
 * @swagger
 * /users/:id:
 *  get:
 *   summary: return a user from the database
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: the user identifier
 *   responses:
 *    200:
 *     description: one user is returned
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    404:
 *     description: user not found
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
 * /users:
 *  post:
 *   summary: create a new user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: new user created 
 */
router.post("/", async (req, res) => {
	try {
		const { nombre, apellido, edad } = req.body;
		console.log("Received data:", { nombre, apellido, edad });

		const user = await User.findOne({
			where: { nombre: { [Op.iLike]: `%${nombre}%` } }, //Op.iLike no distingue en mayúsculas y minúsculas
		});

		if (!user) {
			const newUser = await User.create({
				nombre: nombre,
				apellido: apellido,
				edad: edad,
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

/**
 * @swagger
 * /users/:id:
 *  delete:
 *   summary: delete a user from the database
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: the user identifier
 *   responses:
 *    200:
 *     description: user deleted
 *    404:
 *     description: user not found
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
    res.send("done");
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * @swagger
 * /users:
 *  put:
 *   summary: update a user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: user updated
 *    404:
 *     description: user not found
 */
router.put("/", async (req, res) => {
	const { id, nombre, apellido, edad } = req.body;

	try {
		const user = await User.findByPk(id);

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
		res.status(404).send(error);
	}
});

module.exports = router;
