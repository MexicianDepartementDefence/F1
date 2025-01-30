const {DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../config/database");



const User = sequelize.define("User", {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gambar: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User;