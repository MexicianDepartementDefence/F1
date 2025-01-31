const express = require("express");
const {
  createToko,
  detailToko,
  listToko,
  updateToko,
} = require("../controllers/toko/tokoController");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");
const { createBarang, listBarang, updateBarang, destroyBarang, detailBarang } = require("../controllers/toko/barangController.");
const { createCart, cartListbyUser } = require("../controllers/toko/cartController");

// Everyone On Account

// Toko
router.post("/create/toko", authenticate, createToko);
router.get("/detail/toko/:id", authenticate, detailToko);

// Barang
router.get("/list/barang", authenticate, listBarang);
router.get("/detail/barang/:id", authenticate, detailBarang);

// Cart
router.post("/create/cart", authenticate, createCart);
router.get("/list/cart", authenticate, cartListbyUser);

// Seller
// Toko
router.put("/update/toko/:id", authenticate, checkRole("Penjual"), updateToko);

// Barang
router.post("/create/barang", authenticate, checkRole("Penjual"),createBarang);
router.put("/update/barang/:id", authenticate, checkRole("Penjual"),updateBarang);
router.delete("/delete/barang/:id", authenticate, checkRole("Penjual"), destroyBarang);

// Admin
// Toko
router.get("/list/toko", authenticate, checkRole("Admin"), listToko);

module.exports = router;
