const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Model Pembalap
const Principal = sequelize.define('Principal', {
  nama: {
    type: DataTypes.STRING,
  },
  born: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asal_negara: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
},
{
  tableName: "Principals"
}
);

module.exports = Principal;