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

  console.log('--- Diagnostic Key Info ---');
  console.log('Raw Key Length:', process.env.FIREBASE_PRIVATE_KEY.length);
  console.log('Raw Key Starts With:', JSON.stringify(process.env.FIREBASE_PRIVATE_KEY.substring(0, 40)));
  console.log('Raw Key Ends With:', JSON.stringify(process.env.FIREBASE_PRIVATE_KEY.substring(process.env.FIREBASE_PRIVATE_KEY.length - 40)));
  console.log('Raw Key literal \\n count:', (process.env.FIREBASE_PRIVATE_KEY.match(/\\n/g) || []).length);
  console.log('Raw Key actual newline count:', (process.env.FIREBASE_PRIVATE_KEY.match(/\n/g) || []).length);

  privateKey = privateKey.replace(/\\n/g, '\n');

  console.log('Processed Key Length:', privateKey.length);
  console.log('Processed Key Starts With:', JSON.stringify(privateKey.substring(0, 40)));
  console.log('Processed Key Ends With:', JSON.stringify(privateKey.substring(privateKey.length - 40)));
  console.log('Processed Key actual newline count:', (privateKey.match(/\n/g) || []).length);
  console.log('---------------------------');
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
