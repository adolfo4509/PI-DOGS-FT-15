const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { Dogs, Temperament } = require("../db.js");
require("dotenv").config();
require("dotenv").config();
const { API_KEY } = process.env;
const router = Router();
const { temperament } = require("../models/Temperament");
const axios = require("axios");
/*
[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

*/
router.get("/temperament", async (req, res) => {
  res.send("Probando el get de temperament");
});

module.exports = router;
