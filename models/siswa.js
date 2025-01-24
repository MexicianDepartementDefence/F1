// models/kelas.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Siswa = sequelize.define('Siswa', {
nama: {
  type: DataTypes.STRING,
  allowNull: false
},
tanggal_lahir: {
  type: DataTypes.STRING,
  allowNull: false
},
asal: {
  type: DataTypes.STRING,
  allowNull: false
},
alamat: {
  type: DataTypes.STRING,
  allowNull: false
},
pendidikan_terakhir: {
  type: DataTypes.STRING,
  allowNull: false
},
jurusan_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  references: {
    model: {
      tableName: "Jurusans",
      schema: "public"
    }
  }, 
  key:"id"
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
    }
  }, 
  key:"id"
}
});

Siswa.associate = (db) => {
  Siswa.belongsTo(db.Jurusan, {
    foreignKey: "jurusan_id",
    as: "jurusan"
  });

  Siswa.belongsTo(db.Kelas, {
    foreignKey: "kelas_id",
    as: "kelas"
  })
}

module.exports = Siswa;