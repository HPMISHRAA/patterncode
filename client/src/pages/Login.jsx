import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Code, ShieldAlert } from 'lucide-react';

export default function Login() {
  const { user, login, loginWithGoogle, error, isMockAuth } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    
    if (!email || !password) {
      return setLocalError('Please fill in all fields.');
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl flex flex-col gap-6 shadow-xl border border-obsidian-850">
        
        {/* Header Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="bg-gradient-to-br from-gold-400 to-amber-600 p-2.5 rounded-xl text-obsidian-950">
            <Code className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-obsidian-100 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-obsidian-400 text-xs">
            Log in to continue building nested loop logic.
          </p>
        </div>

        {/* Mock Auth Mode Warning */}
        {isMockAuth && (
          <div className="p-3 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs leading-relaxed">
            <span className="font-bold">Offline Mock Auth Active:</span> Enter any email/password to log in locally without setting up Firebase.
          </div>
        )}

        {/* Error Feedback Display */}
        {(localError || error) && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-obsidian-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-500" />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="developer@patterncode.com"
                className="w-full bg-obsidian-900 border border-obsidian-800 text-obsidian-100 placeholder-obsidian-600 pl-10 pr-4 py-2.5 rounded-xl focus:border-gold-500 focus:outline-none text-sm transition-all"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-obsidian-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-500" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-obsidian-900 border border-obsidian-800 text-obsidian-100 placeholder-obsidian-600 pl-10 pr-4 py-2.5 rounded-xl focus:border-gold-500 focus:outline-none text-sm transition-all"
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold py-2.5 rounded-xl hover:opacity-95 transition-all text-sm mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-obsidian-500 py-1">
          <hr className="w-1/3 border-obsidian-850" />
          <span>OR</span>
          <hr className="w-1/3 border-obsidian-850" />
        </div>

        {/* OAuth Buttons */}
        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-obsidian-900 border border-obsidian-800 text-obsidian-200 hover:text-gold-400 font-semibold py-2.5 rounded-xl hover:bg-obsidian-850 transition-colors text-sm disabled:opacity-50"
          disabled={loading}
        >
          {/* SVG Google logo */}
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.97 1 12 1 7.35 1 3.37 3.65 1.41 7.52l3.83 2.97C6.18 7.37 8.84 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.43c-.28 1.44-1.09 2.67-2.3 3.49l3.58 2.78c2.1-1.94 3.78-4.8 3.78-8.42z" />
            <path fill="#FBBC05" d="M5.24 10.49c-.25-.76-.39-1.57-.39-2.41s.14-1.65.39-2.41L1.41 4.7C.51 6.51 0 8.52 0 10.68s.51 4.17 1.41 5.98l3.83-2.97c-.25-.76-.39-1.57-.39-2.41z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.58-2.78c-1 .67-2.28 1.07-3.79 1.07-3.16 0-5.82-2.33-6.76-5.45l-3.83 2.97C3.37 20.35 7.35 23 12 23z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-obsidian-400 mt-2">
          New to PatternCode?{' '}
          <Link to="/register" className="font-semibold text-gold-500 hover:text-gold-400">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
