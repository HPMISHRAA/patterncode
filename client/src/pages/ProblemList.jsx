import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Search, SlidersHorizontal, CheckCircle2, Circle, HelpCircle } from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Star Patterns',
  'Number Patterns',
  'Character Patterns',
  'Hollow Patterns',
  'Pyramid Patterns',
  'Diamond Patterns'
];

const DIFFICULTIES = ['All Difficulties', 'Easy', 'Medium', 'Hard'];
const STATUSES = ['All Statuses', 'Solved', 'Attempted', 'Unsolved'];

export default function ProblemList() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read URL query params
  const categoryFilter = searchParams.get('category') || 'All Categories';
  const difficultyFilter = searchParams.get('difficulty') || 'All Difficulties';
  const statusFilter = searchParams.get('status') || 'All Statuses';
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const params = {};
        if (categoryFilter !== 'All Categories') params.category = categoryFilter;
        if (difficultyFilter !== 'All Difficulties') params.difficulty = difficultyFilter;
        if (statusFilter !== 'All Statuses') params.status = statusFilter;

        const response = await api.get('/problems', { params });
        if (response.data.success) {
          setProblems(response.data.problems);
        }
      } catch (err) {
        console.error('Error fetching problems:', err);
        setError('Failed to fetch problems from database.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [categoryFilter, difficultyFilter, statusFilter]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value.startsWith('All ')) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Local filtering for searches
  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8 w-full">
      
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-obsidian-50 tracking-tight font-sans">
          Problems
        </h1>
        <p className="text-obsidian-400 text-sm mt-1">
          Select a pattern, choose your programming language, and compile your loops logic.
        </p>
      </div>

      {/* Filter Options Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between glass-card p-4 rounded-xl">
        {/* Search Search */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search problems..."
            className="w-full bg-obsidian-900 border border-obsidian-850 text-obsidian-100 placeholder-obsidian-650 pl-9 pr-4 py-2 rounded-lg text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          
          {/* Category Dropdown */}
          <select 
            value={categoryFilter}
            onChange={e => handleFilterChange('category', e.target.value)}
            className="bg-obsidian-900 border border-obsidian-850 text-obsidian-200 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none focus:border-gold-500"
          >
            {CATEGORIES.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Difficulty Dropdown */}
          <select 
            value={difficultyFilter}
            onChange={e => handleFilterChange('difficulty', e.target.value)}
            className="bg-obsidian-900 border border-obsidian-850 text-obsidian-200 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none focus:border-gold-500"
          >
            {DIFFICULTIES.map((diff, idx) => (
              <option key={idx} value={diff}>{diff}</option>
            ))}
          </select>

          {/* Status Dropdown (only visible when logged in) */}
          {user && (
            <select 
              value={statusFilter}
              onChange={e => handleFilterChange('status', e.target.value)}
              className="bg-obsidian-900 border border-obsidian-850 text-obsidian-200 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none focus:border-gold-500"
            >
              {STATUSES.map((stat, idx) => (
                <option key={idx} value={stat}>{stat}</option>
              ))}
            </select>
          )}

        </div>
      </div>

      {/* Main Problems Table */}
      <div className="glass-card rounded-2xl p-6 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gold-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500 mr-2"></div>
            <span>Fetching problems...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            <span>{error}</span>
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="text-center py-20 text-obsidian-550 flex flex-col items-center">
            <HelpCircle className="h-10 w-10 text-obsidian-750 mb-2" />
            <h4 className="font-bold text-sm text-obsidian-300">No patterns found</h4>
            <p className="text-xs text-obsidian-500 mt-1">Try relaxing your category or difficulty filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-obsidian-850 text-xs text-obsidian-450 uppercase tracking-widest font-semibold">
                  <th className="pb-3 w-10">Status</th>
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((prob) => {
                  let statusIcon = <Circle className="h-4 w-4 text-obsidian-700" />;
                  if (prob.user_status === 'Accepted') {
                    statusIcon = <CheckCircle2 className="h-4 w-4 text-green-500 fill-green-500/10" />;
                  } else if (prob.user_status !== 'Unsolved') {
                    statusIcon = (
                      <div className="h-4 w-4 rounded-full border border-amber-500 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                      </div>
                    );
                  }

                  return (
                    <tr 
                      key={prob.id} 
                      className="border-b border-obsidian-900 last:border-none hover:bg-obsidian-900/30 transition-colors"
                    >
                      <td className="py-4">{statusIcon}</td>
                      <td className="py-4">
                        <Link 
                          to={`/problems/${prob.slug}`} 
                          className="font-bold text-obsidian-200 hover:text-gold-500 transition-colors text-sm sm:text-base"
                        >
                          {prob.title}
                        </Link>
                      </td>
                      <td className="py-4">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-obsidian-850 border border-obsidian-750 text-obsidian-400">
                          {prob.category}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`text-xs font-extrabold uppercase tracking-wider ${
                          prob.difficulty === 'Easy' ? 'text-green-500' :
                          prob.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
