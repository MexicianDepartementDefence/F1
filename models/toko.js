// models/User.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Toko = sequelize.define("Toko", {
  nama_toko: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Users",
      key: "id",
    },
  },
  lokasi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Toko.associate = (db) => {
  Toko.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
  });

  Toko.hasMany(db.Barang, {
    foreignKey: "tokoId",
    as: "barang"
  })
};

module.exports = Toko;
