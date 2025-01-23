// models/klub.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Klub = sequelize.define('Klub', {
  nama_klub: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tahun_terbentuk: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gelar: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  daftar_pemain: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  stadion: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Klub;