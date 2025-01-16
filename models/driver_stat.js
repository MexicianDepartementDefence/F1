// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Driver_Stat = sequelize.define('Driver_stat', {
  drivers_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: {
        tableName: 'Pembalaps',
        schema: 'public'
      },
      key: "id"
    }
  },
  appearance: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  race_win: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  race_podium : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  world_champion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pole_position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fastest_lap: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  retire: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Driver_Stat;