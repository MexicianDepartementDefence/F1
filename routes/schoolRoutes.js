const express = require("express");
const { createGrade, createMajor, Gradelist, MajorList, CreateStudent, StudentList } = require("../controllers/schoolController");
const Router = express.Router();

// Grade
Router.post("/create/grade", createGrade);
Router.get("/list/grade", Gradelist);

// Major
Router.post("/create/major", createMajor);
Router.get("/list/major", MajorList);

// Student
Router.post("/create/student", CreateStudent);
Router.get("/list/student", StudentList);

module.exports = Router;