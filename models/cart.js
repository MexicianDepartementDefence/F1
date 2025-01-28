const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model User
const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Users",
      key: "id"
    }
  },
  barangId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Penjuals",
      key: "id"
    }
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  harga_keseluruhan: {
    type: DataTypes.NUMERIC(15, 2),
    allowNull: false
  }
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

module.exports = Cart;