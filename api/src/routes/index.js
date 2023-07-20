const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const tripsRouter = require('./trips');
const usersRouter = require('./users');
const busesRouter = require('./buses');
const busmodelRouter = require('./busmodel.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/trips', tripsRouter);
router.use('/users', usersRouter);
router.use('/buses', busesRouter);
router.use('/busmodel', busmodelRouter);

module.exports = router;