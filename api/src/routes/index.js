const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const tripsRouter = require("./trips");
const usersRouter = require("./users");
const busesRouter = require("./buses");
const modelsRouter = require("./models");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/trips", tripsRouter);
router.use("/users", usersRouter);
router.use("/buses", busesRouter);
router.use("/models", modelsRouter);

module.exports = router;
