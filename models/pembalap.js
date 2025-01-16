const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Model Pembalap
const Pembalap = sequelize.define('Pembalap', {
  nama: {
    type: DataTypes.STRING,
  },
  nomor_pembalap: {
    type: DataTypes.INTEGER
  },
  lahir: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asal_negara: {
    type: DataTypes.STRING,
    allowNull: false
  }
}
);

module.exports = Pembalap;
