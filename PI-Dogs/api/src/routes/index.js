const Dogs_ = require("./Dogs");
const Temperament_ = require("./Temperament");

const { Router } = require("express");

require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/Dogs", Dogs_);
router.use("/Temperament", Temperament_);

module.exports = router;
