// models/major.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Major = sequelize.define('Major', {
  major_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Major.associate = (db) => {
  Major.hasMany(db.Student, {
    foreignKey: "major_id",
    as: 'murid'
  })
}

module.exports = Major;