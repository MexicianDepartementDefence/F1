const express = require("express");
const { tambahCircuit, listSirkuit, tambahJadwal, updateCircuit, listJadwal, detailJadwal, updateJadwal, detailSirkuit } = require("../controllers/formula1/calendarController");
const { createPodium, listPodium } = require("../controllers/formula1/resultController");
const router = express.Router();

// Circuit
router.post("/tambahCircuit", tambahCircuit);
router.get("/listCircuit", listSirkuit);
router.get("/detailCircuit/:id", detailSirkuit);
router.put("/updateCircuit/:id", updateCircuit);

// Calendar
router.post("/tambahKalendar", tambahJadwal);
router.get("/listkalender", listJadwal);
router.get("/detailkalender/:id", detailJadwal);
router.put("/updatekalender/:id", updateJadwal);

// Podium Result
router.post("/tambahPodium", createPodium);
router.get("/listPodium", listPodium);

module.exports = router;