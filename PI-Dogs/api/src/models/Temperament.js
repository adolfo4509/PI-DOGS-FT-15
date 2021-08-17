const { DataTypes, UUID } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define("temperament", {
    temperament: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });
};
