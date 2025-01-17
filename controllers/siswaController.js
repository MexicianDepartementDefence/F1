const Jurusan = require("../models/jurusan");
const Kelas = require("../models/kelas");
const siswa = require("../models/siswa");

async function createSiswa (req, res) {
    const {nama, tanggal_lahir, asal, alamat, pendidikan_terakhir, jurusan_id, kelas_id} = req.body;

    try {
        const create = await siswa.create({
            nama, tanggal_lahir, asal, alamat, pendidikan_terakhir, jurusan_id, kelas_id
        });

        return res.status(201).json({
           status: "success",
           code: 201,
           msg: "create the student is success",
           data: create 
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to create a student",
            error: error.message
        })
    }
}

async function listSiswa (req, res) {
    try {
        const list = await siswa.findAndCountAll({
            offset: 0,
            limit: 10,
            include: [
                {
                    model: Jurusan,
                    as: "jurusan"
                },
                {
                    model: Kelas,
                    as: "kelas"
                }
            ]
        });

        return res.status(200).json({
            status: 'success',
            code: 200,
            msg: "show a student list",
            data: list
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to show a student list",
            error: error.message
        })
    }
}

module.exports = {
createSiswa,
listSiswa

}