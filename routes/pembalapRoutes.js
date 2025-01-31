const express = require("express");
const { tambahPembalap, listPembalap, tambahTeam, listTeam, detailPembalap, updatePembalap, detailTeam, updateTeam } = require("../controllers/formula1/pembalapController");
const router = express.Router();

// Drivers
router.post("/tambah", tambahPembalap);
router.get("/list", listPembalap);
router.get("/detail/:id", detailPembalap);
router.put("/update/:id", updatePembalap);

// Team
router.post("/tambahteam", tambahTeam);
router.get("/listTeam", listTeam);
router.get("/detail/team/:id", detailTeam);
router.put("/updateTeam/:id", updateTeam);

module.exports = router;