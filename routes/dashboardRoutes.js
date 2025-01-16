// routes/dashboardRoutes.js
const express = require('express');
const { checkRole } = require('../middleware/roleMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');
const router = express.Router();

router.get('/dashboard', checkRole('admin'), checkPermission('access_dashboard'), (req, res) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Welcome to the admin dashboard',
  });
});

module.exports = router;
