require("dotenv").config();
const Fixture = require("../models/fixture");
const Pembalap = require("../models/pembalap");
const Podium = require("../models/podium");

async function createPodium(req, res) {
  const { calendar_id, winner, second, third } = req.body;

  try {
    const tambah = await Podium.create({
      calendar_id,
      winner,
      second,
      third,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "added the podium result",
      data: tambah,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add podium result",
      error: error.message,
    });
  }
}

async function listPodium(req, res) {
  try {
    const list = await Podium.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: Fixture,
          attributes: ["id", "negara_bagian", "tanggal"],
          as: "jadwal",
        },
        {
          model: Pembalap,
          as: "pemenang"
        },
        {
          model: Pembalap,
          as: "runnerup"
        },
        {
          model: Pembalap,
          as: "tiga"
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show the list completed",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error)
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "the list didn't appear",
      error: error.message,
    });
  }
}

async function updatePodium(req, res) {
  const {calendar_id, winner, second, third} = req.body;

  try {
    const detail = await Podium.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Fixture,
          attributes: ["id", "negara_bagian", "tanggal"],
          as: "jadwal",
        },
        {
          model: Pembalap,
          as: "pemenang"
        },
        {
          model: Pembalap,
          as: "runnerup"
        },
        {
          model: Pembalap,
          as: "tiga"
        },
      ]
    });

    

    if (!detail) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        msg: "Sorry, the podium result wasn't made yet",
      })
    }

    await Podium.update({
      calendar_id,
      winner,
      second,
      third
     }, 
     {
      where: {id: req.params.id}
     })

     return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the podium is updated",
      data: detail
     })
  } catch (error) {
    console.error(error.error || error)
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "the podium doesn't update",
      error: error.message
    })
  }
}

module.exports = {
  createPodium,
  listPodium,
  updatePodium
};
