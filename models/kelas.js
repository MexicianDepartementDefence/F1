// models/jurusan.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kelas = sequelize.define('Kelas', {
kelas: {
  type: DataTypes.STRING,
  allowNull: false
}
});

module.exports = Kelas;