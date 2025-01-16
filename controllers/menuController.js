const Makanan = require("../models/makanan");
const Minuman = require("../models/minuman");
const Menu = require("../models/menu");

// Makanan
async function tambahMakanan(req, res) {
  const { nama_makanan, harga } = req.body;

  try {
    const tambah = await Makanan.create({
      nama_makanan,
      harga,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "add the food completed",
      data: tambah,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add the food",
      error: error.message,
    });
  }
}

//Minuman
async function tambahMinuman(req, res) {
  const { nama_minuman, harga } = req.body;

  try {
    const tambah = await Minuman.create({
      nama_minuman,
      harga,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "add the drink success",
      data: tambah,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "add the drink failed",
      error: error.message,
    });
  }
}

// Menu

async function tambahMenu(req, res) {
  const { makanan_id, minuman_id } = req.body;

  try {
    const tambah = await Menu.create({
      makanan_id,
      minuman_id,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "add the menu success",
      data: tambah,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "add the team has failed",
      error: error.message,
    });
  }
}

async function listMenu(req, res) {
  try {
    const list = await Menu.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: Makanan,
          as: "makanan",
        },
        {
          model: Minuman,
          as: "minuman",
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show the menu list completed",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "show the menu list failed",
      error: error.message,
    });
  }
}

module.exports = {
  tambahMakanan,
  tambahMinuman,
  tambahMenu,
  listMenu
};
