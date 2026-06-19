import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "MOCK_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-auth-domain.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-bucket.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "0000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:00000:web:mockid"
};

let app;
let auth;
let googleProvider;
let isMockAuth = false;

// Check if credentials are mock/blank
if (firebaseConfig.apiKey === "MOCK_KEY" || !import.meta.env.VITE_FIREBASE_API_KEY) {
  console.log("Firebase config is blank or mock. Enabling Mock Auth Mode on the client.");
  isMockAuth = true;
} else {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error("Firebase client SDK initialization failed:", error);
    isMockAuth = true;
  }
}

export {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  isMockAuth
};
