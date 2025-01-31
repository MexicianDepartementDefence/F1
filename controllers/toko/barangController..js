const Barang = require("../../models/barang");
const Toko = require("../../models/toko");

async function createBarang(req, res) {
  try {
    const {
      nama_barang,
      deskripsi,
      tokoId,
      kondisi,
      stok,
      harga,
      minimal_pembelian,
    } = req.body;

    const tambah = await Barang.create({
      nama_barang,
      deskripsi,
      tokoId,
      kondisi,
      stok,
      harga,
      minimal_pembelian,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create a object success",
      data: tambah,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to create a object",
      error: error.message,
    });
  }
}

async function listBarang(req, res) {
  try {
    const list = await Barang.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model: Toko,
          as: "market",
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "got the access of list",
      data: list,
    });
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "the list doesn't get any access",
      error: error.message,
    });
  }
}

async function updateBarang(req, res) {
  try {
    const {
      nama_barang,
      tokoId,
      deskripsi,
      kondisi,
      stok,
      harga,
      minimal_pembelian,
    } = req.body;
    const detail = await Barang.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Toko,
          as: "market",
        },
      ],
    });

    if (!detail) {
      return res.status(404).json({
        status: "failed",
        code: 404,
        msg: "the object is not found",
      });
    }

    await Barang.update(
      {
        nama_barang,
        tokoId,
        deskripsi,
        kondisi,
        stok,
        harga,
        minimal_pembelian,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(201).json({
        status: "success",
        code: 201,
        msg: "updating the object is success",
        data: detail
    })
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "success",
      code: 500,
      msg: "failed to add some object",
      error: error.message,
    });
  }
}

async function destroyBarang (req, res) {
    try {
        const detail = await Barang.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Toko,
                as: "market"
            }]
        });

        if (!detail) {
            return res.status(404).json({
                status: "failed",
                code: 404,
                msg: "there is no barang exist"
            })
        };

        await Barang.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "destroy/delete the barang is success",
            data: detail
        })
    } catch (error) {
        console.error(error.error || error);
        return res.status(500).json({
            status: "failed",
            code: 500,
            msg: "failed to destroy/delete object",
            error: error.message
        })
    }
}

async function detailBarang(req, res) {
    try {
        const detail = await Barang.findOne({
            where: {
                id: req.params.id
            },

            include: [
                {
                    model: Toko,
                    as: "market"
                }
            ]
        });

        if (!detail) {
            return res.status(404).json({
                status: "failed",
                code: 404,
                msg: "the barang is not exist"
            })
        }

        return res.status(200).json({
            status: "success",
            code: 200,
            msg: "access the detail is success",
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

module.exports = {
  createBarang,
  listBarang,
  detailBarang,
  updateBarang,
  destroyBarang
};
