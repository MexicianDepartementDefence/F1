const { where } = require("sequelize");
const Klub = require("../models/klub");
const Liga = require("../models/liga");

async function createClub (req, res) {
    const {nama_klub, tahun_terbentuk, gelar, daftar_pemain, stadion} = req.body;
    try {
        const tabah = await Klub.create({
            nama_klub,
            tahun_terbentuk,
            gelar,
            daftar_pemain,
            stadion
        })

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "create a club complete",
            data:tabah
        })
    } catch (error) {
     console.error(error.error || error);
     return res.status(500).json({
        status: "failed",
        code: 500,
        msg: "failed to create a club",
        error: error.message
     })
    }
}

async function listClub (req, res) {
    try {
        const list = await Klub.findAndCountAll({
            offset: 0,
            limit: 10
        });

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "show the club list complete",
            data: list
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "cannot show the club",
            error: error.message
        })
    }
}

async function detailClub (req, res) {
    try {
        const detail = await Klub.findOne({
            where: {id: req.params.id}
        });

        if (!detail) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                msg: "the team yet made",
            })
        };

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "the team detail's has show completely",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "can't show the club detail's",
            error: error.message
        })
    }
}

async function updatePlayer (req, res) {
    const {daftar_pemain} = req.body;
    try {
        const detail = await Klub.findOne({
            where: {id: req.params.id}
        });

        if (!detail) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                msg: "the team hasn't register yet"
            })
        };

        await Klub.update({
            daftar_pemain
        },
        {
            where: {
                id: req.params.id
            }
        }
    )

    return res.status(200).json({
        status: "success",
        code: 200,
        msg: "the team has been updated",
        data: detail
    })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "the team can't update",
            error: error.message
        })
    }
}

async function updateClub (req, res) {
    const {nama_klub, tahun_terbentuk, stadion} = req.body
    try {
        const detail = await Klub.findOne({
            where: {id: req.params.id}
        });

        if (!detail) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                msg: "the team hasn't added yet"
            });
        }

        await Klub.update({
            nama_klub,
            tahun_terbentuk,
            stadion
        }, {
            where: {id: req.params.id}
        })

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "the team has successfully update",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "the team can't update",
            error: error.message
        })
    }
}

async function createLiga (req, res) {
    const {nama_liga, jumlah_klub, klub} = req.body;

    try {
        const tambah = await Liga.create({
            nama_liga,
            jumlah_klub,
            klub
        });

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "the league has added",
            data: tambah
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "the league can't added",
            error: error.message
        })
    }
}

async function listLiga (req, res) {
    try {
        const list = await Liga.findAndCountAll({
            offset: 0,
            limit: 10
        })

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "the list was success to display",
            data: list
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "the league can't show the list",
            error: error.message
        })
    }
}

async function detailLiga (req, res) {
    try {
        const detail = await Liga.findOne({
            where: {id: req.params.id}
        })

        if (!detail) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                msg: "the league hasn't add yet"
            })
        }

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "showing the league detail was success",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to show a league detail",
            error: error.message
        })
    }
}

async function updateLiga (req, res) {
    const {nama_liga, jumlah_klub, klub, juara_bertahan, juara_terbanyak,tahun_berdiri} = req.body;
    try {
        const detail = await Liga.findOne({
            where: {id: req.params.id}
        });

        if (!detail) {
            return res.status(400).json({
                status: "failed",
                code:400,
                msg: "the league hasn't create yet"
            })
        }

        await Liga.update({
            nama_liga,
            jumlah_klub,
            klub,
            juara_bertahan,
            juara_terbanyak,
            tahun_berdiri
        }, {
            where: {id: req.params.id}
        })

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "update the league success",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to update the league",
            error: error.message
        })
    }
}

async function updateClubLeague (req, res) {
    
    try {
        const {klub} = req.body;

        const detail = await Liga.findOne({
            where: {id: req.params.id}
        })

        if (!detail) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                msg: "the league hasn't create yet"
            })
        }

        await Klub.update({
            klub
        }, {
            where: {id: req.params.id}
        });

        return res.status(201).json({
            status: "success",
            code: 201,
            msg: "the league has been updated",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to update the club league",
            error: error.message
        })
    }
}

module.exports = {
    createClub,
    listClub,
    detailClub,
    updatePlayer,
    updateClub,
    createLiga,
    listLiga,
    detailLiga,
    updateLiga,
    updateClubLeague
}