import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flame, LogOut, Code, User, Sun, Moon, Menu, X, Route } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync theme with DOM document classes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-card px-4 py-3 sm:px-6 border-b border-obsidian-800 dark:border-obsidian-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Branding Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-gold-400 to-amber-600 p-2 rounded-lg text-obsidian-950 group-hover:scale-105 transition-transform">
            <Code className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gradient font-sans">
            PatternCode
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/problems" 
            className={`font-medium transition-colors ${
              isActive('/problems') ? 'text-gold-500' : 'text-obsidian-300 hover:text-gold-400'
            }`}
          >
            Problems
          </Link>
          <Link 
            to="/roadmap" 
            className={`font-medium transition-colors ${
              isActive('/roadmap') ? 'text-gold-500' : 'text-obsidian-300 hover:text-gold-400'
            }`}
          >
            Roadmap
          </Link>
          {user && (
            <Link 
              to="/dashboard" 
              className={`font-medium transition-colors ${
                isActive('/dashboard') ? 'text-gold-500' : 'text-obsidian-300 hover:text-gold-400'
              }`}
            >
              Dashboard
            </Link>
          )}
          {user && user.is_admin && (
            <Link 
              to="/admin/add-problem" 
              className={`font-medium transition-colors ${
                isActive('/admin/add-problem') ? 'text-gold-500' : 'text-obsidian-300 hover:text-gold-400'
              }`}
            >
              Add Problem
            </Link>
          )}
        </div>

        {/* Secondary Header Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-obsidian-800 transition-colors text-obsidian-300 hover:text-gold-400"
            title={theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              {/* Flame Streak Badge */}
              <div 
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-semibold text-sm animate-glow"
                title={`Active Streak: ${user.current_streak} Days`}
              >
                <Flame className="h-4 w-4 fill-amber-500 animate-pulse" />
                <span>{user.current_streak} Days</span>
              </div>

              {/* Profile details */}
              <div className="flex items-center gap-2 pl-2 border-l border-obsidian-800">
                <span className="font-semibold text-sm text-obsidian-200">
                  {user.display_name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-500/10 text-obsidian-400 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-sm font-semibold text-obsidian-300 hover:text-gold-400 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="text-sm font-semibold bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 px-4 py-2 rounded-lg hover:opacity-95 transition-all shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-obsidian-800 text-obsidian-300"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {user && (
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">
              <Flame className="h-3 w-3 fill-amber-500" />
              <span>{user.current_streak}</span>
            </div>
          )}

          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg hover:bg-obsidian-800 text-obsidian-300"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-obsidian-800 flex flex-col gap-3">
          <Link 
            to="/problems" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-obsidian-850 text-obsidian-200 text-sm font-medium"
          >
            Problems
          </Link>
          <Link 
            to="/roadmap" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-obsidian-850 text-obsidian-200 text-sm font-medium"
          >
            Roadmap
          </Link>
          {user && (
            <Link 
              to="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-obsidian-850 text-obsidian-200 text-sm font-medium"
            >
              Dashboard
            </Link>
          )}
          {user && user.is_admin && (
            <Link 
              to="/admin/add-problem" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-obsidian-850 text-obsidian-200 text-sm font-medium"
            >
              Add Problem
            </Link>
          )}
          <hr className="border-obsidian-800" />
          {user ? (
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-sm font-bold text-obsidian-300">{user.display_name}</span>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 px-3 pb-2">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold text-obsidian-200 border border-obsidian-750 rounded-lg hover:bg-obsidian-850"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
