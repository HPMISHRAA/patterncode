import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { CheckCircle, Circle, Play, Award, Sparkles } from 'lucide-react';

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await api.get('/problems/roadmap');
        if (response.data.success) {
          setRoadmap(response.data.roadmap);
        }
      } catch (err) {
        console.error('Error fetching roadmap:', err);
        setError('Failed to load roadmap.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center text-gold-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500 mr-2"></div>
        <span>Loading roadmap path...</span>
      </div>
    );
  }

  if (error || roadmap.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center text-red-400 p-6">
        <span>{error || 'No levels found in roadmap.'}</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-12 w-full">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-2">
        <div className="bg-gradient-to-br from-gold-400 to-amber-600 p-2.5 rounded-xl text-obsidian-950 w-fit">
          <Sparkles className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-extrabold text-obsidian-50 tracking-tight font-sans mt-2">
          Learning Roadmap
        </h1>
        <p className="text-obsidian-400 text-sm">
          Follow this structured 7-level journey to master nested loop patterns from basic stars to mathematical spirals.
        </p>
      </div>

      {/* Levels Pathway Vertical Stack */}
      <div className="relative flex flex-col gap-10 pl-6 sm:pl-8">
        
        {/* Pathway Connecting Line */}
        <div className="absolute left-[29px] sm:left-[37px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold-500 via-amber-500 to-obsidian-800"></div>

        {roadmap.map((level, index) => {
          const solvedProblems = level.problems.filter(p => p.user_status === 'Accepted').length;
          const totalProblems = level.problems.length;
          const isCompleted = totalProblems > 0 && solvedProblems === totalProblems;
          const isActive = totalProblems > 0;

          return (
            <div key={level.id} className="relative flex gap-6 group">
              
              {/* Level Circle Node Indicator */}
              <div className="z-10 shrink-0">
                {isCompleted ? (
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-500 border border-green-400 flex items-center justify-center text-obsidian-950 font-bold shadow-lg shadow-green-500/20">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                ) : (
                  <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                    solvedProblems > 0 
                      ? 'bg-gold-500/10 border-gold-500 text-gold-500 shadow-md shadow-gold-500/10'
                      : 'bg-obsidian-900 border-obsidian-800 text-obsidian-500'
                  }`}>
                    <span className="text-xs sm:text-sm">{level.id}</span>
                  </div>
                )}
              </div>

              {/* Level Details Card */}
              <div className="flex-grow glass-card p-5 sm:p-6 rounded-2xl border border-obsidian-850 hover:border-gold-500/25 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-obsidian-850 pb-3">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-obsidian-100 group-hover:text-gold-400 transition-colors">
                      {level.title}
                    </h3>
                    <span className="text-xs text-obsidian-450 uppercase tracking-widest font-semibold mt-0.5 block">
                      Solve logic & coordinates
                    </span>
                  </div>
                  
                  {/* Progress Indicator */}
                  {totalProblems > 0 ? (
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-xs font-bold text-obsidian-300">
                        {solvedProblems}/{totalProblems} Solved
                      </span>
                      <div className="h-1.5 w-24 bg-obsidian-850 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gold-500 to-amber-500 rounded-full"
                          style={{ width: `${(solvedProblems / totalProblems) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-obsidian-500 italic shrink-0">Coming Soon</span>
                  )}
                </div>

                {/* Level Problems List */}
                {level.problems.length > 0 ? (
                  <div className="flex flex-col gap-2 mt-4">
                    {level.problems.map((prob) => (
                      <Link
                        key={prob.id}
                        to={`/problems/${prob.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-obsidian-900/60 border border-obsidian-850 hover:border-obsidian-750 text-sm font-medium hover:bg-obsidian-900 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          {prob.user_status === 'Accepted' ? (
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          ) : prob.user_status !== 'Unsolved' ? (
                            <div className="h-4 w-4 rounded-full border border-amber-500 flex items-center justify-center shrink-0">
                              <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            </div>
                          ) : (
                            <Circle className="h-4 w-4 text-obsidian-600 shrink-0" />
                          )}
                          <span className="text-obsidian-200 font-bold hover:text-gold-400">
                            {prob.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-obsidian-800 text-obsidian-450 border border-obsidian-750">
                            {prob.category}
                          </span>
                          <span className={`text-[10px] font-bold uppercase ${
                            prob.difficulty === 'Easy' ? 'text-green-500' :
                            prob.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'
                          }`}>
                            {prob.difficulty}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-obsidian-500 mt-3 italic">
                    Level expansion in development.
                  </p>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
