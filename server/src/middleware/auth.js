const { admin, isMock } = require('../config/firebase');
const db = require('../config/db');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    let decodedToken;

    if (isMock && (token.startsWith('mock-token-') || token === 'mock-token')) {
      // Decode a developer bypass mock token
      const uidSuffix = token.split('mock-token-')[1] || 'default-dev';
      decodedToken = {
        uid: `mock-uid-${uidSuffix}`,
        email: `${uidSuffix}@patterncode.com`,
        name: `${uidSuffix.charAt(0).toUpperCase() + uidSuffix.slice(1)} Dev`
      };
    } else {
      // Verify actual Firebase ID token
      decodedToken = await admin.auth().verifyIdToken(token);
    }

    // Find or synchronize the user inside PostgreSQL
    let userQuery = await db.query('SELECT * FROM users WHERE firebase_uid = $1', [decodedToken.uid]);

    if (userQuery.rows.length === 0) {
      // If they exist in Firebase but not in our DB, create them on the fly
      const name = decodedToken.name || decodedToken.email.split('@')[0];
      const insertQuery = await db.query(
        'INSERT INTO users (firebase_uid, email, display_name) VALUES ($1, $2, $3) RETURNING *',
        [decodedToken.uid, decodedToken.email, name]
      );
      userQuery = insertQuery;
    }

    // Bind user to request
    req.user = userQuery.rows[0];
    next();
  } catch (error) {
    console.error('Auth Middleware Verification Error:', error);
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
  }
};
