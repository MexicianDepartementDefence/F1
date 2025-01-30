const express = require("express");
const {
  register,
  login,
  listUser,
  detailUser,
  update,
  hapus,
  updateImage,
  // createRole,
  // listRole,
  // createUserRole,
  // listUserRole,
} = require("../controllers/authController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {authenticate} = require("../middleware/authMiddleware");

// upload file

const diskStorage = multer.diskStorage({
  // konfigurasi folder penyimpanan file
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },

  //konfigurasi penamaan file
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

// router

router.post("/register", register);
router.post("/login", login);

// need permission
router.use(authenticate);
// router.post("/createRole", createRole);
// router.get("/listRole", listRole);
// router.post("/create/roleUser", createUserRole);
// router.get("/list/userRole", listUserRole);
router.get("/list", listUser);
router.get("/detail/:id", detailUser);
router.put("/update/:id", update);
router.delete("/delete/:id", hapus);
router.put("/update/picture/:id", updateImage);
router.post(
  "/upload",
  multer({ storage: diskStorage }).single("file"),
  (req, res) => {
    const file = req.file;
    console.log(file);

    if(!file) {
        res.status(400).send({status: "failed", msg: "No File Is Selected"})
    }

    
    const url = `http://localhost:3000/uploads/${file.filename}`

    return res.status(201).json({
        status: "success",
        msg: "upload success",
        url
    })
  }
);

module.exports = router;
