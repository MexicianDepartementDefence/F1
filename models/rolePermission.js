// models/RolePermission.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RolePermission = sequelize.define('RolePermission', {
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Permissions',
      key: 'id',
    },
  },
});

module.exports = RolePermission;
