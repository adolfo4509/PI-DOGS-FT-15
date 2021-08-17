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
    const filtrar = [temperaments.join("")];
    // console.log("=====>", filtrar);
    const result = filtrar.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
    result.forEach((e) => {
      Temperament.findOrCreate({
        where: { temperament: e },
        include: Dog,
      });
    });
    console.log(
      "ESTAMOS ACCEDIENDO A LA INFORMACION-------->DOS VECES",
      result
    );
    const allTemperament = await Temperament.findAll();

    res.status(200).json(allTemperament);
  } catch (error) {
    res.sendStatus(404).send("Temperamento no encontardo");
  }
});

module.exports = router;
