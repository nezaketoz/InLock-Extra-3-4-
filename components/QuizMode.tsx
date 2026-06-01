import React, { useState, useEffect } from 'react';
import { CourseUnit } from '../data/courseData';
import { generateQuiz, QuizQ } from '../services/gemini';
import { Spinner } from './common/Spinner';

interface Props { unit: CourseUnit; mode: 'vocab' | 'phrases'; onExit: () => void; }

export const QuizMode: React.FC<Props> = ({ unit, mode, onExit }) => {
  const [qs, setQs] = useState<QuizQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [log, setLog] = useState<{ q: string; sel: string; ans: string; ok: boolean }[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
      const words = mode === 'vocab'
        ? shuffle(unit.vocabulary.map(v => v.word)).slice(0, 20)
        : shuffle(unit.phrases).slice(0, 15);
      const result = await generateQuiz(words, unit.topic, 6);
      setQs(result); setLoading(false);
    };
    load();
  }, [unit, mode]);

  const cur = qs[idx];

  const pick = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const ok = opt === cur.answer;
    if (ok) setScore(s => s + 1);
    setLog(l => [...l, { q: cur.question, sel: opt, ans: cur.answer, ok }]);
  };

  const next = () => {
    if (idx + 1 >= qs.length) setFinished(true);
    else { setIdx(i => i + 1); setSelected(null); }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Spinner size="w-10 h-10" /><p className="text-slate-500 text-sm">Generating quiz with AI...</p>
    </div>
  );

  if (!qs.length) return (
    <div className="text-center py-12">
      <p className="text-slate-500 mb-4">Couldn't generate quiz. Please try again.</p>
      <button onClick={onExit} className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl px-5 py-2.5 font-semibold text-sm">← Back</button>
    </div>
  );

  if (finished) {
    const pct = Math.round((score / qs.length) * 100);
    return (
      <div className="max-w-lg mx-auto px-4 py-8 fade-up">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-slate-800">Quiz Complete!</h2>
          <p className="text-4xl font-black text-indigo-600 mt-1">{score}/{qs.length}</p>
          <p className="text-slate-400 text-sm">{pct}% correct</p>
        </div>
        <div className="space-y-2 mb-6">
          {log.map((a, i) => (
            <div key={i} className={`rounded-xl border p-3 ${a.ok ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <p className="text-xs font-semibold text-slate-600 mb-1">Q{i + 1}: {a.q}</p>
              {!a.ok && <p className="text-xs text-red-600">Your answer: {a.sel}</p>}
              <p className={`text-xs font-semibold ${a.ok ? 'text-emerald-700' : 'text-emerald-700'}`}>
                {a.ok ? '✓' : '→'} Correct: {a.ans}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={onExit} className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl px-5 py-2.5 font-semibold text-sm">← Back</button>
          <button onClick={() => { setIdx(0); setSelected(null); setScore(0); setFinished(false); setLog([]); setLoading(true); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 font-semibold text-sm">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 fade-up">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onExit} className="text-sm text-slate-500 hover:text-slate-700">← Exit</button>
        <span className="text-sm text-slate-500">{idx + 1} / {qs.length}</span>
        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{mode === 'vocab' ? '📚' : '💬'} {unit.topic}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-5">
        <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(idx / qs.length) * 100}%` }} />
      </div>
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 mb-4 shadow-sm">
        <p className="text-slate-700 font-semibold text-sm leading-relaxed">{cur.question}</p>
      </div>
      <div className="space-y-2.5 mb-4">
        {cur.options.map((opt, i) => {
          let s = 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50';
          if (selected) {
            if (opt === cur.answer) s = 'bg-emerald-50 border-emerald-400 text-emerald-800';
            else if (opt === selected) s = 'bg-red-50 border-red-400 text-red-700';
            else s = 'bg-white border-slate-200 text-slate-400';
          }
          return (
            <button key={i} onClick={() => pick(opt)} disabled={!!selected}
              className={`w-full text-left border-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${s}`}>
              <span className="text-xs text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="fade-up">
          <div className={`rounded-xl p-3 mb-3 text-sm ${selected === cur.answer ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
            <p className="font-semibold mb-0.5">{selected === cur.answer ? '✓ Correct!' : '✗ Incorrect'}</p>
            <p className="text-xs">{cur.explanation}</p>
          </div>
          <button onClick={next} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold text-sm">
            {idx + 1 < qs.length ? 'Next →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};
