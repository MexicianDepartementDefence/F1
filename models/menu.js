// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Menu = sequelize.define('Menu', {
  makanan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: {
        tableName: 'Makanans',
        schema: "public"
      },
      key: "id",
    }
  },
  minuman_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: 'CASCADE',
    references: {
      model: {
        tableName: 'Minumans',
        schema: 'public'
      },
      key: 'id'
    }
  }
});

module.exports = Menu;