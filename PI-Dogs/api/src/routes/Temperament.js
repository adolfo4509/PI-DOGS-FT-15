const { Router } = require("express");
const { Temperament } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
const router = Router();
const axios = require("axios");

router.get("/temperament", async (req, res) => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const temperaments = apiUrl.data.map((e) => e.temperament);
  const filterTemperament = temperaments.join();
  temperaments.forEach((e) => {
    Temperament.findOrCreate({
      where: { temperament: e },
    });
  });
  //console.log("ESTAMOS ACCEDIENDO A LA INFORMACION-------->", temperaments);
  const allTemperament = await Temperament.findAll();

  res.status(200).json(allTemperament);
});

module.exports = router;
