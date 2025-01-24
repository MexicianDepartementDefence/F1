// models/jurusan.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jurusan = sequelize.define('Jurusan', {
nama_jurusan: {
  type: DataTypes.STRING,
  allowNull: false
}
});

Jurusan.associate = (db) => {
  Jurusan.hasMany(db.Siswa, {
    foreignKey: "jurusan_id",
    as: "murid"
  })
}

module.exports = Jurusan;