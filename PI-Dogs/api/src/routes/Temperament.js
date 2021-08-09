const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { Dog, Temperament } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
const router = Router();
const axios = require("axios");

const getAppInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      temperament: e.temperament,
    };
  });
  return apiInfo;
};
/*
[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

*/
router.get("/temperament", async (req, res) => {
  const temperamentAll = await getAppInfo();
  const temperamentSave = await temperamentAll.map((e) => e.temperament);
  const filteredDogs = [];
  const eliminaDuplicados = (temperamentSave) => {
    temperamentSave.forEach((dog) => {
      const foundDog = filteredDogs.find(
        (filteredWord) => filteredWord === dog
      );
      if (!foundDog) {
        filteredDogs.push(dog);
      }
    });
  };
  eliminaDuplicados(temperamentSave);
  console.log("LISTADO DE TEMPERAMENTOS", filteredDogs);
  res.status(200).json(filteredDogs);
});

module.exports = router;
