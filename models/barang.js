const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Barang = sequelize.define('Barang', {
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tokoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Tokos",
      key: "id"
    }
  },
  kondisi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  harga: {
    type: DataTypes.NUMERIC(15, 2),
    allowNull: false
  },
  minimal_pembelian: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Barang.associate = (db) => {
  Barang.belongsTo(db.Toko, {
    foreignKey: "tokoId",
    as: "market"
  });

  Barang.hasMany(db.Keranjang, {
    foreignKey: "barangId",
    as: "barang"
  })
}

module.exports = Barang;