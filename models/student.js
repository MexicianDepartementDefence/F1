// models/student.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Grade = require('./grade');

const Student = sequelize.define('Student', {
  student_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  grade_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Grades",
      key: "id"
    }
  },
  major_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: "Majors",
      key: "id"
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Student.associate = (db) => {
  Student.belongsTo(db.Grade, {
    foreignKey: "grade_id",
    as: "kelas"
  });
  Student.belongsTo(db.Major, {
    foreignKey: "major_id",
    as: "jurusan"
  })
}

module.exports = Student;