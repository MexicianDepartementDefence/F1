const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/index2");
const UserRole = require("../models/userRole");
const Role = require("../models/role");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, email, password, gambar } = req.body;
  try {
    // Cek apakah user dengan email sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email sudah digunakan",
      });
    }

    // Hashing password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      gambar,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        gambar: gambar,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to login",
      error: error.message,
    });
  }
};

exports.detailUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Invalid Users",
      });
    }

    return res.status(201).json({
      status: "success",
      code: 200,
      message: "Success to Get The Detail",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to Get The Detail",
      error: error.message,
    });
  }
};

exports.listUser = async (req, res) => {
  try {
    const user = await User.findAndCountAll({
      limit: 10,
      offset: 0,
      attributes: ["id", "username", "email", "password", "gambar"],
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User Was Not Found",
      });
    }

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "List Successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed To List The User",
      error: error.message,
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const {gambar} = req.body
    // upload file

    // const diskStorage = multer.diskStorage({
    //   // konfigurasi folder penyimpanan file
    //   destination: function (req, file, cb) {
    //     cb(null, path.join(__dirname, "../uploads"));
    //   },

    //   //konfigurasi penamaan file
    //   filename: function (req, file, cb) {
    //     cb(null, Date.now() + path.extname(file.originalname));
    //   },
    // });

    // const upload = multer({ storage: diskStorage }).single("file");

    // upload(req, res, async (err) => {
    //   if (err) {
    //     return res.status(401).json({
    //       status: "error",
    //       msg: "Error",
    //       error: err.message
    //     })
    //   }

    //   const file = req.file;

    //   console.log(file);
  
    //   if (!file) {
    //     return res.status(401).json({
    //       status: "error",
    //       msg: "There Is Not File To Upload"
    //     })
    //   }
    // })

   

    // const url = `http://localhost:3000/uploads/${file.filename}`;

    const user = await User.update({
      gambar: gambar
    }, {where: {id: req.params.id}})
      
    return res.status(201).json({
      status: "success",
      msg: "update successfull",
      code:201,
      user,
      gambar: url
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      msg: "Failed To Update The Profile Picture",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.update(
      {
        username: username,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        msg: "Failed To Update Username",
      });
    }

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "Update Successful",
      data: user,
    });
  } catch (error) {
    console.log(req.params.id);

    return res.status(500).json({
      status: "error",
      code: 500,
      msg: "Failed To Update Username",
      error: error.message,
    });
  }
};

exports.hapus = async (req, res) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id },
    });

    return res.status(201).json({
      status: "Success",
      code: 201,
      msg: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      msg: "Failed To Delete User",
      error: error.message,
    });
  }
};

// Role

exports.createRole = async (req, res) => {
  try {
    const {name} = req.body
    const add = await Role.create({
      name
    })

    return res.status(201).json({
      status: "success",
      code: 201,
      msg: "create a role success",
      data: add
    })
  } catch (error) {
    console.error(error.error || error);
    return res.status(500).json({
      status: "failed",
      code: 500,
      msg: "failed to create a role",
      error: error.message
    })
  }
}

exports.listRole = async (req, res) => {
  try {
    const list = await Role.findAndCountAll({
      offset: 0,
      limit: 10
    })

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "access to role is success",
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

exports.createUserrole = async (req, res) => {
try {
  const {userId, roleId} = req.body;

  const add = await UserRole.create({
    userId,
    roleId
  });

  return res.status(201).json({
    status: "success",
    code: 201,
    msg: "create a role is success",
    data: add
  })
} catch (error) {
  console.error(error.error || error);
  return res.status(500).json({
    status: "failed",
    code: 500,
    msg: "failed to create user role",
    error: error.message
  })
}
}

exports.listUserRole = async (req, res) => {
  try {
    const list = await UserRole.findAndCountAll({
      offset: 0,
      limit: 10,
      include: [
        {
          model : User,
          as: "pengguna"
        },
        {
          model: Role,
          as: "role"
        }
      ]
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      msg: "the access of list user is unlock",
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