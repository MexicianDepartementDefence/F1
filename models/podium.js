// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Podium = sequelize.define('Podium', {
  calendar_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: {
        tableName: 'Fixtures',
        schema: "public"
      },
      key: 'id'
    }
  },
  winner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: {
        tableName: 'Pembalaps',
        schema: 'public'
      },
      key: 'id'
    }
  },
  second: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: {
        tableName: 'Pembalaps',
        scheme: 'public'
      }
    },
    key: 'id'
  },
  third: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: {
        tableName: 'Pembalaps',
        schema: 'public'
      }
    },
    key:'id'
  }
});

module.exports = Podium;