const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

/**
 * @route   POST /api/auth/sync
 * @desc    Synchronize user metadata from Firebase to PostgreSQL on login/signup
 * @access  Private
 */
router.post('/sync', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = router;
