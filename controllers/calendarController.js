const { Model } = require("sequelize");
const Circuit = require("../models/circuit");
const Fixture = require("../models/fixture");

async function tambahCircuit(req, res) {
  const { nama, length, turn, fastest_lap, laps } = req.body;

  try {
    const tambah = await Circuit.create({
      nama,
      length,
      turn,
      fastest_lap,
      laps,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "success to add some circuits",
      data: tambah,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add some circuits",
      error: error.message,
    });
  }
}

async function listSirkuit(req, res) {
  try {
    const list = await Circuit.findAndCountAll({
      offset: 0,
      limit: 10,
    });

    return res.status(200).json({
      status: "success",
      msg: "show the list complete",
      code: 200,
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show the list",
      error: error.message,
    });
  }
}

async function detailSirkuit(req, res) {
  try {
    const detail = await Circuit.findOne({
      where: {id: req.params.id}
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the circuit hasn't add yet"
      })
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the detail circuit completed",
      data: circuit
    })
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show the list",
      error: error.message
    })
  }
}

async function updateCircuit(req, res) {
  const { nama, length, turn, fastest_lap, laps } = req.body;
  try {
    const detail = await Circuit.findOne({
      where: { id: req.params.id },
    });

    await Circuit.update(
      {
        nama,
        length,
        turn,
        fastest_lap,
        laps,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "sorry, looks like the circuit didn't added",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "success updating the data",
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to update circuit",
      error: error.message,
    });
  }
}

async function tambahJadwal(req, res) {
  const { negara_bagian, tanggal, circuit } = req.body;

  try {
    const tambah = await Fixture.create({
      negara_bagian,
      tanggal,
      circuit,
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "success to add fixtures",
      data: tambah,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add fixtures",
      error: error.message,
    });
  }
}

async function listJadwal(req, res) {
  try {
    const list = await Fixture.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: Circuit,
          as: "sirkuit"
        },
      ],
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "run the list completed",
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to run the list",
      error: error.message,
    });
  }
}

async function detailJadwal(req, res) {
  try {
    const detail = await Fixture.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Circuit,
          as: "sirkuit",
          required: true,
          attributes: ["id", "nama", "laps"],
        },
      ],
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the schedule isn't added yet",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the schedule detail has been show",
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to run the detail",
      error: error.message,
    });
  }
}

async function updateJadwal(req, res) {
  const { negara_bagian, tanggal, circuit } = req.body;
  try {
    const detail = await Fixture.findOne({ where: { id: req.params.id } });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the schedule hasn't add yet",
      });
    }

    await Fixture.update(
      {
        negara_bagian,
        tanggal,
        circuit,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "update successfull",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to run the update",
      error: error.message,
    });
  }
}

module.exports = {
  tambahCircuit,
  listSirkuit,
  updateCircuit,
  detailSirkuit,
  tambahJadwal,
  listJadwal,
  detailJadwal,
  updateJadwal,
  
};
