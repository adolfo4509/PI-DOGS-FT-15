const { Router } = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const router = Router();

const getAppInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      life_span: e.life_span,
      weight: e.weight,
      height: e.height,
      image: e.image,
      temperament: e.temperament,
    };
  });
  return apiInfo;
};
const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const getAllInfo = async () => {
  const apiInfo = await getAppInfo();
  const dbInfo = await getDbInfo();
  const totalApi = apiInfo.concat(dbInfo);
  return totalApi;
};
/*GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
 GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado

*/
router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  const dogsTotal = await getAllInfo();
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
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
*/

/*
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
----------Datos formulario controlado--------------
         Nombre
         Altura 
         Peso 
         Años de vida 
*/
router.post("/dog", (req, res) => {
  const { name, heigth, weight, life_span, temperament } = req.body;
  const dogsCreate = {
    name: name,
    heigth: heigth,
    weight: weight,
    life_span: life_span,
  };

  res.json(dogsCreate);
});
module.exports = router;
