const db = require('../config/db');

/**
 * Calculates user streak updates and badges on successful solution accept.
 * Returns an array of newly earned badges.
 */
async function processStreakAndBadges(userId, problemId) {
  const newBadgesEarned = [];
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Fetch user data
    const userResult = await client.query(
      'SELECT current_streak, longest_streak, last_solved_at FROM users WHERE id = $1 FOR UPDATE',
      [userId]
    );
    const user = userResult.rows[0];

    const now = new Date();
    let currentStreak = user.current_streak;
    let longestStreak = user.longest_streak;
    let updateStreak = false;

    if (!user.last_solved_at) {
      // First solved problem ever
      currentStreak = 1;
      longestStreak = Math.max(longestStreak, 1);
      updateStreak = true;
    } else {
      const lastSolved = new Date(user.last_solved_at);
      
      // Calculate date difference in days (disregarding time of day)
      const diffTime = Math.abs(now.setHours(0, 0, 0, 0) - lastSolved.setHours(0, 0, 0, 0));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Solved yesterday, increment streak
        currentStreak += 1;
        longestStreak = Math.max(longestStreak, currentStreak);
        updateStreak = true;
      } else if (diffDays > 1) {
        // Missed a day, reset streak
        currentStreak = 1;
        updateStreak = true;
      }
      // If diffDays === 0 (already solved today), streak stays the same, we just update last_solved_at
    }

    // Update user stats
    await client.query(
      `UPDATE users 
       SET current_streak = $1, longest_streak = $2, last_solved_at = NOW() 
       WHERE id = $3`,
      [currentStreak, longestStreak, userId]
    );

    // 2. Evaluate Badge Eligibility
    // Fetch user total distinct solved problems
    const solvedQuery = await client.query(
      "SELECT COUNT(DISTINCT problem_id) as count FROM submissions WHERE user_id = $1 AND status = 'Accepted'",
      [userId]
    );
    const totalSolved = parseInt(solvedQuery.rows[0].count || 0);

    // Fetch category breakdown
    const categoryQuery = await client.query(
      `SELECT p.category, COUNT(DISTINCT s.problem_id) as count 
       FROM submissions s 
       JOIN problems p ON s.problem_id = p.id 
       WHERE s.user_id = $1 AND s.status = 'Accepted' 
       GROUP BY p.category`,
      [userId]
    );
    
    const categoriesSolved = {};
    categoryQuery.rows.forEach(row => {
      categoriesSolved[row.category] = parseInt(row.count);
    });

    const badgeCodesToCheck = [];

    if (totalSolved >= 1) badgeCodesToCheck.push('first_solved');
    if (totalSolved >= 10) badgeCodesToCheck.push('ten_solved');
    if (currentStreak >= 30) badgeCodesToCheck.push('streak_30');
    if ((categoriesSolved['Star Patterns'] || 0) >= 5) badgeCodesToCheck.push('star_master');
    if ((categoriesSolved['Diamond Patterns'] || 0) >= 3) badgeCodesToCheck.push('diamond_master');

    // Fetch existing earned badges
    const earnedQuery = await client.query(
      'SELECT b.code FROM user_badges ub JOIN badges b ON ub.badge_id = b.id WHERE ub.user_id = $1',
      [userId]
    );
    const earnedCodes = new Set(earnedQuery.rows.map(row => row.code));

    // Grant new badges
    for (const code of badgeCodesToCheck) {
      if (!earnedCodes.has(code)) {
        // Fetch badge details
        const badgeResult = await client.query('SELECT id, name, description, icon_url FROM badges WHERE code = $1', [code]);
        if (badgeResult.rows.length > 0) {
          const badge = badgeResult.rows[0];
          await client.query(
            'INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [userId, badge.id]
          );
          newBadgesEarned.push(badge);
        }
      }
    }

    await client.query('COMMIT');
    return {
      currentStreak,
      longestStreak,
      newBadgesEarned
    };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error processing streaks/badges:', error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  processStreakAndBadges
};
