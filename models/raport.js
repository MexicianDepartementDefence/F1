// models/jurusan.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Raport = sequelize.define('Raport', {
siswa_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  references: {
    model: {
      tableName: "Siswas",
      schema: "public"
    },
    key: "id"
  }
},
kelas_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  references: {
    model: {
      tableName: "Kelas",
      schema: "public"
    },
    key: "id"
  }
},
walikelas_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  references: {
    model: {
      tableName: "Gurus",
      schema: "public"
    },
    key: "id"
  }
},
detail_nilai: {
  type: DataTypes.JSONB,
  allowNull: false
}
});

module.exports = Raport;