const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Countries', {
    id: {
        type: DataTypes.STRING,
        //defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    continent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    capital: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    area: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    population: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  });
};
