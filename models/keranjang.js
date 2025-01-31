const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Keranjang = sequelize.define("Keranjang", {
  userId: {
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Users",
      key: "id",
    },
  },
  barangId: {
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Barangs",
      key: "id",
    },
  },
});

Keranjang.associate = (db) => {
  Keranjang.belongsTo(db.User, {
    foreignKey: "userId",
    as: "pengguna"
  });
  Keranjang.belongsTo(db.Barang, {
    foreignKey: "barangId",
    as: "barang"
  })
}

module.exports = Keranjang;
