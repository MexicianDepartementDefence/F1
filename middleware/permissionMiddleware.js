// middleware/permissionMiddleware.js
const { User, Role, Permission, UserRole, RolePermission } = require('../models');

exports.checkPermission = (requiredPermission) => async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Cek apakah user memiliki permission yang sesuai
    const userRoles = await UserRole.findAll({ where: { userId } });
    const roleIds = userRoles.map((userRole) => userRole.roleId);

    const permissions = await RolePermission.findAll({
      where: { roleId: roleIds },
      include: { model: Permission, where: { name: requiredPermission } }
    });

    if (!permissions.length) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Access denied. You do not have the required permission.'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
