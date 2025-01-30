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

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

User.associate = (db) => {
  User.hasMany(db.UserRole, {
    foreignKey: "userId",
    as: "user"
  })
}

module.exports = User;
