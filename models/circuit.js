const { DataTypes } = require("sequelize");
const sequelize = require("../config/database")


// Model Pembalap
const Circuit = sequelize.define(
  "Circuit",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    turn: {
      type: DataTypes.INTEGER,
      allowNull: false,},
    fastest_lap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    laps: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
);

// Circuit.associate = (models) => {
//   Circuit.belongsTo(models.Fixture, {
//     foreignKey: "circuit_id",
//     as: "fixture"
//   })
// }

module.exports = Circuit;
