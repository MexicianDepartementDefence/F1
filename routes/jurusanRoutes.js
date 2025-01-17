const express = require("express");
const { createJurusan, listJurusan, createKelas, listKelas } = require("../controllers/jurusanController");
const router = express.Router();

// Jurusan
router.post("/create", createJurusan);
router.get("/list", listJurusan);

// Kelas
router.post("/kelas/create", createKelas);
router.get("/kelas/list", listKelas)

module.exports = router;