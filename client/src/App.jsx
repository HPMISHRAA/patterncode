import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import Roadmap from './pages/Roadmap';
import AdminAddProblem from './pages/AdminAddProblem';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-gold-500 font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-4"></div>
        <p className="text-obsidian-300 font-medium tracking-wide">Syncing Session...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// Admin Route Wrapper Component
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-gold-500 font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-4"></div>
        <p className="text-obsidian-300 font-medium tracking-wide">Syncing Session...</p>
      </div>
    );
  }

  return user && user.is_admin ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-obsidian-950 bg-dot-grid text-obsidian-100 flex flex-col font-sans select-none antialiased">
          {/* Main Navigation Header */}
          <Navbar />

          {/* Route Content Area */}
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/problems" element={<ProblemList />} />
              
              <Route path="/problems/:slug" element={
                <ProtectedRoute>
                  <ProblemDetail />
                </ProtectedRoute>
              } />

              <Route path="/roadmap" element={<Roadmap />} />

              <Route path="/admin/add-problem" element={
                <AdminRoute>
                  <AdminAddProblem />
                </AdminRoute>
              } />

              {/* Redirect any unknown route to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer branding */}
          <Footer />
        </div>
        <Analytics />
      </Router>
    </AuthProvider>
  );
}

export default App;
