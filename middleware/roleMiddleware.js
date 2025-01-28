// middleware/roleMiddleware.js
const { User, Role, Permission, UserRole, RolePermission } = require('../models');

exports.checkRole = (requiredRole) => async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Cek apakah user memiliki role yang sesuai
    const userRoles = await UserRole.findAll({
      where: { userId },
      include: { model: Role, as: "role", where: { name: requiredRole } }
    });

    if (!userRoles.length) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Access denied. You do not have the required role.'
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
