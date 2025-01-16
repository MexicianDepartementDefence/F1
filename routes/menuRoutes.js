const express = require("express");
const { tambahMakanan, tambahMinuman, tambahMenu, listMenu } = require("../controllers/menuController");
const router = express.Router();

// Makanan
router.post("/createMakanan", tambahMakanan);

// Minuman
router.post("/createMinuman", tambahMinuman);

// Menu
router.post("/createMenu", tambahMenu);
router.get("/Menulist", listMenu);

module.exports = router;