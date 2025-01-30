// models/Role.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Role.associate = (db) => {
  Role.hasMany(db.UserRole, {
    foreignKey: "roleId",
    as: "bagian"
  })
}

module.exports = Role;
