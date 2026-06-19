const { pool, MOCK_STORE } = require('../config/db');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

async function seed() {
  console.log('Starting database seeding...');
  const client = await pool.connect();

  try {
    // 0. Create tables if they don't exist
    console.log('Creating tables from schema.sql...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);

    await client.query('BEGIN');

    // 1. Clean existing data (safe for re-runs)
    console.log('Cleaning existing database tables...');
    await client.query('TRUNCATE TABLE user_badges, badges, submissions, test_cases, problems, users CASCADE;');

    // 2. Seed Badges
    console.log(`Seeding ${MOCK_STORE.badges.length} badges...`);
    const badgeIdMap = {};
    for (const badge of MOCK_STORE.badges) {
      const realBadgeId = randomUUID();
      badgeIdMap[badge.id] = realBadgeId;

      await client.query(
        `INSERT INTO badges (id, code, name, description, icon_url)
         VALUES ($1, $2, $3, $4, $5)`,
        [realBadgeId, badge.code, badge.name, badge.description, badge.icon_url]
      );
    }

    // 3. Seed Problems
    console.log(`Seeding ${MOCK_STORE.problems.length} problems...`);
    const problemSlugToIdMap = {};
    for (const prob of MOCK_STORE.problems) {
      const realProblemId = randomUUID();
      problemSlugToIdMap[prob.slug] = realProblemId;

      await client.query(
        `INSERT INTO problems (
          id, title, slug, description, category, difficulty, 
          constraints, input_format, output_format, hints, skeleton_code_json
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          realProblemId,
          prob.title,
          prob.slug,
          prob.description,
          prob.category,
          prob.difficulty,
          JSON.stringify(prob.constraints),
          JSON.stringify(prob.input_format),
          JSON.stringify(prob.output_format),
          JSON.stringify(prob.hints),
          JSON.stringify(prob.skeleton_code_json)
        ]
      );
    }

    // 4. Seed Test Cases
    console.log(`Seeding ${MOCK_STORE.test_cases.length} test cases...`);
    let testCasesCount = 0;
    for (const tc of MOCK_STORE.test_cases) {
      const problemId = problemSlugToIdMap[tc.problem_slug];
      if (!problemId) {
        console.warn(`Warning: Could not find problem with slug "${tc.problem_slug}" for test case. Skipping.`);
        continue;
      }

      await client.query(
        `INSERT INTO test_cases (id, problem_id, input, expected_output, is_sample)
         VALUES ($1, $2, $3, $4, $5)`,
        [randomUUID(), problemId, tc.input, tc.expected_output, tc.is_sample]
      );
      testCasesCount++;
    }

    await client.query('COMMIT');
    console.log(`Successfully seeded database:`);
    console.log(`- ${MOCK_STORE.badges.length} badges inserted`);
    console.log(`- ${MOCK_STORE.problems.length} problems inserted`);
    console.log(`- ${testCasesCount} test cases inserted`);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error during database seeding. Transaction rolled back:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
