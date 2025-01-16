const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


// Model Pembalap
const Circuit = sequelize.define(
  "Circuit",
  {
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

module.exports = Circuit;
