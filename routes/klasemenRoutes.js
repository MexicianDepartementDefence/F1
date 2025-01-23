const express = require("express");
const { createClub, listClub, detailClub, updatePlayer, updateClub, createLiga, listLiga, detailLiga, updateLiga, updateClubLeague } = require("../controllers/klasemenController");
const router =  express.Router();

// Klub
router.post("/createClub", createClub);
router.get("/listClub", listClub);
router.get("/detail/:id", detailClub);
router.put("/updatePemain/:id", updatePlayer);
router.put("/update/:id", updateClub);

// Liga
router.post("/createLeague", createLiga);
router.get("/listLeague", listLiga);
router.get("/detailLeague/:id", detailLiga);
router.put("/updateLeague/:id", updateLiga);
router.put("/updateLeagueClub/:id", updateClubLeague);


module.exports = router