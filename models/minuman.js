// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Minuman = sequelize.define('Minuman', {
  nama_minuman: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Minuman;