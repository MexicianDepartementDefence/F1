const express = require("express");
const router = express.Router();
const {authenticate} = require("../middleware/authMiddleware");
const {checkRole} = require("../middleware/roleMiddleware");
const { createBarang, listBarang, detailPenjual, detailBarang, updateBarang, deleteBarang } = require("../controllers/penjualController");


router.get("/detail/penjual/:id", detailPenjual);
router.get("/detail/barang/:id", detailBarang);

router.delete("/delete/:id", deleteBarang);

// Pnejual
router.use(authenticate);
router.use(checkRole("Penjual"));
router.post("/create/barang", createBarang);
router.get("/list/barang", listBarang);
router.put("/update/:id", updateBarang);

module.exports = router;