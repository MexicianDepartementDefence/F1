const { where } = require("sequelize");
const Guru = require("../models/guru");
const Jurusan = require("../models/jurusan");
const Kelas = require("../models/kelas");
const siswa = require("../models/siswa");

async function createSiswa(req, res) {
  const {
    nama,
    tanggal_lahir,
    asal,
    alamat,
    pendidikan_terakhir,
    jurusan_id,
    kelas_id,
  } = req.body;

  try {
    const create = await siswa.create({
      nama,
      tanggal_lahir,
      asal,
      alamat,
      pendidikan_terakhir,
      jurusan_id,
      kelas_id,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create the student is success",
      data: create,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to create a student",
      error: error.message,
    });
  }
}

async function listSiswa(req, res) {
  try {
    const list = await siswa.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: Jurusan,
          as: "jurusan",
        },
        {
          model: Kelas,
          as: "kelas",
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show a student list",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show a student list",
      error: error.message,
    });
  }
}

async function createGuru(req, res) {
  const { nama, pendidikan_terakhir, tanggal_lahir, mapel } = req.body;
  try {
    const tambah = await Guru.create({
      nama,
      pendidikan_terakhir,
      tanggal_lahir,
      mapel,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create a teacher success",
      data: tambah,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "success",
      code: 500,
      msg: "failed to create a teacher",
      error: error.message,
    });
  }
}

async function listGuru(req, res) {
  try {
    const list = await Guru.findAndCountAll({
      offset: 0,
      limit: 10,
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "show a teacher list completed",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to show a teacher list",
      error: error.message,
    });
  }
}

async function detailGuru(req, res) {
  try {
    const detail = await Guru.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the teacher details wasn't made",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the teacher detail's has been show",
      data: detail,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "showing a teacher detail is failed",
      error: error.message,
    });
  }
}

async function updateGuru(req, res) {
  const { nama, pendidikan_terakhir, tanggal_lahir, mapel } = req.body;
  try {
    const detail = await Guru.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!detail) {
      return res.status(400).json({
        status: "error",
        code: 400,
        msg: "the teacher details wasn't made",
      });
    }

    await Guru.update(
      {
        nama,
        pendidikan_terakhir,
        tanggal_lahir,
        mapel,
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
        msg: "the update was success",
        data: detail
    })
  } catch (error) {
    console.error(error.error || error)
    return res.status(500).json({
        status: "failed",
        code: 500,
        msg: "failed to update the teacher",
        error: error.message
    })
  }
}

async function hapusGuru (req, res) {
    try {
        const detail = await Guru.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!detail) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                msg: "the teacher detail's hasn't added yet"
            })
        }

        await Guru.destroy({
            where: {id: req.params.id}
        });

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "the teacher has deleted",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error)
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to delete the teaccher",
            error: error.message
        })
    }
}

module.exports = {
  createSiswa,
  listSiswa,
  createGuru,
  listGuru,
  detailGuru,
  updateGuru,
  hapusGuru
};
