const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activities', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    country: {
      type: DataTypes.JSON(DataTypes.ARRAY),
      allowNull: true,
      // set(value) {
      //   return this.setDataValue("country", JSON.stringify(value));
      // }
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min:1,
            max: 5,
        }
      },
    duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    season: {
        type: DataTypes.ENUM('summer', 'winter', 'autumn', 'spring'),
        allowNull: true,
      },
  });
};