"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const Team = require("./team");
const Pembalap = require("./pembalap");
const Fixture = require("./fixture");
const Circuit = require("./circuit");
const Driver_Stat = require("./driver_stat");
const Podium = require("./podium");
const Student = require("./student");
const Grade = require("./grade");
const Major = require("./major");
const User = require("./index2");
const UserRole = require("./userRole");
const Role = require("./role");
const Penjual = require("./penjual");
const Cart = require("./cart");
const Toko = require("./toko");
const Barang = require("./barang");
const Keranjang = require("./keranjang");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {
  Grade,
  Major,
  Student,
  Fixture,
  Circuit,
  User,
  Role,
  UserRole,
  Team,
  Pembalap,
  Driver_Stat,
  Podium,
  Penjual,
  Cart,
  Toko,
  Barang,
  Keranjang
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    console.log("Laoding File:", file);
    const modelDefinition = require(path.join(__dirname, file));
    if (typeof modelDefinition !== "function") {
      throw new Error(
        `The file "${file}" does not export a valid Sequelize model function.`
      );
    }
    const model = new modelDefinition(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
