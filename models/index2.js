const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  }
}, {
  tableName: "Users",
  freezeTableName: true
});

User.associate = (db) => {
  User.hasMany(db.Penjual, {
    foreignKey: "userId",
    as: "penjual"
  });

  User.hasMany(db.Cart, {
    foreignKey: "userId",
    as: "pengguna"
  });

  User.hasMany(db.Toko, {
    foreignKey: "userId",
    as: "toko"
  })

  User.hasMany(db.Keranjang, {
    foreignKey: "userId",
    as: "cart"
  });
}

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

module.exports = User;
