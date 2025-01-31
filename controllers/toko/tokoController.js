const { User } = require("../../models");
const Barang = require("../../models/barang");
const Toko = require("../../models/toko");
const UserRole = require("../../models/userRole");

async function createToko (req, res) {
    try {
        const {nama_toko, lokasi, alamat} = req.body;

        const add = await Toko.create({
            nama_toko,
            lokasi,
            alamat,
            userId: req.user.id
        });

        await UserRole.update({
            roleId: 3
        }, {
            where: {
                userId: req.user.id
            }
        });

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "add a shop is success",
            data: add
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to create a shop",
            error: error.message
        })
    }
}

async function detailToko (req, res) {
    try {
        const detail = await Toko.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    as: "user"
                },
                {
                    model: Barang,
                    as: "barang"
                }
            ]
        });

        if (!detail) {
            return res.status(404).json({
                status: "failed",
                code: 404,
                msg: "the shop was not exist"
            })
        };

        return res.status(200).json({
            status:"success",
            code:200,
            msg: "access to detail is completed",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to access the detail",
            error: error.message
        })
    }
}

async function listToko (req, res) {
    try {
        const list = await Toko.findAndCountAll({
            offset: 0,
            limit: 10,
            include: [
                {
                    model: User,
                    as: "user"
                }
            ]
        });

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "success to access the list",
            data: list
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to access the list",
            error: error.message
        })
    }
}

async function updateToko (req, res) {
    try {
        const {nama_toko, alamat, lokasi} = req.body;
        const detail = await Toko.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    as: "user"
                }
            ]
        });

        if (!detail) {
            return res.status(404).json({
                status: "failed",
                code: 404,
                msg: "the toko was not exist"
            })
        };

        await Toko.update({
            nama_toko: nama_toko,
            alamat: alamat,
            lokasi: lokasi,
            userId: req.user.id
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "update successfull",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to update a shop",
            error: error.message
        })
    }
}





module.exports = {
    createToko,
    detailToko,
    listToko,
    updateToko
}
