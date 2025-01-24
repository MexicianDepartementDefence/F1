// models/jurusan.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kelas = sequelize.define('Kelas', {
kelas: {
  type: DataTypes.STRING,
  allowNull: false
}
});

Kelas.associate = (db) => {
  Kelas.hasMany(db.Siswa, {
    foreignKey: "kelas_id",
    as: "murid"
  })
}

module.exports = Kelas;