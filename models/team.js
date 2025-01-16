const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pembalap = require("./pembalap");

// Model Pembalap
const Team = sequelize.define(
  "Team",
  {
    nama: {
      type: DataTypes.STRING,
    },
    first_driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: {
          tableName: "Pembalaps",
          schema: "public",
        },
        key: "id",
      },
    },
    second_driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: {
          tableName: "Pembalaps",
          schema: "public",
        },
        key: "id",
      },
    },
    team_principal: {
    type: DataTypes.STRING,
    allowNull: false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  
);

module.exports = Team;
