const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { admin, isMock } = require('../config/firebase');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Optional middleware to extract user context for status mapping (solved/attempted)
async function getOptionalUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split('Bearer ')[1];
    try {
      let decodedToken;
      if (isMock && (token.startsWith('mock-token-') || token === 'mock-token')) {
        const uidSuffix = token.split('mock-token-')[1] || 'default-dev';
        decodedToken = { uid: `mock-uid-${uidSuffix}` };
      } else {
        decodedToken = await admin.auth().verifyIdToken(token);
      }
      const userQuery = await db.query('SELECT * FROM users WHERE firebase_uid = $1', [decodedToken.uid]);
      if (userQuery.rows.length > 0) {
        req.user = userQuery.rows[0];
      }
    } catch (e) {
      // Ignore token validation issues for optional endpoints
    }
  }
  next();
}

/**
 * @route   GET /api/problems
 * @desc    Get all problems with optional filters (category, difficulty, status)
 * @access  Public / Optional Private
 */
router.get('/', getOptionalUser, async (req, res) => {
  const { category, difficulty, status } = req.query;
  const userId = req.user ? req.user.id : null;

  try {
    let sql = `
      SELECT p.id, p.title, p.slug, p.category, p.difficulty,
             COALESCE(
               (SELECT DISTINCT s.status 
                FROM submissions s 
                WHERE s.problem_id = p.id AND s.user_id = $1 AND s.status = 'Accepted' 
                LIMIT 1),
               (SELECT DISTINCT s.status 
                FROM submissions s 
                WHERE s.problem_id = p.id AND s.user_id = $1 AND s.status != 'Accepted' 
                LIMIT 1),
               'Unsolved'
             ) AS user_status
      FROM problems p
      WHERE 1=1
    `;
    const params = [userId];
    let paramCounter = 2;

    if (category) {
      sql += ` AND p.category = $${paramCounter}`;
      params.push(category);
      paramCounter++;
    }

    if (difficulty) {
      sql += ` AND p.difficulty = $${paramCounter}`;
      params.push(difficulty);
      paramCounter++;
    }

    // Run the query first to filter by status in JS, or wrap in a subquery
    const result = await db.query(sql, params);
    let problems = result.rows;

    if (status) {
      if (status === 'Solved') {
        problems = problems.filter(p => p.user_status === 'Accepted');
      } else if (status === 'Attempted') {
        problems = problems.filter(p => p.user_status !== 'Accepted' && p.user_status !== 'Unsolved');
      } else if (status === 'Unsolved') {
        problems = problems.filter(p => p.user_status === 'Unsolved');
      }
    }

    res.status(200).json({ success: true, count: problems.length, problems });
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

/**
 * @route   GET /api/problems/roadmap
 * @desc    Get structured roadmap of problems grouped by Level 1 to 7
 * @access  Public / Optional Private
 */
router.get('/roadmap', getOptionalUser, async (req, res) => {
  const userId = req.user ? req.user.id : null;

  try {
    const sql = `
      SELECT p.id, p.title, p.slug, p.category, p.difficulty,
             COALESCE(
               (SELECT DISTINCT s.status FROM submissions s WHERE s.problem_id = p.id AND s.user_id = $1 AND s.status = 'Accepted' LIMIT 1),
               (SELECT DISTINCT s.status FROM submissions s WHERE s.problem_id = p.id AND s.user_id = $1 AND s.status != 'Accepted' LIMIT 1),
               'Unsolved'
             ) AS user_status
      FROM problems p
    `;
    const result = await db.query(sql, [userId]);
    const problems = result.rows;

    const levels = [
      { id: 1, title: 'Level 1: Basic Star Patterns', problems: [] },
      { id: 2, title: 'Level 2: Number Patterns', problems: [] },
      { id: 3, title: 'Level 3: Character Patterns', problems: [] },
      { id: 4, title: 'Level 4: Hollow Patterns', problems: [] },
      { id: 5, title: 'Level 5: Pyramids', problems: [] },
      { id: 6, title: 'Level 6: Diamonds', problems: [] },
      { id: 7, title: 'Level 7: Advanced Patterns', problems: [] }
    ];

    problems.forEach(p => {
      const cat = p.category;
      const diff = p.difficulty;
      let targetLevel = 7;

      if (cat.includes('Star') && diff === 'Easy') {
        targetLevel = 1;
      } else if (cat.includes('Number')) {
        targetLevel = 2;
      } else if (cat.includes('Character')) {
        targetLevel = 3;
      } else if (cat.includes('Hollow')) {
        targetLevel = 4;
      } else if (cat.includes('Pyramid') || (cat.includes('Star') && diff === 'Medium')) {
        targetLevel = 5;
      } else if (cat.includes('Diamond')) {
        targetLevel = 6;
      }

      levels[targetLevel - 1].problems.push(p);
    });

    res.status(200).json({ success: true, roadmap: levels });
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

/**
 * @route   GET /api/problems/:slug
 * @desc    Get details of a single problem by slug (including sample test cases)
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const problemQuery = await db.query('SELECT * FROM problems WHERE slug = $1', [slug]);
    if (problemQuery.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    const problem = problemQuery.rows[0];

    // Fetch sample test cases
    const testCasesQuery = await db.query(
      'SELECT input, expected_output FROM test_cases WHERE problem_id = $1 AND is_sample = TRUE',
      [problem.id]
    );

    problem.sample_test_cases = testCasesQuery.rows;

    res.status(200).json({ success: true, problem });
  } catch (error) {
    console.error('Error fetching problem details:', error);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

/**
 * @route   GET /api/problems/:slug/hints
 * @desc    Get hints for a single problem
 * @access  Public
 */
router.get('/:slug/hints', async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await db.query('SELECT hints FROM problems WHERE slug = $1', [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    res.status(200).json({ success: true, hints: result.rows[0].hints || [] });
  } catch (error) {
    console.error('Error fetching hints:', error);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

/**
 * @route   POST /api/problems
 * @desc    Create a new problem along with its test cases
 * @access  Private
 */
router.post('/', [authMiddleware, adminMiddleware], async (req, res) => {
  const {
    title,
    slug,
    description,
    category,
    difficulty,
    constraints,
    input_format,
    output_format,
    hints,
    skeleton_code_json,
    test_cases
  } = req.body;

  // Simple validation
  if (!title || !slug || !description || !category || !difficulty) {
    return res.status(400).json({ success: false, error: 'Missing required problem parameters' });
  }

  try {
    // Insert problem statement
    const problemQuery = await db.query(
      `INSERT INTO problems 
       (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [
        title,
        slug,
        description,
        category,
        difficulty,
        constraints ? JSON.stringify(constraints) : null,
        input_format ? JSON.stringify(input_format) : null,
        output_format ? JSON.stringify(output_format) : null,
        hints ? JSON.stringify(hints) : null,
        skeleton_code_json ? JSON.stringify(skeleton_code_json) : null
      ]
    );

    const newProblem = problemQuery.rows[0];

    // Insert test cases if provided
    if (test_cases && Array.isArray(test_cases)) {
      for (const tc of test_cases) {
        await db.query(
          `INSERT INTO test_cases (problem_id, input, expected_output, is_sample) 
           VALUES ($1, $2, $3, $4)`,
          [
            newProblem.id,
            tc.input,
            tc.expected_output,
            tc.is_sample === true || tc.is_sample === 'true'
          ]
        );
      }
    }

    res.status(201).json({
      success: true,
      message: 'Problem added successfully',
      problem: newProblem
    });
  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(500).json({ success: false, error: 'Database transaction failed: ' + error.message });
  }
});

module.exports = router;
