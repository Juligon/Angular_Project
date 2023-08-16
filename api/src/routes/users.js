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
 *        description: Nombre del usuario
 *      apellido:
 *        type: string
 *        description: Apellido del usuario
 *      edad:
 *        type: integer
 *        description: Edad del usuario
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
 *     summary: Obtener todos los usuarios de la base de datos
 *     tags:
 *       - Usuario
 *     parameters:
 *       - name: nombre
 *         in: query
 *         description: Filtrar usuarios por nombre
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Todos los usuarios fueron obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
	const { nombre } = req.query;
	try {
		const users = await User.findAll();
		if (nombre) {
			const filteredUsers = users.filter(user =>
				user.nombre.toLowerCase().includes(nombre.toLowerCase())
			);
			if (filteredUsers.length === 0) {
				return res.status(404).send("Usuario no encontrado");
			}
			return res.json(filteredUsers);
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
 *     summary: Obtener usuario por ID
 *     tags:
 *       - Usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Usuario no encontrado
 */

// Ruta para obtener un usuario por su ID
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
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente
 *       '409':
 *         description: El usuario ya existe
 *       '500':
 *         description: Error al crear usuario
 */

// Ruta para crear un nuevo usuario
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
 *     summary: Eliminar un usuario de la base de datos
 *     tags:
 *       - Usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Usuario eliminado exitosamente
 *       '404':
 *         description: Usuario no encontrado
 */

// Ruta para eliminar un usuario por su ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.destroy({
      where: { id: id },
    });
    if (deletedUser === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags:
 *       - Usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador del usuario
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
 *         description: Usuario actualizado exitosamente
 *       '404':
 *         description: Usuario no encontrado
 */

// Ruta para actualizar un usuario por su ID
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

