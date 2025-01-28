// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./index2');

const Penjual = sequelize.define('Penjual', {
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  harga: {
    type: DataTypes.NUMERIC(15, 2),
    allowNull: false
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lokasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Users",
      key: "id"
    }
  }
});

Penjual.associate = (db) => {
  Penjual.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user"
  })
}


module.exports = Penjual;