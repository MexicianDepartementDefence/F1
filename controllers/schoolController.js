
const Grade = require("../models/grade");
const Major = require("../models/major");
const Student = require("../models/student");
const db = require('../models');
const { Model } = require("sequelize");

// 
async function createGrade(req, res) {
  try {
    const { grade_number } = req.body;

    const tambah = await Grade.create({
      grade_number,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create a grade is success",
      data: tambah
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to create grade",
      error: error.message,
    });
  }
}

// Grade

async function Gradelist (req, res) {
  try {
    const list = await Grade.findAndCountAll({
      offset: 0,
      limit:10,
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show the list success",
      data: list
    })
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show the list",
      error: error.message
    })
  }
}

async function createMajor (req, res) {
try {
    const {major_name} = req.body;

    const tambah = await Major.create({
        major_name
    });

    return res.status(201).json({
        status: "success",
        code: 201,
        msg: "create a major is success",
        data: tambah
    })
} catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
        status: "success",
        code: 500,
        msg: "failed to create a major",
        error: error.message
    })
}
}

async function MajorList(req, res) {
  try {
    const list = await Major.findAndCountAll({
      offset: 0,
      limit: 10
    })

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show a list success",
      data: list
    })
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show a list",
      error: error.message
    })
  }
}

// Student

async function CreateStudent (req, res) {
  try {
    const {student_name, origin, grade_id, major_id, address} = req.body;

    const tambah = await Student.create({
      student_name,
      origin,
      grade_id,
      major_id,
      address
    });

    return res.status(201).json({
      status: "success",
      code:201,
      msg: "create a student success",
      data: tambah
    })
  } catch (error) {
    console.error(error.error || error);
    return res.status(500),json({
      status: "failed",
      cdoe: 500,
      msg: "failed to create a student",
      error: error.message
    })
  }
}

async function StudentList (req, res) {
  try {
    const list = await Student.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: Grade,
          as: "kelas"
        },
        {
          model: Major,
          as: "jurusan"
        }
      ]
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show a student list success",
      data: list
    })
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: 'failed',
      code: 500,
      msg: "failed to show a student list",
      error: error.message
    })
  }
}

module.exports = {
  createGrade,
  Gradelist,
  createMajor,
  MajorList,
  CreateStudent,
  StudentList
};
