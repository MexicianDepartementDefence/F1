const express = require("express");
const {
  register,
  login,
  listUser,
  detailUser,
  update,
  hapus,
  updateImage,
  createRole,
  listRole,
  createUserrole,
  listUserRole,
} = require("../controllers/authController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {authenticate} = require("../middleware/authMiddleware")

// router

router.post("/register", register);
router.post("/login", login);

// Role
router.post("/createRole", createRole);
router.get("/listRole", listRole);

//User Role
router.use(authenticate);
router.post("/create/userRole", createUserrole);
router.get("/list/userRole", listUserRole);



router.get("/list", listUser);
router.get("/detail/:id", detailUser);
router.put("/update/:id", update);
router.delete("/delete/:id", hapus);
router.put("/update/picture/:id", updateImage);

module.exports = router;
