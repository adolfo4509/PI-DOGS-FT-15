const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
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
  const dbInfo = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["temperament"],

    },
  });
  return dbInfo
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
   const { name } = req.query;
  const dogsTotal = await getAllInfo();

  if (name) {
    
    let dogName = await dogsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase()))
    const response = {
      data: dogName,
      message: "Lista de perros obtenida correctamente en buscador",
    };
    res.status(200).send(response); 
    }else{
    
     const response = {
      data: dogsTotal,
      message: "Lista de perros obtenida correctamente",
    };
    res.status(200).send(response);
    }
});

router.get("/searchDog", async (req, res) => {
  try {
    const { name } = req.query;

    const dogsTotal = await getAllInfo();

    // Si no viene nombre, devuelve todos
    if (!name || name.trim() === "") {
      return res.status(200).json({
        data: dogsTotal,
        message: "Lista completa de perros",
      });
    }

    // Buscar coincidencias parciales
    const dogsFound = dogsTotal.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase().trim())
    );

    if (dogsFound.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No se encontraron perros",
      });
    }

    return res.status(200).json({
      data: dogsFound,
      message: "Perros encontrados correctamente",
    });
  } catch (error) {
    console.error("Error searchDog:", error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
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
[ ] Años de vida
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
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
----------Datos formulario controlado--------------
         Nombre
         Altura 
         Peso 
         Años de vida 
*/
router.post("/crearDog", async (req, res) => {
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
    const temperamentArray = temperament
      .split(",")
      .map((t) => {
        t = t.trim();
        return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
      });

    let temperamentDb = await Temperament.findAll({
      where: {
        temperament: {
          [Op.in]: temperamentArray,
        }
      },
    });
   
    await dogsCreate.addTemperament(temperamentDb);
    const dogCompleto = await Dog.findByPk(dogsCreate.id, {
      include: [{
        model: Temperament,
         through: {
          attributes: []
        }
      }]
    });
    res.status(201).json(dogCompleto);
  } catch (error) {

    res.status(404).send("verifique los datos");
  }
});
module.exports = router;
