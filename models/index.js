'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const Team = require('./team');
const Pembalap = require('./pembalap');
const Fixture = require('./fixture');
const Circuit = require('./circuit');
const Driver_Stat = require('./driver_stat');
const Podium = require('./podium');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

  // Teams To Pembalap
  Team.belongsTo(Pembalap, {
    foreignKey: "first_driver_id",
    as: "pembalapUtama",
  });

  Team.belongsTo(Pembalap, {
    foreignKey: "second_driver_id",
    as: "pembalapKedua",
  });

  Pembalap.hasMany(Team, {
    foreignKey: "first_driver_id",
    as: 'pembalapUtama'
  });

  Pembalap.hasMany(Team, {
    foreignKey: "second_driver_id",
    as: 'pembalapKedua'
  })

  // Podiums To Pembalaps And Calendar
  Podium.belongsTo(Fixture, {
    foreignKey: "calendar_id",
    as: "jadwal"
  })

  Podium.belongsTo(Pembalap, {
    foreignKey: "winner",
    as: "pemenang"
  })

  Podium.belongsTo(Pembalap, {
    foreignKey: "second",
    as: "runnerup"
  })

  Podium.belongsTo(Pembalap, {
    foreignKey: "third",
    as: "tiga"
  })

  Fixture.hasMany(Podium, {
    foreignKey: "calendar_id",
    as: "jadwal"
  })

  Pembalap.hasMany(Podium, {
    foreignKey: "winner",
    as: "pemenang"
  })

  Pembalap.hasMany(Podium, {
    foreignKey: 'second',
    as: 'runnerup'
  })

  Pembalap.hasMany(Podium, {
    foreignKey: 'third',
    as: "tiga"
  })

  // Pembalaps To Driver_Stats
  Pembalap.hasMany(Driver_Stat, {
    foreignKey: 'drivers_id',
    as: "pembalap"
  });

  Driver_Stat.belongsTo(Pembalap, {
    foreignKey: 'drivers_id',
    as: "pembalap"
  })

  // Fixture To Calendar
  Fixture.belongsTo(Circuit, {
    foreignKey: 'circuit',
    as: "sirkuit"
  })

  Circuit.hasMany(Fixture, {
    foreignKey: "circuit",
    as: 'sirkuit'
  });


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    console.log("Laoding File:", file);
    const modelDefinition = require(path.join(__dirname, file));
    if (typeof modelDefinition !== 'function') {
      throw new Error(`The file "${file}" does not export a valid Sequelize model function.`)
    }
    const model =new modelDefinition(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
