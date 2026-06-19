import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Sparkles, Plus, Trash2, ArrowLeft, Check, AlertCircle, FileCode } from 'lucide-react';

const CATEGORIES = [
  'Star Patterns',
  'Number Patterns',
  'Character Patterns',
  'Hollow Patterns',
  'Pyramid Patterns',
  'Diamond Patterns',
  'Advanced Patterns'
];

const DEFAULT_TEMPLATES = {
  python: `def print_pattern(n):
    # Write your code here
    pass

if __name__ == '__main__':
    n = int(input().strip())
    print_pattern(n)`,

  java: `import java.util.Scanner;

public class Solution {
    public static void printPattern(int n) {
        // Write your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            printPattern(n);
        }
    }
}`,

  cpp: `#include <iostream>
using namespace std;

void printPattern(int n) {
    // Write your code here
}

int main() {
    int n;
    if (cin >> n) {
        printPattern(n);
    }
    return 0;
}`,

  c: `#include <stdio.h>

void printPattern(int n) {
    // Write your code here
}

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        printPattern(n);
    }
    return 0;
}`
};

export default function AdminAddProblem() {
  const navigate = useNavigate();

  // Core metadata state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [description, setDescription] = useState('');

  // Constraints & formats
  const [minN, setMinN] = useState(1);
  const [maxN, setMaxN] = useState(20);
  const [inputFormat, setInputFormat] = useState('A single integer N.');
  const [outputFormat, setOutputFormat] = useState('Print the pattern configuration.');

  // Hints (array of strings)
  const [hints, setHints] = useState(['']);

  // Skeleton Code Templates
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [activeLangTab, setActiveLangTab] = useState('python');

  // Test Cases
  const [testCases, setTestCases] = useState([
    { input: '3', expected_output: '', is_sample: true },
    { input: '4', expected_output: '', is_sample: false }
  ]);

  // Form submission / UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    // Convert to lowercase, replace non-alphanumeric with hyphen
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(autoSlug);
  };

  // Manage Hints
  const handleAddHint = () => setHints([...hints, '']);
  const handleRemoveHint = (idx) => {
    const updated = hints.filter((_, i) => i !== idx);
    setHints(updated.length > 0 ? updated : ['']);
  };
  const handleHintChange = (idx, val) => {
    const updated = [...hints];
    updated[idx] = val;
    setHints(updated);
  };

  // Manage Skeleton Templates
  const handleTemplateChange = (val) => {
    setTemplates({
      ...templates,
      [activeLangTab]: val
    });
  };

  // Manage Test Cases
  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '5', expected_output: '', is_sample: false }]);
  };
  const handleRemoveTestCase = (idx) => {
    const updated = testCases.filter((_, i) => i !== idx);
    setTestCases(updated.length > 0 ? updated : [{ input: '3', expected_output: '', is_sample: true }]);
  };
  const handleTestCaseChange = (idx, field, val) => {
    const updated = [...testCases];
    updated[idx] = {
      ...updated[idx],
      [field]: val
    };
    setTestCases(updated);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Filter out empty hints
    const cleanHints = hints.filter(h => h.trim() !== '');

    // Form payload
    const payload = {
      title,
      slug,
      description,
      category,
      difficulty,
      constraints: { min_n: parseInt(minN) || 1, max_n: parseInt(maxN) || 20 },
      input_format: { type: 'integer', description: inputFormat },
      output_format: { type: 'string', description: outputFormat },
      hints: cleanHints,
      skeleton_code_json: templates,
      test_cases: testCases.filter(tc => tc.expected_output.trim() !== '')
    };

    if (payload.test_cases.length === 0) {
      setError('You must define at least one valid test case with an expected output.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/problems', payload);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/problems/' + slug);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to submit problem to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8 w-full">
      {/* Header and Back Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/problems')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-obsidian-450 hover:text-obsidian-250 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Problems</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3 w-3" />
          <span>Creator Console</span>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-obsidian-50 tracking-tight font-sans">
          Create Loop Pattern Problem
        </h1>
        <p className="text-obsidian-400 text-sm mt-1">
          Add a new pattern logic problem. Design description, Hints, Skeleton code templates, and test cases.
        </p>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 flex items-center gap-2 text-sm font-medium">
          <Check className="h-5 w-5 shrink-0" />
          <span>Problem added successfully! Redirecting to workspace...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2 text-sm font-medium">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Admin Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* SECTION 1: CORE METADATA */}
        <div className="glass-card p-6 rounded-2xl border border-obsidian-850 flex flex-col gap-6">
          <h3 className="font-extrabold text-lg text-obsidian-100">1. Problem Metadata</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Problem Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Hollow Diamond"
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Slug Identifier</label>
              <input
                type="text"
                required
                value={slug}
                onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="hollow-diamond"
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Difficulty</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs font-bold text-obsidian-400 uppercase">Problem Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the pattern details. Specify what symbols to print and what parameter N controls."
              className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* SECTION 2: SPECIFICATIONS */}
        <div className="glass-card p-6 rounded-2xl border border-obsidian-850 flex flex-col gap-6">
          <h3 className="font-extrabold text-lg text-obsidian-100">2. Input, Output & Constraints</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Min N Limit</label>
              <input
                type="number"
                value={minN}
                onChange={e => setMinN(e.target.value)}
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Max N Limit</label>
              <input
                type="number"
                value={maxN}
                onChange={e => setMaxN(e.target.value)}
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Input Format Description</label>
              <input
                type="text"
                value={inputFormat}
                onChange={e => setInputFormat(e.target.value)}
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-obsidian-400 uppercase">Output Format Description</label>
              <input
                type="text"
                value={outputFormat}
                onChange={e => setOutputFormat(e.target.value)}
                className="bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: HINTS ACCORDION */}
        <div className="glass-card p-6 rounded-2xl border border-obsidian-850 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-obsidian-100">3. Progressive Hints</h3>
            <button
              type="button"
              onClick={handleAddHint}
              className="inline-flex items-center gap-1 text-xs font-bold text-gold-500 hover:text-gold-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Hint</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {hints.map((hint, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs font-bold text-obsidian-500 shrink-0">#{idx + 1}</span>
                <input
                  type="text"
                  value={hint}
                  onChange={e => handleHintChange(idx, e.target.value)}
                  placeholder={`Hint #${idx + 1} advice...`}
                  className="flex-grow bg-obsidian-900 border border-obsidian-850 rounded-xl p-3 outline-none text-obsidian-200 text-sm focus:border-gold-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHint(idx)}
                  className="p-2 text-obsidian-550 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: SKELETON CODES */}
        <div className="glass-card p-6 rounded-2xl border border-obsidian-850 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-extrabold text-lg text-obsidian-100">4. Skeleton Codes</h3>
            <p className="text-xs text-obsidian-450">Set up standard template driver code that reads N from standard input for each language.</p>
          </div>

          {/* Languages tabs */}
          <div className="flex border-b border-obsidian-850 text-xs font-bold shrink-0">
            {['python', 'java', 'cpp', 'c'].map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLangTab(lang)}
                className={`px-4 py-2.5 border-b-2 transition-all uppercase ${
                  activeLangTab === lang ? 'border-gold-500 text-gold-500 font-extrabold' : 'border-transparent text-obsidian-450 hover:text-obsidian-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 font-mono">
            <textarea
              rows={10}
              value={templates[activeLangTab]}
              onChange={e => handleTemplateChange(e.target.value)}
              className="w-full bg-obsidian-950/40 border border-obsidian-850 rounded-xl p-4 outline-none text-gold-100 font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* SECTION 5: TEST CASES */}
        <div className="glass-card p-6 rounded-2xl border border-obsidian-850 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-extrabold text-lg text-obsidian-100">5. Validation Test Cases</h3>
              <p className="text-xs text-obsidian-450">Submit inputs and expected output drawings (lines separated by newlines).</p>
            </div>
            <button
              type="button"
              onClick={handleAddTestCase}
              className="inline-flex items-center gap-1 text-xs font-bold text-gold-500 hover:text-gold-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Case</span>
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {testCases.map((tc, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-4 bg-obsidian-900/40 border border-obsidian-850 rounded-xl relative">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-500">Test Case #{idx + 1}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-obsidian-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tc.is_sample}
                        onChange={e => handleTestCaseChange(idx, 'is_sample', e.target.checked)}
                        className="rounded border-obsidian-800 text-gold-500 focus:ring-0 focus:ring-offset-0 bg-obsidian-950"
                      />
                      <span>Sample Case</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleRemoveTestCase(idx)}
                      className="text-obsidian-550 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-obsidian-450 uppercase">Input Value N</label>
                    <input
                      type="text"
                      required
                      value={tc.input}
                      onChange={e => handleTestCaseChange(idx, 'input', e.target.value)}
                      placeholder="e.g. 3"
                      className="bg-obsidian-900 border border-obsidian-850 rounded-lg p-2.5 outline-none text-obsidian-200 text-xs focus:border-gold-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-obsidian-450 uppercase">Expected Output Drawing</label>
                    <textarea
                      required
                      rows={3}
                      value={tc.expected_output}
                      onChange={e => handleTestCaseChange(idx, 'expected_output', e.target.value)}
                      placeholder="e.g.&#10;*&#10;**&#10;***"
                      className="bg-obsidian-950 border border-obsidian-850 rounded-lg p-2.5 outline-none text-gold-450 text-xs focus:border-gold-500 font-mono resize-none leading-none"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold py-3.5 rounded-xl hover:opacity-95 transition-all text-sm shadow-lg hover:scale-[1.005] disabled:opacity-50"
        >
          {loading ? 'Creating Problem...' : 'Publish Pattern Problem'}
        </button>

      </form>
    </div>
  );
}
