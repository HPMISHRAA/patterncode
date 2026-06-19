const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');
const { executeCode } = require('../services/judge0');
const { processStreakAndBadges } = require('../services/streak');

/** Languages the judge accepts — used to validate request input */
const ALLOWED_LANGUAGES = new Set(['python', 'java', 'cpp', 'c']);
const MAX_CODE_SIZE_BYTES = 50_000; // 50 KB

/**
 * @route   POST /api/submissions/run
 * @desc    Run code against a custom input (with optional expected output lookup)
 * @access  Private
 */
router.post('/run', authMiddleware, async (req, res) => {
  const { code, language, input, problemSlug } = req.body;

  if (!code || !language) {
    return res.status(400).json({ success: false, error: 'Missing code or language parameter' });
  }
  if (!ALLOWED_LANGUAGES.has(language.toLowerCase())) {
    return res.status(400).json({ success: false, error: `Unsupported language. Allowed: ${[...ALLOWED_LANGUAGES].join(', ')}` });
  }
  if (Buffer.byteLength(code, 'utf8') > MAX_CODE_SIZE_BYTES) {
    return res.status(400).json({ success: false, error: 'Code is too large. Maximum size is 50 KB.' });
  }

  try {
    // Try to find expected output for this input so the mock judge can return actual output
    let expectedOutput = '';
    if (problemSlug && input !== undefined) {
      try {
        const probQ = await db.query('SELECT id FROM problems WHERE slug = $1', [problemSlug]);
        if (probQ.rows.length > 0) {
          const tcQ = await db.query(
            'SELECT expected_output FROM test_cases WHERE problem_id = $1 AND input = $2 LIMIT 1',
            [probQ.rows[0].id, String(input).trim()]
          );
          if (tcQ.rows.length > 0) {
            expectedOutput = tcQ.rows[0].expected_output;
          }
        }
      } catch (e) {
        // Non-fatal: just run without expected output lookup
      }
    }

    const runResult = await executeCode(code, language, input || '', expectedOutput);
    res.status(200).json({
      success: true,
      result: {
        status: runResult.status.description,
        stdout: runResult.stdout,
        stderr: runResult.stderr,
        time: runResult.time,
        memory: runResult.memory
      }
    });
  } catch (error) {
    console.error('Code Run Error:', error);
    res.status(500).json({ success: false, error: 'Code execution failed' });
  }
});

/**
 * @route   POST /api/submissions/submit
 * @desc    Submit code to be judged against all test cases, returning per-test-case results
 * @access  Private
 */
router.post('/submit', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { code, language, problemSlug } = req.body;

  if (!code || !language || !problemSlug) {
    return res.status(400).json({ success: false, error: 'Missing required submit parameters' });
  }
  if (!ALLOWED_LANGUAGES.has(language.toLowerCase())) {
    return res.status(400).json({ success: false, error: `Unsupported language. Allowed: ${[...ALLOWED_LANGUAGES].join(', ')}` });
  }
  if (Buffer.byteLength(code, 'utf8') > MAX_CODE_SIZE_BYTES) {
    return res.status(400).json({ success: false, error: 'Code is too large. Maximum size is 50 KB.' });
  }

  try {
    // 1. Fetch the problem details
    const problemQuery = await db.query('SELECT id FROM problems WHERE slug = $1', [problemSlug]);
    if (problemQuery.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }
    const problemId = problemQuery.rows[0].id;

    // 2. Fetch all test cases
    const testCasesQuery = await db.query(
      'SELECT input, expected_output, is_sample FROM test_cases WHERE problem_id = $1',
      [problemId]
    );
    const testCases = testCasesQuery.rows;

    if (testCases.length === 0) {
      return res.status(400).json({ success: false, error: 'No test cases set for this problem' });
    }

    let overallStatus = 'Accepted';
    let maxTime = 0;
    let maxMemory = 0;
    let errorMessage = null;

    // 3. Run solution against ALL test cases and collect per-case results
    const testCaseResults = [];

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const runResult = await executeCode(code, language, tc.input, tc.expected_output);

      maxTime = Math.max(maxTime, runResult.time || 0);
      maxMemory = Math.max(maxMemory, runResult.memory || 0);

      const passed = runResult.status.description === 'Accepted';
      if (!passed && overallStatus === 'Accepted') {
        overallStatus = runResult.status.description;
        errorMessage = runResult.stderr || 'Output mismatch';
      }

      testCaseResults.push({
        index: i + 1,
        passed,
        isSample: tc.is_sample,
        // Always show input; hide expected/actual for hidden test cases on failure
        input: tc.input,
        expected: tc.is_sample || passed ? tc.expected_output : '(Hidden)',
        actual: tc.is_sample || passed ? (runResult.stdout || '') : '(Hidden)',
        status: runResult.status.description,
        time: runResult.time || 0,
        memory: runResult.memory || 0,
        stderr: runResult.stderr || null
      });
    }

    // Convert time to milliseconds for storage
    const executionTimeMs = Math.round(maxTime * 1000);

    // 4. Save submission record to database
    const insertResult = await db.query(
      `INSERT INTO submissions (user_id, problem_id, status, code, language, execution_time_ms, memory_kb, error_message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, created_at`,
      [userId, problemId, overallStatus, code, language, executionTimeMs, maxMemory, errorMessage]
    );

    const submissionId = insertResult.rows[0].id;
    const createdAt = insertResult.rows[0].created_at;

    // 5. If successful, process streaks and check badges
    let streakDetails = null;
    if (overallStatus === 'Accepted') {
      streakDetails = await processStreakAndBadges(userId, problemId);
    }

    const passedCount = testCaseResults.filter(t => t.passed).length;

    res.status(200).json({
      success: true,
      submission: {
        id: submissionId,
        status: overallStatus,
        timeMs: executionTimeMs,
        memoryKb: maxMemory,
        errorMessage,
        passedCount,
        totalCount: testCases.length,
        testCaseResults,
        createdAt
      },
      streak: streakDetails ? {
        currentStreak: streakDetails.currentStreak,
        longestStreak: streakDetails.longestStreak,
        newBadges: streakDetails.newBadgesEarned
      } : null
    });

  } catch (error) {
    console.error('Submission Processing Error:', error);
    res.status(500).json({ success: false, error: 'Database submission log failed' });
  }
});

module.exports = router;
