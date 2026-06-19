import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play, Sparkles, Award, Eye, BookOpen, Layers, Terminal } from 'lucide-react';

const CATEGORIES = [
  { name: 'Star Patterns', desc: 'Build shapes using basic loops and print statements.', count: 'Easy-Hard', icon: Sparkles },
  { name: 'Number Patterns', desc: 'Master coordinate logic and arithmetic indexing.', count: 'Easy-Medium', icon: BookOpen },
  { name: 'Character Patterns', desc: 'Utilize character offsets, ASCII codes, and mappings.', count: 'Medium', icon: Layers },
  { name: 'Hollow Patterns', desc: 'Identify boundary conditions and skip print spaces.', count: 'Easy-Medium', icon: Terminal },
  { name: 'Pyramid Patterns', desc: 'Perfect alignment offsets and nested loop math.', count: 'Medium-Hard', icon: Play },
  { name: 'Diamond Patterns', desc: 'Handle symmetric boundaries and mirror row structures.', count: 'Hard', icon: Award }
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 flex flex-col gap-24">
      
      {/* Hero Header Banner */}
      <div className="text-center flex flex-col items-center gap-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-semibold uppercase tracking-wider animate-glow">
          <Sparkles className="h-3 w-3" />
          <span>The Ultimate Loop Logic Trainer</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-sans">
          Master Nested Loops.<br />
          <span className="text-gradient">Level Up Your Logic.</span>
        </h1>
        
        <p className="text-obsidian-300 text-lg leading-relaxed">
          Unlock your programming foundation. Solve hundreds of star, number, character, hollow, and diamond patterns. Test solutions in Python, Java, C++, and C with our online compiler.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">
          <Link 
            to={user ? "/roadmap" : "/register"} 
            className="w-full sm:w-auto text-center px-8 py-3 bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold rounded-xl hover:opacity-95 transition-all shadow-lg hover:scale-[1.01]"
          >
            Start Learning
          </Link>
          <Link 
            to="/problems" 
            className="w-full sm:w-auto text-center px-8 py-3 bg-obsidian-850 hover:bg-obsidian-800 text-obsidian-100 font-bold rounded-xl border border-obsidian-750 transition-colors"
          >
            Browse Problems
          </Link>
        </div>
      </div>

      {/* Feature Spotlights */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
          <div className="bg-gold-500/10 text-gold-500 p-3 rounded-xl w-fit">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-obsidian-100">Pattern Visualizer</h3>
          <p className="text-obsidian-300 text-sm leading-relaxed">
            Struggling to trace loops? View structural row-by-row pattern drawings that show exactly how spaces and symbols compile step by step.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
          <div className="bg-purple-500/10 text-purple-400 p-3 rounded-xl w-fit">
            <Terminal className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-obsidian-100">Online Code Sandbox</h3>
          <p className="text-obsidian-300 text-sm leading-relaxed">
            Write code directly in our editor and test it against compilers in real-time. Instantly trace compiler syntax errors or output offsets.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
          <div className="bg-pink-500/10 text-pink-400 p-3 rounded-xl w-fit">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-obsidian-100">Badges & Streaks</h3>
          <p className="text-obsidian-300 text-sm leading-relaxed">
            Keep your momentum alive! Grow your daily solving streak, unlock glowing master badges, and chart your progress on the levels roadmap.
          </p>
        </div>
      </div>

      {/* Problem Categories Grid */}
      <div className="flex flex-col gap-8">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Explore Problem Categories
          </h2>
          <p className="text-obsidian-400 text-sm mt-1">
            Choose a category to start building your structural code logic.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link 
                key={idx} 
                to={`/problems?category=${encodeURIComponent(cat.name)}`}
                className="glass-card p-6 rounded-xl hover:border-gold-500/30 hover:scale-[1.01] transition-all flex flex-col gap-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="bg-obsidian-850 p-2.5 rounded-lg text-gold-500 border border-obsidian-750 group-hover:bg-gold-500/10 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-obsidian-800 text-obsidian-400">
                    {cat.count}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-obsidian-100 group-hover:text-gold-400 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-obsidian-400 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
