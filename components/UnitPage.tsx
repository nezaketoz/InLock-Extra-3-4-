import React, { useState } from 'react';
import { CourseUnit } from '../data/courseData';
import { getWordInfo } from '../services/gemini';
import { Spinner } from './common/Spinner';

type Tab = 'vocab' | 'phrases' | 'grammar' | 'resources';

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; btn: string }> = {
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    badge: 'bg-blue-100 text-blue-700',    btn: 'bg-blue-600 hover:bg-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-700',    badge: 'bg-rose-100 text-rose-700',    btn: 'bg-rose-600 hover:bg-rose-700' },
  green:   { bg: 'bg-green-50',   border: 'border-green-200',   text: 'text-green-700',   badge: 'bg-green-100 text-green-700',  btn: 'bg-green-600 hover:bg-green-700' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-700',  badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700' },
  yellow:  { bg: 'bg-yellow-50',  border: 'border-yellow-200',  text: 'text-yellow-700',  badge: 'bg-yellow-100 text-yellow-700', btn: 'bg-yellow-500 hover:bg-yellow-600' },
  purple:  { bg: 'bg-purple-50',  border: 'border-purple-200',  text: 'text-purple-700',  badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700' },
  indigo:  { bg: 'bg-indigo-50',  border: 'border-indigo-200',  text: 'text-indigo-700',  badge: 'bg-indigo-100 text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-700' },
};

const POS_STYLE: Record<string, string> = {
  n: 'bg-blue-100 text-blue-700', v: 'bg-green-100 text-green-700',
  adj: 'bg-orange-100 text-orange-700', adv: 'bg-purple-100 text-purple-700',
};
const SOURCE_STYLE: Record<string, string> = {
  'W&L': 'bg-slate-100 text-slate-500', R1: 'bg-sky-100 text-sky-600',
  R2: 'bg-teal-100 text-teal-600', L1: 'bg-amber-100 text-amber-600',
  L2: 'bg-rose-100 text-rose-600', Sp: 'bg-violet-100 text-violet-600',
};
const RESOURCE_ICONS: Record<string, string> = {
  flashcard: '🃏', reading: '📄', quiz: '✏️', video: '▶️',
  grammar: '📖', writing: '✍️', speaking: '🎙️', other: '🔗',
};

interface UnitPageProps {
  unit: CourseUnit;
  onFlashcards: (mode: 'vocab' | 'phrases') => void;
  onQuiz: (mode: 'vocab' | 'phrases') => void;
}

export const UnitPage: React.FC<UnitPageProps> = ({ unit, onFlashcards, onQuiz }) => {
  const [tab, setTab] = useState<Tab>('vocab');
  const c = COLOR_MAP[unit.color];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 fade-up">
      {/* Header */}
      <div className={`${c.bg} ${c.border} border-2 rounded-2xl p-5 mb-5`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{unit.emoji}</span>
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>{unit.title}</p>
            <h1 className="text-2xl font-black text-slate-800">{unit.topic}</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div>
            <p className="font-semibold text-slate-600 mb-1">📖 Readings</p>
            {unit.readings.map((r, i) => <p key={i} className="text-slate-500">{r}</p>)}
          </div>
          <div>
            <p className="font-semibold text-slate-600 mb-1">🎧 Listenings</p>
            {unit.listenings.map((l, i) => <p key={i} className="text-slate-500">{l}</p>)}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onFlashcards('vocab')} className={`${c.btn} text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5`}>
            🃏 Flashcards
          </button>
          <button onClick={() => onQuiz('vocab')} className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
            ✏️ Quiz Me
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-5 text-xs overflow-x-auto">
        {([
          ['vocab',     `📚 Vocab (${unit.vocabulary.length})`],
          ['phrases',   `💬 Phrases (${unit.phrases.length})`],
          ['grammar',   `📖 Grammar (${unit.grammar.length})`],
          ['resources', `🔗 Resources (${unit.resources.length})`],
        ] as [Tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 px-2 rounded-lg font-semibold whitespace-nowrap transition-all ${tab === t ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Vocab tab */}
      {tab === 'vocab' && (
        <div className="fade-up">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-400">Tap any word for AI definition + example + Turkish 🇹🇷</p>
            <button onClick={() => onFlashcards('vocab')} className="text-xs text-indigo-600 hover:underline">Practice →</button>
          </div>
          {/* Group by source */}
          {['W&L', 'R1', 'R2', 'L1', 'L2', 'Sp'].map(src => {
            const items = unit.vocabulary.filter(v => v.source === src);
            if (!items.length) return null;
            const srcLabels: Record<string, string> = { 'W&L': 'Watch & Listen', R1: 'Reading 1', R2: 'Reading 2', L1: 'Listening 1', L2: 'Listening 2', Sp: 'Speaking' };
            return (
              <div key={src} className="mb-4">
                <p className={`text-xs font-bold px-2 py-1 rounded-lg inline-block mb-2 ${SOURCE_STYLE[src]}`}>{srcLabels[src]}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {items.map((item, i) => <ExpandableWord key={i} word={item.word} pos={item.pos} topic={unit.topic} posStyle={POS_STYLE[item.pos] || 'bg-slate-100 text-slate-600'} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Phrases tab */}
      {tab === 'phrases' && (
        <div className="fade-up">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-400">Tap any phrase for meaning + example + Turkish 🇹🇷</p>
            <button onClick={() => onFlashcards('phrases')} className="text-xs text-indigo-600 hover:underline">Practice →</button>
          </div>
          <div className="space-y-1.5">
            {unit.phrases.map((phrase, i) => (
              <ExpandableWord key={i} word={phrase} pos="" topic={unit.topic} posStyle="" isPhraseMode />
            ))}
          </div>
        </div>
      )}

      {/* Grammar tab */}
      {tab === 'grammar' && (
        <div className="fade-up space-y-4">
          {unit.grammar.map((g, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-slate-800">{g.title}</h3>
                {g.code && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-mono">{g.code}</span>}
              </div>
              <p className="text-sm text-slate-600 mb-3">{g.description}</p>
              <div className="space-y-1.5">
                {g.examples.map((ex, j) => (
                  <div key={j} className={`${c.bg} ${c.border} border rounded-lg px-3 py-2`}>
                    <p className={`text-sm italic ${c.text}`}>"{ex}"</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resources tab */}
      {tab === 'resources' && (
        <div className="fade-up">
          {unit.resources.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-3xl mb-2">🔗</p>
              <p className="text-sm">Links coming soon. Add your resource URLs here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-slate-400 mb-3">Links marked with ⚠️ haven't been added yet. You can click them once URLs are configured.</p>
              {unit.resources.map((r, i) => (
                <ResourceRow key={i} resource={r} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Sub-components ────────────────────────────────────────────────────────

interface ExpandableWordProps { word: string; pos: string; topic: string; posStyle: string; isPhraseMode?: boolean; }

const ExpandableWord: React.FC<ExpandableWordProps> = ({ word, pos, topic, posStyle, isPhraseMode }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<{ definition: string; example: string; turkish: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setOpen(o => !o);
    if (!open && !info) {
      setLoading(true);
      const result = await getWordInfo(word, topic);
      setInfo(result);
      setLoading(false);
    }
  };

  return (
    <div className={`rounded-xl border cursor-pointer transition-all ${open ? 'border-slate-300 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`} onClick={toggle}>
      <div className="flex items-center justify-between px-3 py-2.5 gap-2">
        <span className="text-sm font-medium text-slate-800">{word}</span>
        <div className="flex items-center gap-1 flex-shrink-0">
          {pos && <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${posStyle}`}>{pos}</span>}
          <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {open && (
        <div className="px-3 pb-3 border-t border-slate-100">
          {loading ? <div className="flex justify-center py-3"><Spinner /></div>
          : info ? (
            <div className="mt-2 space-y-1">
              <p className="text-sm text-slate-700">{info.definition}</p>
              <p className="text-xs text-slate-500 italic">e.g. "{info.example}"</p>
              <p className="text-xs text-indigo-600 font-medium">🇹🇷 {info.turkish}</p>
            </div>
          ) : <p className="text-xs text-red-500 mt-2">Could not load. Tap to retry.</p>}
        </div>
      )}
    </div>
  );
};

const ResourceRow: React.FC<{ resource: { label: string; url: string; type: string } }> = ({ resource }) => {
  const hasUrl = resource.url && resource.url !== '';
  const icon = RESOURCE_ICONS[resource.type] || '🔗';
  return (
    <div className={`flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 ${hasUrl ? 'hover:border-indigo-300 hover:shadow-sm transition-all' : 'opacity-60'}`}>
      <span className="text-lg flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium text-slate-700 flex-1">{resource.label}</span>
      {hasUrl ? (
        <a href={resource.url} target="_blank" rel="noopener noreferrer"
          className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1" onClick={e => e.stopPropagation()}>
          Open ↗
        </a>
      ) : (
        <span className="text-xs text-slate-400">⚠️ Link needed</span>
      )}
    </div>
  );
};
