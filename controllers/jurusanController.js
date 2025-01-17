const Jurusan = require("../models/jurusan");
const Kelas = require("../models/kelas");

async function createJurusan(req, res) {
  const { nama_jurusan } = req.body;

  try {
    const tambah = Jurusan.create({
      nama_jurusan,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create the jurusan success",
      data: tambah,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add the jurusan",
      error: error.message,
    });
  }
}

async function listJurusan(req, res) {
  try {
    const list = await Jurusan.findAndCountAll({
      offset: 0,
      limit: 10,
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show to list success",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show the list",
      error: error.message,
    });
  }
}

// Kelas
async function createKelas(req, res) {
  const { kelas } = req.body;
  try {
    const tambah = await Kelas.create({
      kelas,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create the class success",
      data: tambah,
    });
  } catch {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add the class",
      error: error.message,
    });
  }
}

async function listKelas(req, res) {
  try {
    const list = await Kelas.findAndCountAll({
      offset: 0,
      limit: 10,
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show the class list completed",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show the class list",
      error: error.message,
    });
  }
}

module.exports = {
  createJurusan,
  listJurusan,
  createKelas,
  listKelas,
};
