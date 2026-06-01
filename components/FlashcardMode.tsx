import React, { useState, useCallback } from 'react';
import { CourseUnit } from '../data/courseData';
import { getWordInfo } from '../services/gemini';
import { Spinner } from './common/Spinner';

interface Props { unit: CourseUnit; mode: 'vocab' | 'phrases'; onExit: () => void; }

export const FlashcardMode: React.FC<Props> = ({ unit, mode, onExit }) => {
  const items = mode === 'vocab' ? unit.vocabulary.map(v => v.word) : unit.phrases;
  const [cards] = useState(() => [...items].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [info, setInfo] = useState<{ definition: string; example: string; turkish: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [known, setKnown] = useState(0);
  const [studying, setStudying] = useState(0);

  const current = cards[idx];
  const done = idx >= cards.length;

  const fetchInfo = useCallback(async (word: string) => {
    setLoading(true); setInfo(null);
    const r = await getWordInfo(word, unit.topic);
    setInfo(r); setLoading(false);
  }, [unit.topic]);

  const handleFlip = () => {
    if (!flipped) fetchInfo(current);
    setFlipped(f => !f);
  };

  const next = (k: boolean) => {
    if (k) setKnown(n => n + 1); else setStudying(n => n + 1);
    setFlipped(false); setInfo(null); setIdx(i => i + 1);
  };

  if (done) return (
    <div className="max-w-md mx-auto px-4 py-12 text-center fade-up">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Session complete!</h2>
      <p className="text-slate-500 text-sm mb-6">{cards.length} {mode === 'vocab' ? 'words' : 'phrases'} reviewed</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-3xl font-bold text-emerald-600">{known}</p>
          <p className="text-sm text-emerald-700 mt-1">✅ I knew it</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-3xl font-bold text-amber-600">{studying}</p>
          <p className="text-sm text-amber-700 mt-1">📖 Still learning</p>
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={onExit} className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl px-5 py-2.5 font-semibold text-sm">← Back</button>
        <button onClick={() => { setIdx(0); setFlipped(false); setInfo(null); setKnown(0); setStudying(0); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 font-semibold text-sm">Restart</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onExit} className="text-sm text-slate-500 hover:text-slate-700">← Exit</button>
        <span className="text-sm text-slate-500">{idx + 1} / {cards.length}</span>
        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
          {mode === 'vocab' ? '📚 Words' : '💬 Phrases'}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-6">
        <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${(idx / cards.length) * 100}%` }} />
      </div>

      <div className={`card-flip ${flipped ? 'flipped' : ''} relative h-60 mb-5`} onClick={handleFlip}>
        <div className="card-flip-inner w-full h-full relative">
          <div className="card-front absolute inset-0 bg-white border-2 border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 cursor-pointer hover:border-indigo-300 transition-colors">
            <p className="text-xl font-bold text-slate-800 text-center mb-2">{current}</p>
            {mode === 'vocab' && unit.vocabulary.find(v => v.word === current)?.pos && (
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {unit.vocabulary.find(v => v.word === current)?.pos}
              </span>
            )}
            <p className="text-xs text-indigo-400 mt-4">Tap to reveal definition →</p>
          </div>
          <div className="card-back absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 border-2 border-indigo-500 rounded-2xl shadow-sm flex flex-col items-center justify-center p-6 cursor-pointer">
            {loading ? <Spinner size="w-8 h-8" color="border-indigo-300" />
            : info ? (
              <div className="text-center space-y-2 fade-up">
                <p className="text-white font-bold text-sm">{current}</p>
                <p className="text-indigo-100 text-sm leading-relaxed">{info.definition}</p>
                <p className="text-indigo-200 text-xs italic">"{info.example}"</p>
                <p className="text-indigo-300 text-xs">🇹🇷 {info.turkish}</p>
              </div>
            ) : <p className="text-indigo-200 text-sm">Tap to retry</p>}
          </div>
        </div>
      </div>

      {flipped ? (
        <div className="grid grid-cols-2 gap-3 fade-up">
          <button onClick={() => next(false)} className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-xl py-3 font-semibold text-sm">😅 Still learning</button>
          <button onClick={() => next(true)} className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-xl py-3 font-semibold text-sm">✅ I knew it!</button>
        </div>
      ) : (
        <p className="text-center text-xs text-slate-400">Think about the meaning first, then tap the card</p>
      )}
      <div className="flex justify-center gap-5 mt-4 text-xs text-slate-400">
        <span>✅ {known}</span><span>📖 {studying}</span>
      </div>
    </div>
  );
};
