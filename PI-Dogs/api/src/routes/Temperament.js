const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { Dogs, Temperament } = require("../db.js");
require("dotenv").config();
require("dotenv").config();
const { API_KEY } = process.env;
const router = Router();

router.get("/", (req, res) => {
  res.send("Estoy desde el Get  de Temperament");
});

module.exports = router;
