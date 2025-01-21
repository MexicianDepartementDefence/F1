const express = require("express");
const { createGuru, listGuru, detailGuru, hapusGuru, updateGuru } = require("../controllers/siswaController");
const router = express.Router();

router.post("/create", createGuru);
router.get("/list", listGuru);
router.get("/detail/:id", detailGuru),
router.put("/update/:id", updateGuru);
router.delete("/delete/:id", hapusGuru)

module.exports = router;