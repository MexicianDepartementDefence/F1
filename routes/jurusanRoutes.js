const express = require("express");
const { createJurusan, listJurusan } = require("../controllers/jurusanController");
const router = express.Router();

router.post("/create", createJurusan);
router.get("/list", listJurusan);

module.exports = router;