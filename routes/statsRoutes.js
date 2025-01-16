const express = require("express");
const { addStats, listStats, detailStats } = require("../controllers/pembalapController");
const router = express.Router();

router.post("/tambah", addStats);
router.get("/list", listStats);
router.get("/detail/:id", detailStats);

module.exports = router;



