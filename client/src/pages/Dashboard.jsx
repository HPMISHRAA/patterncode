import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Flame, Award, Star, Gem, Trophy, Calendar, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';

// Map badge code to Lucide Icon components
const BADGE_ICONS = {
  'first_solved': Award,
  'ten_solved': Trophy,
  'star_master': Star,
  'diamond_master': Gem,
  'streak_30': Flame
};

// Colors matching the achievements
const BADGE_COLORS = {
  'first_solved': 'from-blue-500 to-indigo-600 shadow-blue-500/10',
  'ten_solved': 'from-amber-400 to-yellow-600 shadow-amber-500/10',
  'star_master': 'from-yellow-400 to-orange-500 shadow-orange-500/10',
  'diamond_master': 'from-cyan-400 to-blue-500 shadow-cyan-500/10',
  'streak_30': 'from-red-500 to-orange-600 shadow-red-500/10'
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        if (response.data.success) {
          setData(response.data.stats);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center text-gold-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500 mr-2"></div>
        <span>Loading stats...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-grow flex items-center justify-center text-red-400 p-6">
        <span>{error || 'An unexpected error occurred.'}</span>
      </div>
    );
  }

  const { totalSolved, categoryBreakdown, difficultyBreakdown, streaks, earnedBadges, recentSubmissions } = data;

  // Compile difficulty counts for visual representation
  const diffs = { 'Easy': 0, 'Medium': 0, 'Hard': 0 };
  difficultyBreakdown.forEach(row => {
    diffs[row.difficulty] = parseInt(row.count);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8 w-full">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-obsidian-50 tracking-tight font-sans">
          Dashboard
        </h1>
        <p className="text-obsidian-400 text-sm mt-1">
          Monitor your loops mastery, achievements, and active streaks.
        </p>
      </div>

      {/* Grid: Streaks and Solved Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Solved Count Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">
            Problems Solved
          </span>
          <div className="my-4">
            <span className="text-5xl font-black text-gradient font-sans">
              {totalSolved}
            </span>
          </div>
          <Link 
            to="/problems" 
            className="text-xs font-semibold text-gold-500 hover:text-gold-400 flex items-center gap-1 mt-2 group w-fit"
          >
            <span>Solve more problems</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Current Streak Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-l-2 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">
              Current Streak
            </span>
            <Flame className="h-5 w-5 text-amber-500 fill-amber-500 animate-pulse" />
          </div>
          <div className="my-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-amber-500 font-sans">
              {streaks.current}
            </span>
            <span className="text-sm font-bold text-obsidian-400">days</span>
          </div>
          <span className="text-xs text-obsidian-500">
            {streaks.lastSolvedAt 
              ? `Last submission: ${new Date(streaks.lastSolvedAt).toLocaleDateString()}` 
              : 'Submit code today to start your streak!'}
          </span>
        </div>

        {/* Longest Streak Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border-l-2 border-l-gold-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">
              Longest Streak
            </span>
            <Trophy className="h-5 w-5 text-gold-500" />
          </div>
          <div className="my-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-gold-500 font-sans">
              {streaks.longest}
            </span>
            <span className="text-sm font-bold text-obsidian-400">days</span>
          </div>
          <span className="text-xs text-obsidian-500">
            Your personal record streak length.
          </span>
        </div>
      </div>

      {/* Grid: Solved Breakdown & Unlocked Achievements */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Side: Stats Breakdown */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Difficulty breakdown */}
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-bold text-base text-obsidian-150">Difficulty Stats</h3>
            <div className="flex flex-col gap-3">
              {/* Easy */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-green-500">Easy</span>
                  <span className="text-obsidian-300">{diffs['Easy']} Solved</span>
                </div>
                <div className="h-2 w-full bg-obsidian-850 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${totalSolved > 0 ? (diffs['Easy'] / totalSolved) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Medium */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-amber-500">Medium</span>
                  <span className="text-obsidian-300">{diffs['Medium']} Solved</span>
                </div>
                <div className="h-2 w-full bg-obsidian-850 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${totalSolved > 0 ? (diffs['Medium'] / totalSolved) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Hard */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-red-500">Hard</span>
                  <span className="text-obsidian-300">{diffs['Hard']} Solved</span>
                </div>
                <div className="h-2 w-full bg-obsidian-850 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full" 
                    style={{ width: `${totalSolved > 0 ? (diffs['Hard'] / totalSolved) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-bold text-base text-obsidian-150">Category breakdown</h3>
            {categoryBreakdown.length === 0 ? (
              <p className="text-xs text-obsidian-500">No categories solved yet.</p>
            ) : (
              <div className="flex flex-col gap-3.5">
                {categoryBreakdown.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-obsidian-300">{cat.category}</span>
                    <span className="font-bold text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded">
                      {cat.count} Solved
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Unlocked Badges */}
        <div className="lg:col-span-8 glass-card p-6 rounded-2xl flex flex-col gap-6">
          <div>
            <h3 className="font-bold text-base text-obsidian-150">Unlocked Badges</h3>
            <p className="text-xs text-obsidian-400 mt-0.5">Collect achievements as you master advanced patterns.</p>
          </div>

          {earnedBadges.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center p-8 border border-dashed border-obsidian-800 rounded-xl text-center">
              <Award className="h-10 w-10 text-obsidian-700 mb-2" />
              <h4 className="font-bold text-sm text-obsidian-300">No badges earned yet</h4>
              <p className="text-xs text-obsidian-500 mt-1 max-w-xs">Submit a correct pattern printing solution to unlock your first badge!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {earnedBadges.map((badge, idx) => {
                const IconComponent = BADGE_ICONS[badge.code] || Award;
                const gradient = BADGE_COLORS[badge.code] || 'from-gold-400 to-amber-600';
                return (
                  <div 
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-obsidian-900 border border-obsidian-800/80 hover:border-gold-500/20 transition-colors"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-obsidian-950 shadow-md shrink-0`}>
                      <IconComponent className="h-5 w-5 fill-current" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-obsidian-100">{badge.name}</span>
                      <span className="text-xs text-obsidian-400 mt-0.5 leading-relaxed">{badge.description}</span>
                      <span className="text-[10px] text-obsidian-600 mt-2 font-mono">
                        Unlocked {new Date(badge.earned_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Submissions Section */}
      <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
        <h3 className="font-bold text-base text-obsidian-150">Recent Submissions</h3>
        
        {recentSubmissions.length === 0 ? (
          <p className="text-xs text-obsidian-500 text-center py-6">
            No submissions recorded yet.{' '}
            <Link to="/problems" className="text-gold-500 hover:underline">
              Browse problems
            </Link>{' '}
            to make your first submission.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-obsidian-850 text-xs text-obsidian-400">
                  <th className="py-2.5 font-semibold">Problem</th>
                  <th className="py-2.5 font-semibold">Language</th>
                  <th className="py-2.5 font-semibold">Status</th>
                  <th className="py-2.5 font-semibold text-right">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((sub, idx) => (
                  <tr key={idx} className="border-b border-obsidian-900 last:border-none text-sm hover:bg-obsidian-900/40">
                    <td className="py-3">
                      <Link to={`/problems/${sub.slug}`} className="font-bold text-obsidian-250 hover:text-gold-400 transition-colors">
                        {sub.title}
                      </Link>
                    </td>
                    <td className="py-3 capitalize text-xs font-mono text-obsidian-450">{sub.language}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${
                        sub.status === 'Accepted' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {sub.status === 'Accepted' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-obsidian-500 text-right">
                      {new Date(sub.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
