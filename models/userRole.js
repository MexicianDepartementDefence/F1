// models/UserRole.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRole = sequelize.define('UserRole', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
});

UserRole.associate = (models) => {
  UserRole.belongsTo(models.User, {
    foreignKey: 'userId',
    as: "pengguna"
  });

  UserRole.belongsTo(models.Role, {
    foreignKey: 'roleId',
    as: 'bagian'
  })
}

module.exports = UserRole;
