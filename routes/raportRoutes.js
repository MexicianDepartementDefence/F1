const express = require("express");
const { createBulkRaport, listRaport } = require("../controllers/raportController");
const router = express.Router();

router.post("/createBulk", createBulkRaport);
router.get("/list", listRaport);

module.exports = router;