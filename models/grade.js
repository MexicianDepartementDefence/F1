// models/RolePermission.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Grade = sequelize.define('Grade', {
  grade_number: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

Grade.associate = (db) => {
  Grade.hasMany(db.Student, {
    foreignKey: 'grade_id',
    as: "murid"
  })
}

module.exports = Grade;