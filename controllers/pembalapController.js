require("dotenv").config();
const Pembalap = require("../models/pembalap");
const Driver_Stat = require("../models/driver_stat");
const Principal = require("../models/principal");
const Team = require("../models/team");
const { Op, where } = require("sequelize");
const models = require("../models");

// Drivers

async function tambahPembalap(req, res) {
  const { nama, nomor_pembalap, lahir, asal_negara } = req.body;

  console.log(req.body);

  try {
    const save = await Pembalap.create({
      nama,
      nomor_pembalap,
      lahir,
      asal_negara,
    });

    return res.status(201).json({
      status: "Success",
      msg: "added a driver",
      data: save,
      code: 201,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      msg: "failed to add a driver",
      error: error.message,
    });
  }
}

async function listPembalap(req, res) {
  const { nama, nomor_pembalap } = req.query;

  try {
    const list = await Pembalap.findAndCountAll({
      limit: 10,
      offset: 0,
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show a list success",
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show a list",
      error: error.message,
    });
  }
}

async function detailPembalap(req, res) {
  try {
    const detail = await Pembalap.findOne({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "show the detail complete",
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      message: "failed to show the detail",
      error: error.message,
    });
  }
}

async function updatePembalap(req, res) {
  const { nama, nomor_pembalap, lahir, asal_negara } = req.body;
  try {
    const detail = await Pembalap.findOne({
      where: { id: req.params.id },
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "the driver hasn't added yet",
      });
    }

    await Pembalap.update(
      {
        nama,
        nomor_pembalap,
        lahir,
        asal_negara,
      },
      {
        where: { id: req.params.id },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "drivers update complete",
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to update the drivers",
      error: error.message,
    });
  }
}

// Statistic

async function addStats(req, res) {
  const {
    drivers_id,
    appearance,
    race_win,
    race_podium,
    world_champion,
    pole_position,
    fastest_lap,
    retire,
  } = req.body;
  try {
    const tambah = await Driver_Stat.create({
      drivers_id,
      appearance,
      race_win,
      race_podium,
      world_champion,
      pole_position,
      fastest_lap,
      retire,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "the stats has been added",
      data: tambah,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add the stats",
      error: error.message,
    });
  }
}

async function listStats(req, res) {
  try {
    const list = await Driver_Stat.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: Pembalap,
          attributes: ["nama", "nomor_pembalap", "lahir", "asal_negara"],
          as: "pembalap",
        },
      ],
    });

    if (!list) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the stats wasn't added at all",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the stats list was saw",
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      status: "success",
      code: 500,
      msg: "failed to show the list",
      error: error.message,
    });
  }
}

async function detailStats(req, res) {
  try {
    const detail = await Driver_Stat.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Pembalap,
          attributes: ["nama", "nomor_pembalap"],
          as: "pembalap",
        },
      ],
    });

    if (!detail) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        msg: "the stats detail hasn't added yet",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the stats detail is completed",
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show the detail",
    });
  }
}

async function updateStats(req, res) {
  const {
    drivers_id,
    appearance,
    race_win,
    race_podium,
    world_champion,
    pole_position,
    fastest_lap,
    retire,
  } = req.body;

  try {
    const detail = await Driver_Stat.findOne({
      where: {id: req.params.id}
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the driver's stats hasn't added yet"
      })
    }

    await Driver_Stat.update({
      drivers_id,
      appearance,
      race_win,
      race_podium,
      world_champion,
      pole_position,
      fastest_lap,
      retire,
    }, {
      where: {id: req.params.id}
    })

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the stats has been updated",
      data: detail
    })
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to update the stats"
    })
  }
}

// Team

async function tambahTeam(req, res) {
  const { nama, first_driver_id, second_driver_id, team_principal, origin } =
    req.body;

  console.log(`${first_driver_id}, ${second_driver_id}`);

  try {
    const pembalaputama = await Pembalap.findByPk(first_driver_id);
    const pembalapkedua = await Pembalap.findByPk(second_driver_id);

    const tambah = await Team.create({
      nama,
      first_driver_id: pembalaputama.id,
      second_driver_id: pembalapkedua.id,
      team_principal,
      origin,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "added team complete",
      data: tambah,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to add a team",
      error: error.message,
    });
  }
}

async function listTeam(req, res) {
  try {
    console.log(listTeam);
    const list = await Team.findAndCountAll({
      offset: 0,
      limit: 10,
      attributes: ["id", "nama", "team_principal", "origin"],
      include: [
        {
          model: Pembalap,
          attributes: ["id", "nama", "nomor_pembalap", "lahir", "asal_negara"],
          as: "pembalapUtama",
        },
        {
          model: Pembalap,
          attributes: ["id", "nama", "nomor_pembalap", "lahir", "asal_negara"],
          as: "pembalapKedua",
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "sync the list complete",
      data: list,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to sync the list",
      error: error.message,
    });
  }
}

async function detailTeam(req, res) {
  try {
    const detail = await Team.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Pembalap,
          attributes: ["id", "nama", "nomor_pembalap"],
          as: "pembalapUtama",
        },
        {
          model: Pembalap,
          attributes: ["id", "nama", "nomor_pembalap"],
          as: "pembalapKedua",
        },
      ],
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "teams hasn't added yet",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show the team detail complete",
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show the details",
      error: error.message,
    });
  }
}

async function updateTeam(req, res) {
  const { nama, first_driver_id, second_driver_id, team_principal, origin } =
    req.body;
  try {
    const detail = await Team.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Pembalap,
          attributes: ["id", "nama", "nomor_pembalap"],
          as: "pembalapUtama",
        },
        {
          model: Pembalap,
          attributes: ["id", "nama", "nomor_pembalap"],
          as: "pembalapKedua",
        },
      ],
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the team hasn't add yet",
      });
    }

    await Team.update(
      {
        nama,
        first_driver_id,
        second_driver_id,
        team_principal,
        origin,
      },
      {
        where: { id: req.params.id },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "update the teams complete",
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to update the team",
      error: error.message,
    });
  }
}

module.exports = {
  tambahPembalap,
  listPembalap,
  detailPembalap,
  updatePembalap,
  addStats,
  listStats,
  detailStats,
  updateStats,
  tambahTeam,
  listTeam,
  detailTeam,
  updateTeam,
};
