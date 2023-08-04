const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const tripsRouter = require("./trips");
const personsRouter = require("./persons");
const busesRouter = require("./buses");
const busmodelRouter = require("./models");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/trips", tripsRouter);
router.use("/persons", personsRouter);
router.use("/buses", busesRouter);
router.use("/models", busmodelRouter);

module.exports = router;
