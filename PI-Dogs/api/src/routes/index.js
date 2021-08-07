const express = require("express");
const dogsRoutes = require("./Dogs");
const temperamentRoutes = require("./Temperament");
const router = express.Router();

require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/Dogs", dogsRoutes);
router.use("/Temperament", temperamentRoutes);

module.exports = router;
