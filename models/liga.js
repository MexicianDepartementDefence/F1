// models/liga.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Liga = sequelize.define('Liga', {
  nama_liga: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jumlah_klub: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  klub: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  juara_bertahan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  juara_terbanyak: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tahun_berdiri: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Liga;