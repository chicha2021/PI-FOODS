const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cocinerosargentinos.com/content/recipes/500x500/milanesas-de-nalga-con-pure-de-papas.5311.jpg"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    health_score: {
      type: DataTypes.INTEGER
    },
    steps: {
     type: DataTypes.ARRAY(DataTypes.STRING(3000))
      
    },
  }, {
    timestamps: false
  });
};
