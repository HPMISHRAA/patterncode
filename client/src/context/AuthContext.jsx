import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  isMockAuth 
} from '../utils/firebase';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync Firebase user with PostgreSQL database
  const syncUserWithBackend = async (firebaseUser, token) => {
    try {
      localStorage.setItem('token', token);
      const response = await api.post('/auth/sync');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error('Error syncing user with backend database:', err);
      setError('Failed to synchronize user session with the database.');
    }
  };

  useEffect(() => {
    if (isMockAuth) {
      // Mock Auth loading logic
      const savedToken = localStorage.getItem('token');
      if (savedToken && savedToken.startsWith('mock-token-')) {
        const username = savedToken.split('mock-token-')[1];
        const isAdmin = username.toLowerCase().includes('admin') || username.toLowerCase().includes('dev');
        setUser({
          id: 'dev-db-id',
          firebase_uid: `mock-uid-${username}`,
          email: `${username}@patterncode.com`,
          display_name: `${username.charAt(0).toUpperCase() + username.slice(1)} Developer`,
          current_streak: 3,
          longest_streak: 5,
          is_admin: isAdmin
        });
      }
      setLoading(false);
      return;
    }

    // Standard Firebase Auth Listener
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          await syncUserWithBackend(firebaseUser, token);
        } catch (err) {
          console.error('Failed to retrieve authentication token:', err);
        }
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Authentication trigger functions
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      if (isMockAuth) {
        const username = email.split('@')[0];
        const token = `mock-token-${username}`;
        await syncUserWithBackend(null, token);
        setLoading(false);
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Authentication failed. Please verify credentials.');
      setLoading(false);
      throw err;
    }
  };

  const register = async (email, password, displayName) => {
    setError(null);
    setLoading(true);
    try {
      if (isMockAuth) {
        const username = email.split('@')[0];
        const token = `mock-token-${username}`;
        // Create user inline
        localStorage.setItem('token', token);
        const response = await api.post('/auth/sync');
        if (response.data.success) {
          setUser(response.data.user);
        }
        setLoading(false);
        return;
      }
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      // Wait for token synchronization
      const token = await credential.user.getIdToken();
      localStorage.setItem('token', token);
      await api.post('/auth/sync');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Try again.');
      setLoading(false);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      if (isMockAuth) {
        const token = 'mock-token-googleuser';
        await syncUserWithBackend(null, token);
        setLoading(false);
        return;
      }
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError(err.message || 'Google authentication failed.');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isMockAuth) {
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
        return;
      }
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      console.error('Sign-out error:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    isMockAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
