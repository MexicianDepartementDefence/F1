const express = require("express");
const { createSiswa, listSiswa } = require("../controllers/siswaController");
const router = express.Router();

router.post("/create", createSiswa);
router.get("/list", listSiswa);

module.exports = router;