// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Makanan = sequelize.define('Makanan', {
  nama_makanan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Makanan;