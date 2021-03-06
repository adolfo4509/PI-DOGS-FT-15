const { Router } = require("express");
const axios = require("axios");

require("dotenv").config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const router = Router();

const getAppInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );

  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      life_span: e.life_span,
      weight: e.weight,
      height: e.height,
      image: e.image.url,
      temperament: e.temperament,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["temperament"],
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
  clg;
};

/*GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
 GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado

*/
router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  const dogsTotal = await getAllInfo();

  if (name) {
    let dogName = await dogsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No esta el Dog, lo sentimos");
    console.log("==========>", dogName);
  } else {
    res.status(200).send(dogsTotal);
  }
});

/*
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados

[ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] A??os de vida
*/
router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dogDetail = await getAllInfo();
  if (id) {
    let dogId = await dogDetail.filter((e) => e.id == id.toString());
    dogId.length
      ? res.status(200).send(dogId)
      : res.status(404).send("No esta el Dog, lo sentimos");
  }
});
/*
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creaci??n de raza de perro por body
Crea una raza de perro en la base de datos
----------Datos formulario controlado--------------
         Nombre
         Altura 
         Peso 
         A??os de vida 
*/
router.post("/dogs", async (req, res) => {
  try {
    const { name, height, weight, life_span, temperament, image, createdInDb } =
      req.body;

    const dogsCreate = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
      createdInDb,
    });

    let temperamentDb = await Temperament.findAll({
      where: { temperament: temperament },
    });
    console.log(temperamentDb);
    dogsCreate.addTemperament(temperamentDb);

    res.send(temperamentDb);
  } catch {
    res.status(404).send("verifique los datos");
  }
});
module.exports = router;
