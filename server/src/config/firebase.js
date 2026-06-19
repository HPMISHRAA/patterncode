const admin = require('firebase-admin');
require('dotenv').config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) {
  privateKey = privateKey.trim();
  // Strip surrounding quotes if present (common issue in cloud providers)
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.substring(1, privateKey.length - 1);
  }
  if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
    privateKey = privateKey.substring(1, privateKey.length - 1);
  }
  privateKey = privateKey.replace(/\\n/g, '\n');
}

let isMock = false;

if (projectId && clientEmail && privateKey && !projectId.startsWith('mock-')) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin initialization failed. Running with Mock Auth fallback.', error);
    isMock = true;
  }
} else {
  console.log('Firebase credentials missing or mock. Running with Mock Auth fallback.');
  isMock = true;
}

module.exports = {
  admin,
  isMock
};
