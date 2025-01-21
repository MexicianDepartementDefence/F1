const Guru = require("../models/guru");
const Kelas = require("../models/kelas");
const Raport = require("../models/raport");
const Siswa = require("../models/siswa");

async function createBulkRaport(req, res) {
  try {
    const { payload } = req.body;
    let gagal = 0;
    let berhasil = 0;

    try {
        const add = await Raport.bulkCreate(payload, {returning: true, validate: true})

        berhasil += add.length
    } catch (error) {
        console.error(error.error || error)
        gagal += 1;
    }

    return res.status(201).json({
        status: "success",
        code: 201,
        msg: `create a bulk of raport was success on ${berhasil} data and failed on ${gagal} data`,
        data: payload
    })
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
        status: "failed",
        code: 500,
        msg: "the bulkcreate was failed to create",
        error: error.message
    })
  }
}

async function listRaport (req, res) {
    try {
        const list = await Raport.findAndCountAll({
            offset: 0,
            limit: 10,
        });

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "the list is show",
            data: list
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "the list wasn't show",
            error: error.message
        })
    }
}

module.exports = {createBulkRaport, listRaport};
