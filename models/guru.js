// models/kelas.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Guru = sequelize.define('Guru', {
nama: {
  type: DataTypes.STRING,
  allowNull: false
},

pendidikan_terakhir: {
  type: DataTypes.STRING,
  allowNull: false
},

tanggal_lahir: {
  type: DataTypes.STRING,
  allowNull: false
},
mapel: {
  type: DataTypes.STRING,
  allowNull: false
},
});

module.exports = Guru
