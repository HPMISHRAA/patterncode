const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get aggregated stats for the user dashboard
 * @access  Private
 */
router.get('/stats', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Total Problems Solved
    const totalQuery = await db.query(
      "SELECT COUNT(DISTINCT problem_id) as count FROM submissions WHERE user_id = $1 AND status = 'Accepted'",
      [userId]
    );
    const totalSolved = parseInt(totalQuery.rows[0].count || 0);

    // 2. Solved Breakdown by Category
    const categoryQuery = await db.query(
      `SELECT p.category, COUNT(DISTINCT s.problem_id) as count 
       FROM submissions s 
       JOIN problems p ON s.problem_id = p.id 
       WHERE s.user_id = $1 AND s.status = 'Accepted' 
       GROUP BY p.category`,
      [userId]
    );
    const categoryBreakdown = categoryQuery.rows;

    // 3. Solved Breakdown by Difficulty
    const difficultyQuery = await db.query(
      `SELECT p.difficulty, COUNT(DISTINCT s.problem_id) as count 
       FROM submissions s 
       JOIN problems p ON s.problem_id = p.id 
       WHERE s.user_id = $1 AND s.status = 'Accepted' 
       GROUP BY p.difficulty`,
      [userId]
    );
    const difficultyBreakdown = difficultyQuery.rows;

    // 4. Streak Stats (fetch directly from authenticated user)
    const userQuery = await db.query(
      "SELECT current_streak, longest_streak, last_solved_at FROM users WHERE id = $1",
      [userId]
    );
    const userStreaks = userQuery.rows[0];

    // 5. Unlocked Badges
    const badgesQuery = await db.query(
      `SELECT b.code, b.name, b.description, b.icon_url, ub.earned_at 
       FROM user_badges ub 
       JOIN badges b ON ub.badge_id = b.id 
       WHERE ub.user_id = $1 
       ORDER BY ub.earned_at DESC`,
      [userId]
    );
    const earnedBadges = badgesQuery.rows;

    // 6. Recent Submissions
    const submissionsQuery = await db.query(
      `SELECT s.id, s.status, s.language, s.created_at, p.title, p.slug 
       FROM submissions s 
       JOIN problems p ON s.problem_id = p.id 
       WHERE s.user_id = $1 
       ORDER BY s.created_at DESC 
       LIMIT 5`,
      [userId]
    );
    const recentSubmissions = submissionsQuery.rows;

    res.status(200).json({
      success: true,
      stats: {
        totalSolved,
        categoryBreakdown,
        difficultyBreakdown,
        streaks: {
          current: userStreaks.current_streak,
          longest: userStreaks.longest_streak,
          lastSolvedAt: userStreaks.last_solved_at
        },
        earnedBadges,
        recentSubmissions
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve stats' });
  }
});

/**
 * @route   GET /api/dashboard/badges
 * @desc    Get all badges and mark which ones are earned by the user
 * @access  Private
 */
router.get('/badges', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const allBadgesQuery = await db.query('SELECT * FROM badges ORDER BY name');
    const userBadgesQuery = await db.query('SELECT badge_id FROM user_badges WHERE user_id = $1', [userId]);

    const earnedBadgeIds = new Set(userBadgesQuery.rows.map(row => row.badge_id));

    const badges = allBadgesQuery.rows.map(badge => ({
      ...badge,
      unlocked: earnedBadgeIds.has(badge.id)
    }));

    res.status(200).json({ success: true, badges });
  } catch (error) {
    console.error('Error fetching badges list:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve badges' });
  }
});

module.exports = router;
