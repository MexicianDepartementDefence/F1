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

UserRole.associate = (db) => {
  UserRole.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user"
  });
  UserRole.belongsTo(db.Role, {
    foreignKey: "roleId",
    as: "role"
  })
}

module.exports = UserRole;
