const { default: axios } = require("axios");
const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const { Dogs, Temperament } = require("../db.js");
const temperament = require("../models/Temperament.js");
require("dotenv").config();
const { API_KEY } = process.env;
require("dotenv").config();

const router = Router();

const getAppInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      image: e.image,
      name: e.name,
      temperament: e.temperament,
    };
  });
  return apiInfo;
};
// const getDbInfo = async () => {
//   return await temperament.findAll({
//     include: {
//       model: Temperament,
//       attributes: ["name"],
//       trougth: { attribute: [] },
//     },
//   });
// };
// const getAll = async () => {
//   const apiInfo = await getAppInfo();
//   const dbInfo = await getDbInfo();
//   const infoTotal = apiInfo.concat(dbInfo);
//   return infoTotal;
// };

/*GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
*/
router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  const dogsTotal = await getAppInfo();
  if (name) {
    let dogName = await dogsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No esta el Dog, lo sentimos");
  } else {
    res.status(200).send(dogsTotal);
  }
});

/*
[ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
*/

/*
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
*/

/*
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/
router.post("/dog", (req, res) => {
  res.send("Estoy en el Post");
});
module.exports = router;
