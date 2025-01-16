const express = require("express");
const router = express.Router();

// Liga
router.post("/tambahliga");
router.get("/listliga");
router.get("/detailLiga/:id");
router.put("/updateLiga/:id");

// Klub
router.post("/tambahklub");
router.get("/listklub");
router.get("/detailKlub/:id");


module.exports = router;