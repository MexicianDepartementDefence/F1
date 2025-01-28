const Penjual = require("../models/penjual");
const User = require("../models/index2");

// Penjual Dan Barang

async function createBarang(req, res) {
  try {
    const { nama_barang, harga, stok, lokasi } = req.body;

    const tambah = await Penjual.create({
      nama_barang,
      harga,
      stok,
      lokasi,
      userId: req.user.id,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create barang sucess",
      data: tambah,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to create a barang",
      error: error.message,
    });
  }
}

async function listBarang(req, res) {
  try {
    const list = await Penjual.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "access to list success",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to access the list",
      error: error.message,
    });
  }
}

async function detailPenjual(req, res) {
  try {
    const penjual = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "username"],

      include: [
        {
          model: Penjual,
          as: "penjual",
        },
      ],
    });

    if (!penjual) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the user isn't existed",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the access to detail is success",
      data: penjual,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to access the detail",
      error: error.message,
    });
  }
}

async function detailBarang(req, res) {
  try {
    const detail = await Penjual.findOne({
      where: { id: req.params.id },
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        msg: "the object isn't exist",
      });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "access to the detail is success",
      data: detail,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to access the detail",
      error: error.message,
    });
  }
}

async function updateBarang(req, res) {
  try {
    const { nama_barang, harga, stok, lokasi } = req.body;
    const detail = await Penjual.findOne({
      where: { id: req.params.id },
    });

    if (!detail) {
      return res.status(400).json({
        status: "failed",
        cdoe: 400,
        msg: "the object isn't exist",
      });
    }

    await Penjual.update(
      {
        nama_barang,
        harga,
        stok,
        lokasi,
        userId: req.user.id
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(201).json({
      status: "success",
      cde: 201,
      msg: "the update is success",
      data: detail,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to update the object",
      error: error.message,
    });
  }
}

async function deleteBarang (req, res) {
    try {
        const detail = await Penjual.findOne({
            where: {id: req.params.id}
        });

        if (!detail) {
            return res.status(404).json({
                status: "failed",
                code: 404,
                msg: "the barang is not found"
            })
        }

        await Penjual.destroy({
            where: {id: req.params.id}
        })

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "the barang is deleted",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to destroy the barang",
            error: error.message
        })
    }
}

module.exports = {
  createBarang,
  listBarang,
  detailPenjual,
  detailBarang,
  updateBarang,
  deleteBarang
};
