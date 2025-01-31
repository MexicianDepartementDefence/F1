const Keranjang = require('../../models/keranjang');
const User = require("../../models/user");
const Barang = require("../../models/barang");
const { Toko } = require('../../models');

async function createCart (req, res) {
    try {
        const {barangId} = req.body;

        const tambah = await Keranjang.create({
            barangId,
            userId: req.user.id
        });

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "create a cart success",
            data: tambah
        })
    } catch (error) {
        console.error(error.erro || error);
        return res.status(500).json({
            status: "error",
            code: 500,
            msg: "failed to create a cart",
            error: error.message
        })
    }
}

async function cartListbyUser (req, res) {
    try {
        const list = await User.findOne({
            where: {
                id: req.user.id,
            },
            include: [
                {
                    model: Barang,
                    as: ""
                }
            ]
        });

        if (!list) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                msg: "the user is not exist"
            })
        };

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "the access to user is completed",
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


module.exports = {
    createCart,
    cartListbyUser
}