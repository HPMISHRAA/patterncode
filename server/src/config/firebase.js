const admin = require('firebase-admin');
require('dotenv').config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : null;

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
