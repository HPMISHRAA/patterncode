import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { splitSkeletonCode, buildFullCode } from '../utils/codeTemplate';
import {
  Play, Send, HelpCircle, Eye, Code2, AlertTriangle, CheckCircle,
  CheckCircle2, XCircle, Sparkles, Flame, Award, Trophy, ChevronDown,
  ChevronRight, Clock, Cpu, Lock
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Small helper: coloured difficulty badge
───────────────────────────────────────────── */
function DiffBadge({ difficulty }) {
  const col =
    difficulty === 'Easy' ? 'text-green-500' :
    difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500';
  return (
    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-obsidian-850 ${col}`}>
      {difficulty}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Test-case result item (LeetCode-style card)
───────────────────────────────────────────── */
function TestCaseCard({ tc, isActive, onClick }) {
  const passed = tc.passed;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
        isActive
          ? passed
            ? 'bg-green-500/15 border-green-500/30 text-green-400'
            : 'bg-red-500/15 border-red-500/30 text-red-400'
          : 'bg-obsidian-900/40 border-obsidian-800 text-obsidian-400 hover:border-obsidian-700'
      }`}
    >
      {passed
        ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
        : <XCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />}
      <span>Case {tc.index}</span>
      {!tc.isSample && <Lock className="h-3 w-3 text-obsidian-600" />}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function ProblemDetail() {
  const { slug } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Editor state ──
  const [language, setLanguage] = useState('java');
  // Split code parts: prefix (hidden top), userCode (editable), suffix (hidden bottom)
  const [codeParts, setCodeParts] = useState({ prefix: '', userCode: '', suffix: '' });
  const textareaRef = useRef(null);

  // ── Custom run input ──
  const [customInput, setCustomInput] = useState('');

  // ── Console/result state ──
  const [consoleTab, setConsoleTab] = useState('testcases'); // 'testcases' | 'result'
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState(0); // which test case card is selected

  // ── Left panel tabs ──
  const [leftTab, setLeftTab] = useState('description');
  const [activeHintIndex, setActiveHintIndex] = useState(0);
  const [visualizerRow, setVisualizerRow] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Achievement modal ──
  const [showModal, setShowModal] = useState(false);

  // ── Resizable panel state ──
  const [editorHeightPct, setEditorHeightPct] = useState(60); // percent of right panel
  const rightPanelRef = useRef(null);
  const isDraggingRef = useRef(false);

  /* ── Fetch problem ── */
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/problems/${slug}`);
        if (response.data.success) {
          const prob = response.data.problem;
          setProblem(prob);
          // Split skeleton for default language (java)
          const full = prob.skeleton_code_json?.[language] || '';
          setCodeParts(splitSkeletonCode(full, language));
        }
      } catch (err) {
        console.error('Error fetching problem:', err);
        setError('Problem not found or database error.');
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [slug]);

  /* ── Language change ── */
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (problem?.skeleton_code_json?.[lang]) {
      setCodeParts(splitSkeletonCode(problem.skeleton_code_json[lang], lang));
    }
  };

  /* ── Visualizer playback ── */
  useEffect(() => {
    let timer;
    if (isPlaying && problem?.sample_test_cases?.length > 0) {
      const rows = problem.sample_test_cases[0].expected_output.split('\n');
      timer = setInterval(() => {
        setVisualizerRow(prev => {
          if (prev >= rows.length - 1) { setIsPlaying(false); return 0; }
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(timer);
  }, [isPlaying, problem]);

  /* ── Tab-key support in textarea ── */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = codeParts.userCode.substring(0, start) + '    ' + codeParts.userCode.substring(end);
      setCodeParts(p => ({ ...p, userCode: newVal }));
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 4; });
    }
  }, [codeParts.userCode]);

  /* ── Run Code ── */
  const handleRunCode = async () => {
    setRunLoading(true);
    setConsoleTab('result');
    setRunResult(null);
    setSubmitResult(null);
    try {
      const fullCode = buildFullCode(codeParts.prefix, codeParts.userCode, codeParts.suffix);
      const inputVal = customInput || (problem?.sample_test_cases?.[0]?.input ?? '5');
      const response = await api.post('/submissions/run', { code: fullCode, language, input: inputVal, problemSlug: slug });

      if (response.data.success) {
        setRunResult({
          type: 'run',
          status: response.data.result.status,
          stdout: response.data.result.stdout,
          stderr: response.data.result.stderr,
          time: response.data.result.time,
          memory: response.data.result.memory,
          input: inputVal
        });
      }
    } catch (err) {
      console.error('Run code error:', err);
      setRunResult({ status: 'Connection Error', stderr: 'Failed to communicate with compilation server.' });
    } finally {
      setRunLoading(false);
    }
  };

  /* ── Submit Code ── */
  const handleSubmitCode = async () => {
    setSubmitLoading(true);
    setConsoleTab('result');
    setRunResult(null);
    setSubmitResult(null);
    setActiveTestCaseIdx(0);
    try {
      const fullCode = buildFullCode(codeParts.prefix, codeParts.userCode, codeParts.suffix);
      const response = await api.post('/submissions/submit', { code: fullCode, language, problemSlug: slug });
      if (response.data.success) {
        const resData = response.data;
        const subResult = resData.submission;
        if (resData.streak) {
          subResult.streak = resData.streak;
        }
        setSubmitResult(subResult);
        // Auto-select first failed test case, if any
        const firstFail = subResult.testCaseResults?.findIndex(t => !t.passed);
        setActiveTestCaseIdx(firstFail !== -1 ? firstFail : 0);

        if (subResult.status === 'Accepted' && resData.streak) {
          setShowModal(true);
        }
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitResult({ status: 'Error', errorMessage: 'Connection failed. Solution could not be graded.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ── Line count for gutter ── */
  const lineCount = Math.max(20, (codeParts.userCode.match(/\n/g) || []).length + 3);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center text-gold-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500 mr-2"></div>
        <span>Loading problem editor...</span>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex-grow flex items-center justify-center text-red-400 p-6">
        <span>{error || 'Problem details missing.'}</span>
      </div>
    );
  }

  const sampleOutputRows = problem.sample_test_cases?.[0]
    ? problem.sample_test_cases[0].expected_output.split('\n')
    : [];

  const activeTcResult = submitResult?.testCaseResults?.[activeTestCaseIdx];

  return (
    <div className="flex-grow flex flex-col lg:grid lg:grid-cols-2 relative w-full border-t border-obsidian-850 h-[calc(100vh-64px)] overflow-hidden">

      {/* ══════════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════════ */}
      <div className="flex flex-col border-r border-obsidian-850 h-full overflow-hidden bg-obsidian-950/40">

        {/* Left Tabs */}
        <div className="flex border-b border-obsidian-850 bg-obsidian-900/40 text-sm font-medium shrink-0">
          {[
            { id: 'description', label: 'Description' },
            { id: 'visualizer', label: 'Pattern Visualizer', icon: <Eye className="h-3.5 w-3.5" /> },
            { id: 'hints', label: 'Hints', icon: <HelpCircle className="h-3.5 w-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setLeftTab(tab.id)}
              className={`px-4 py-3 border-b-2 transition-all flex items-center gap-1.5 text-xs font-semibold ${
                leftTab === tab.id
                  ? 'border-gold-500 text-gold-500'
                  : 'border-transparent text-obsidian-400 hover:text-obsidian-200'
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">

          {/* ── DESCRIPTION ── */}
          {leftTab === 'description' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-obsidian-50 tracking-tight">{problem.title}</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-obsidian-850 border border-obsidian-750 rounded text-obsidian-400 mt-2 inline-block">
                    {problem.category}
                  </span>
                </div>
                <DiffBadge difficulty={problem.difficulty} />
              </div>

              <div className="text-obsidian-300 text-sm leading-relaxed border-t border-obsidian-900 pt-4">
                <p>{problem.description}</p>
              </div>

              {problem.constraints && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-obsidian-450">Constraints</h4>
                  <div className="bg-obsidian-900/50 border border-obsidian-850 rounded-xl p-3 font-mono text-xs text-gold-450">
                    N value boundaries: {problem.constraints.min_n} &le; N &le; {problem.constraints.max_n}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 border-t border-obsidian-900 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-obsidian-450">Sample Cases</h4>
                {problem.sample_test_cases.map((tc, idx) => (
                  <div key={idx} className="grid sm:grid-cols-2 gap-4 bg-obsidian-900/30 border border-obsidian-850 rounded-xl p-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-obsidian-400">Input</span>
                      <pre className="p-2.5 bg-obsidian-950 rounded-lg text-xs font-mono text-obsidian-200">{tc.input}</pre>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-obsidian-400">Output</span>
                      <pre className="p-2.5 bg-obsidian-950 rounded-lg text-xs font-mono text-gold-500 leading-normal">{tc.expected_output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PATTERN VISUALIZER ── */}
          {leftTab === 'visualizer' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-lg text-obsidian-150">Row-by-Row Builder</h3>
                <p className="text-xs text-obsidian-450 mt-1">Trace the sequence grid to visualize loop structure.</p>
              </div>
              {sampleOutputRows.length === 0 ? (
                <p className="text-xs text-obsidian-500">No output details for visual trace.</p>
              ) : (
                <div className="flex flex-col gap-5 bg-obsidian-900/40 border border-obsidian-850 rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(p => !p)}
                      className="px-4 py-2 bg-gold-500 text-obsidian-950 font-bold rounded-lg text-xs transition-all shadow-md hover:opacity-90"
                    >
                      {isPlaying ? 'Pause Trace' : 'Start Trace'}
                    </button>
                    <button
                      onClick={() => { setIsPlaying(false); setVisualizerRow(0); }}
                      className="px-4 py-2 bg-obsidian-800 border border-obsidian-750 text-obsidian-200 font-bold rounded-lg text-xs transition-all hover:bg-obsidian-750"
                    >
                      Reset
                    </button>
                    <span className="text-xs font-bold text-obsidian-400">
                      Row {visualizerRow + 1} / {sampleOutputRows.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono text-sm border border-obsidian-800 p-4 rounded-xl bg-obsidian-950 select-text overflow-x-auto min-h-[140px]">
                    {sampleOutputRows.map((row, rIdx) => (
                      <div
                        key={rIdx}
                        className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${
                          rIdx === visualizerRow
                            ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                            : 'text-obsidian-500 border border-transparent'
                        }`}
                      >
                        <span className="w-14 text-xs font-bold text-obsidian-600 font-sans shrink-0">Row {rIdx + 1} →</span>
                        <span className="font-mono tracking-widest font-bold whitespace-pre">{row}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-obsidian-950 border border-obsidian-800 rounded-lg text-xs text-obsidian-350">
                    <span className="font-bold text-gold-500">Coordinate Logic: </span>
                    In row <code className="font-mono text-gold-450">{visualizerRow + 1}</code>, print spaces first, then calculate column symbols dynamically.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── HINTS ── */}
          {leftTab === 'hints' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-lg text-obsidian-150">Progressive Hints</h3>
                <p className="text-xs text-obsidian-450 mt-1">Unlock advice step-by-step without spoiling the answer.</p>
              </div>
              <div className="flex flex-col gap-4">
                {problem.hints?.map((hintText, idx) => {
                  const hintNumber = idx + 1;
                  const isUnlocked = activeHintIndex >= hintNumber;
                  const canUnlock = activeHintIndex === hintNumber - 1;
                  return (
                    <div
                      key={idx}
                      className={`border rounded-xl p-4 transition-all ${
                        isUnlocked
                          ? 'bg-obsidian-900/50 border-obsidian-800 text-obsidian-200'
                          : 'bg-obsidian-900/20 border-obsidian-850/60 text-obsidian-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">Hint {hintNumber}</span>
                        {isUnlocked ? (
                          <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">Unlocked</span>
                        ) : (
                          <button
                            disabled={!canUnlock}
                            onClick={() => setActiveHintIndex(hintNumber)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              canUnlock ? 'bg-gold-500 hover:opacity-95 text-obsidian-950 shadow-md' : 'bg-obsidian-850 text-obsidian-600 cursor-not-allowed'
                            }`}
                          >
                            Reveal Hint
                          </button>
                        )}
                      </div>
                      {isUnlocked && <p className="text-xs text-obsidian-300 mt-3 leading-relaxed">{hintText}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT PANEL: EDITOR + CONSOLE
      ══════════════════════════════════════ */}
      <div ref={rightPanelRef} className="flex flex-col h-full overflow-hidden bg-obsidian-950">

        {/* Editor toolbar */}
        <div className="flex items-center justify-between border-b border-obsidian-850 px-4 py-2 bg-obsidian-900/30 shrink-0">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-gold-500" />
            <span className="text-xs font-bold text-obsidian-300 uppercase tracking-widest">Workspace</span>
          </div>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-obsidian-900 border border-obsidian-800 text-obsidian-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-gold-500"
          >
            <option value="python">Python 3</option>
            <option value="java">Java 13</option>
            <option value="cpp">C++ (GCC)</option>
            <option value="c">C (GCC)</option>
          </select>
        </div>

        {/* ── Code Editor (user editable portion only) ── */}
        <div
          className="overflow-hidden flex font-mono flex-col shrink-0"
          style={{ height: `${editorHeightPct}%` }}
        >

          {/* Hidden prefix banner */}
          {codeParts.prefix && (
            <div className="flex items-center gap-2 px-4 py-1.5 bg-obsidian-900/60 border-b border-obsidian-800/50 text-[10px] text-obsidian-600 font-sans select-none shrink-0">
              <Lock className="h-3 w-3" />
              <span>Imports &amp; class header hidden — implement the function below</span>
            </div>
          )}

          {/* Editable area */}
          <div className="flex flex-grow overflow-hidden">
            {/* Line numbers */}
            <div className="bg-[#050507] text-[#4e4e68] text-right select-none pr-3 pt-4 pb-4 text-xs font-semibold border-r border-[#1a1a24]/50 overflow-hidden shrink-0 w-10">
              {Array.from({ length: lineCount }).map((_, idx) => (
                <div key={idx} className="leading-relaxed">{idx + 1}</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={codeParts.userCode}
              onChange={e => setCodeParts(p => ({ ...p, userCode: e.target.value }))}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-[#09090d] text-[#faf2be] text-sm font-mono p-4 outline-none resize-none overflow-y-auto leading-relaxed border-none focus:ring-0"
              spellCheck="false"
              placeholder="// Start typing your solution..."
            />
          </div>

          {/* Hidden suffix banner */}
          {codeParts.suffix && (
            <div className="flex items-center gap-2 px-4 py-1.5 bg-obsidian-900/60 border-t border-obsidian-800/50 text-[10px] text-obsidian-600 font-sans select-none shrink-0">
              <Lock className="h-3 w-3" />
              <span>Closing brace &amp; main() hidden — input is fed automatically by the judge</span>
            </div>
          )}
        </div>

        {/* ── Drag Resize Handle ── */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            isDraggingRef.current = true;
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';

            const onMouseMove = (ev) => {
              if (!isDraggingRef.current || !rightPanelRef.current) return;
              const rect = rightPanelRef.current.getBoundingClientRect();
              const pct = ((ev.clientY - rect.top) / rect.height) * 100;
              // Clamp: editor min 20%, max 85%
              setEditorHeightPct(Math.min(85, Math.max(20, pct)));
            };

            const onMouseUp = () => {
              isDraggingRef.current = false;
              document.body.style.cursor = '';
              document.body.style.userSelect = '';
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
          className="group shrink-0 h-[6px] cursor-row-resize flex items-center justify-center bg-obsidian-900 hover:bg-gold-500/20 transition-colors border-y border-obsidian-800 relative z-10"
          title="Drag to resize"
        >
          {/* Grip dots */}
          <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-obsidian-500 group-hover:bg-gold-400" />
            ))}
          </div>
        </div>

        {/* ── Bottom Console Panel ── */}
        <div className="flex flex-col overflow-hidden bg-obsidian-950/80 flex-grow">

          {/* Console header */}
          <div className="flex items-center justify-between bg-obsidian-900/20 border-b border-obsidian-850 px-4 py-1.5 shrink-0">
            <div className="flex text-xs font-semibold gap-1">
              <button
                onClick={() => setConsoleTab('testcases')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  consoleTab === 'testcases'
                    ? 'bg-obsidian-850 text-gold-500 font-bold'
                    : 'text-obsidian-450 hover:text-obsidian-100'
                }`}
              >
                Test Cases
              </button>
              <button
                onClick={() => setConsoleTab('result')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  consoleTab === 'result'
                    ? 'bg-obsidian-850 text-gold-500 font-bold'
                    : 'text-obsidian-450 hover:text-obsidian-100'
                }`}
              >
                Results
                {submitResult && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    submitResult.status === 'Accepted'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {submitResult.passedCount}/{submitResult.totalCount}
                  </span>
                )}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                disabled={runLoading || submitLoading}
                className="px-3 py-1.5 bg-obsidian-850 border border-obsidian-750 hover:bg-obsidian-800 text-obsidian-200 font-bold rounded-lg text-xs flex items-center gap-1 transition-all disabled:opacity-50"
              >
                <Play className="h-3 w-3" />
                <span>{runLoading ? 'Running...' : 'Run Code'}</span>
              </button>
              <button
                onClick={handleSubmitCode}
                disabled={runLoading || submitLoading}
                className="px-3 py-1.5 bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-extrabold rounded-lg text-xs flex items-center gap-1 transition-all hover:opacity-95 shadow disabled:opacity-50"
              >
                <Send className="h-3 w-3" />
                <span>{submitLoading ? 'Judging...' : 'Submit'}</span>
              </button>
            </div>
          </div>

          {/* Console content */}
          <div className="flex-grow overflow-y-auto p-4 text-xs font-mono">

            {/* ── TEST CASES TAB ── */}
            {consoleTab === 'testcases' && (
              <div className="flex flex-col gap-3">
                <span className="text-obsidian-450 font-bold font-sans uppercase tracking-wider text-[10px]">Custom Test Input (N)</span>
                <input
                  type="text"
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                  placeholder={problem.sample_test_cases?.[0]?.input ?? '5'}
                  className="bg-obsidian-900 border border-obsidian-850 rounded-lg p-2.5 outline-none text-obsidian-200 text-sm font-mono max-w-xs focus:border-gold-500"
                />
                <span className="text-obsidian-500 font-sans text-[11px]">
                  Enter an integer N. Click <strong className="text-obsidian-300">Run Code</strong> to test with this input against your function.
                </span>
              </div>
            )}

            {/* ── RESULT TAB ── */}
            {consoleTab === 'result' && (
              <div className="h-full">
                {(runLoading || submitLoading) ? (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-obsidian-450 gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gold-500"></div>
                    <span className="font-sans font-medium">
                      {submitLoading ? 'Running all test cases...' : 'Compiling and running...'}
                    </span>
                  </div>

                ) : runResult ? (
                  /* ── RUN RESULT ── */
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold font-sans text-obsidian-400 uppercase tracking-wider">Output</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                        runResult.status === 'Accepted' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {runResult.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-obsidian-500 font-sans">Input (N)</span>
                        <pre className="p-2.5 bg-obsidian-900/60 border border-obsidian-800 rounded-lg text-obsidian-300 text-xs leading-normal">{runResult.input}</pre>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-obsidian-500 font-sans">
                          {runResult.stderr ? 'Error' : 'Your Output'}
                        </span>
                        <pre className={`p-2.5 rounded-lg text-xs leading-normal max-h-28 overflow-y-auto border ${
                          runResult.stderr
                            ? 'bg-red-500/5 border-red-500/20 text-red-400'
                            : 'bg-obsidian-950 border-obsidian-850 text-gold-500'
                        }`}>
                          {runResult.stderr || runResult.stdout || '(no output)'}
                        </pre>
                      </div>
                    </div>
                  </div>

                ) : submitResult ? (
                  /* ── SUBMIT RESULT (LeetCode style) ── */
                  <div className="flex flex-col gap-3 h-full">

                    {/* Overall verdict */}
                    <div className="flex items-center gap-3 shrink-0">
                      {submitResult.status === 'Accepted' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                      )}
                      <div className="flex flex-col">
                        <span className={`font-extrabold text-sm font-sans ${
                          submitResult.status === 'Accepted' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {submitResult.status === 'Accepted' ? 'Accepted' : submitResult.status}
                        </span>
                        <span className="text-[10px] text-obsidian-500 font-sans">
                          {submitResult.passedCount} / {submitResult.totalCount} test cases passed
                        </span>
                      </div>
                      {submitResult.timeMs > 0 && (
                        <div className="ml-auto flex items-center gap-3 text-[10px] text-obsidian-500 font-sans">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{submitResult.timeMs} ms</span>
                          <span className="flex items-center gap-1"><Cpu className="h-3 w-3" />{submitResult.memoryKb} KB</span>
                        </div>
                      )}
                    </div>

                    {/* Test case tabs */}
                    {submitResult.testCaseResults?.length > 0 && (
                      <div className="flex flex-col gap-3 min-h-0 flex-grow">
                        {/* Case selector row */}
                        <div className="flex flex-wrap gap-1.5 shrink-0">
                          {submitResult.testCaseResults.map((tc, idx) => (
                            <TestCaseCard
                              key={idx}
                              tc={tc}
                              isActive={activeTestCaseIdx === idx}
                              onClick={() => setActiveTestCaseIdx(idx)}
                            />
                          ))}
                        </div>

                        {/* Selected test case detail */}
                        {activeTcResult && (
                          <div className="flex flex-col gap-3 overflow-y-auto">

                            {/* Input row */}
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[10px] font-bold text-obsidian-500 font-sans uppercase tracking-wider">
                                Input (N)
                              </span>
                              <pre className="p-2.5 bg-obsidian-900/60 border border-obsidian-800 rounded-lg text-obsidian-300 text-xs leading-relaxed min-h-[32px]">
                                {activeTcResult.input}
                              </pre>
                            </div>

                            {/* Expected vs Your Output - side by side */}
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-obsidian-500 font-sans uppercase tracking-wider">
                                  Expected Output
                                </span>
                                <pre className="p-2.5 bg-obsidian-900/60 border border-obsidian-800 rounded-lg text-gold-500 text-xs leading-relaxed min-h-[60px] max-h-[160px] overflow-y-auto whitespace-pre">
                                  {activeTcResult.expected}
                                </pre>
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <span className={`text-[10px] font-bold font-sans uppercase tracking-wider ${
                                  activeTcResult.passed ? 'text-green-500' : 'text-red-400'
                                }`}>
                                  Your Output
                                </span>
                                <pre className={`p-2.5 rounded-lg text-xs leading-relaxed min-h-[60px] max-h-[160px] overflow-y-auto whitespace-pre border ${
                                  activeTcResult.passed
                                    ? 'bg-green-500/5 border-green-500/20 text-green-400'
                                    : 'bg-red-500/5 border-red-500/20 text-red-400'
                                }`}>
                                  {activeTcResult.stderr
                                    ? `Runtime Error:\n${activeTcResult.stderr}`
                                    : (activeTcResult.actual || '(no output)')}
                                </pre>
                              </div>
                            </div>

                            {!activeTcResult.isSample && !activeTcResult.passed && (
                              <div className="flex items-center gap-2 text-[10px] text-obsidian-500 font-sans px-1">
                                <Lock className="h-3 w-3 shrink-0" />
                                <span>This is a hidden test case. Expected output is private.</span>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    )}
                  </div>

                ) : (
                  <div className="text-center py-8 text-obsidian-550 font-sans">
                    Console ready. Click <strong className="text-obsidian-300">Run Code</strong> or <strong className="text-obsidian-300">Submit</strong> to evaluate.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ACHIEVEMENT MODAL
      ══════════════════════════════════════ */}
      {showModal && submitResult?.streak && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-5 shadow-2xl border border-gold-500/20">

            <div className="bg-gradient-to-br from-gold-400 to-amber-600 p-3.5 rounded-full text-obsidian-950 shadow-md">
              <Sparkles className="h-6 w-6" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-black text-gradient font-sans">Accepted!</h3>
              <p className="text-xs text-obsidian-350 leading-relaxed">
                All {submitResult.totalCount} test cases passed. Great pattern logic!
              </p>
            </div>

            <div className="flex items-center gap-6 py-2 px-6 rounded-xl bg-obsidian-900 border border-obsidian-850">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-amber-500 flex items-center gap-1">
                  <Flame className="h-5 w-5 fill-amber-500 shrink-0" />
                  {submitResult.streak.currentStreak}
                </span>
                <span className="text-[10px] text-obsidian-500 font-semibold uppercase mt-0.5">Current Streak</span>
              </div>
              <div className="h-8 w-px bg-obsidian-800"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-gold-500 flex items-center gap-1">
                  <Trophy className="h-5 w-5 shrink-0" />
                  {submitResult.streak.longestStreak}
                </span>
                <span className="text-[10px] text-obsidian-500 font-semibold uppercase mt-0.5">Longest Streak</span>
              </div>
            </div>

            {submitResult.streak.newBadges?.length > 0 && (
              <div className="w-full flex flex-col gap-2">
                <span className="text-[10px] text-gold-500 uppercase tracking-widest font-extrabold flex items-center justify-center gap-1">
                  <Award className="h-3 w-3" /> New Achievement Unlocked!
                </span>
                {submitResult.streak.newBadges.map((badge, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-obsidian-900 to-obsidian-850 border border-gold-500/10 text-left">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500 shrink-0">
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-obsidian-150">{badge.name}</span>
                      <span className="text-[10px] text-obsidian-450 mt-0.5 leading-normal">{badge.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold py-2 rounded-xl hover:opacity-95 transition-all text-xs"
            >
              Continue Practice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
