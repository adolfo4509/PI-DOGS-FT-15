const { Router } = require("express");
const { Temperament, Dog } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
const router = Router();
const axios = require("axios");

router.get("/temperament", async (req, res) => {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const temperaments = apiUrl.data.map((e) => e.temperament);
    let flitrados = temperaments.map(
      (e) => e && e.split(",").map((e) => e.trim())
    );
    let temp = [];
    flitrados.map((e) => {
      if (e) {
        temp = [...temp, ...e];
      }
    });

    temp = [...new Set(temp)].sort();

    temp.map((e) => {
      Temperament.findOrCreate({
        where: { temperament: e },
      });
    });

    const allTemperament = await Temperament.findAll();

    res.status(200).send(allTemperament);
  } catch (error) {
    res.sendStatus(404).send("Temperamento no encontrado");
  }
});

module.exports = router;
