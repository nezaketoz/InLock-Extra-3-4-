import React from 'react';
import { UNITS, UL3_UNITS } from '../data/courseData';

const COLOR_MAP: Record<string, { card: string; badge: string; text: string }> = {
  blue:    { card: 'border-blue-200 bg-blue-50 hover:bg-blue-100',       badge: 'bg-blue-100 text-blue-700',    text: 'text-blue-700' },
  emerald: { card: 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100', badge: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-700' },
  rose:    { card: 'border-rose-200 bg-rose-50 hover:bg-rose-100',       badge: 'bg-rose-100 text-rose-700',    text: 'text-rose-700' },
  green:   { card: 'border-green-200 bg-green-50 hover:bg-green-100',    badge: 'bg-green-100 text-green-700',  text: 'text-green-700' },
  orange:  { card: 'border-orange-200 bg-orange-50 hover:bg-orange-100', badge: 'bg-orange-100 text-orange-700', text: 'text-orange-700' },
  yellow:  { card: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100', badge: 'bg-yellow-100 text-yellow-700', text: 'text-yellow-700' },
  purple:  { card: 'border-purple-200 bg-purple-50 hover:bg-purple-100', badge: 'bg-purple-100 text-purple-700', text: 'text-purple-700' },
  indigo:  { card: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100', badge: 'bg-indigo-100 text-indigo-700', text: 'text-indigo-700' },
  amber:   { card: 'border-amber-200 bg-amber-50 hover:bg-amber-100',    badge: 'bg-amber-100 text-amber-700',  text: 'text-amber-700' },
  teal:    { card: 'border-teal-200 bg-teal-50 hover:bg-teal-100',       badge: 'bg-teal-100 text-teal-700',    text: 'text-teal-700' },
  sky:     { card: 'border-sky-200 bg-sky-50 hover:bg-sky-100',          badge: 'bg-sky-100 text-sky-700',      text: 'text-sky-700' },
  pink:    { card: 'border-pink-200 bg-pink-50 hover:bg-pink-100',       badge: 'bg-pink-100 text-pink-700',    text: 'text-pink-700' },
  violet:  { card: 'border-violet-200 bg-violet-50 hover:bg-violet-100', badge: 'bg-violet-100 text-violet-700', text: 'text-violet-700' },
};

interface HomePageProps { onSelectUnit: (id: number) => void; }

const UnitCard: React.FC<{ unit: typeof UNITS[0]; onClick: () => void }> = ({ unit, onClick }) => {
  const c = COLOR_MAP[unit.color] ?? COLOR_MAP['indigo'];
  return (
    <button onClick={onClick}
      className={`${c.card} border-2 rounded-2xl p-4 text-left transition-all duration-150 hover:shadow-md hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{unit.emoji}</span>
        {unit.vocabulary.length > 0 && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{unit.vocabulary.length} words</span>
        )}
      </div>
      <p className={`text-xs font-bold uppercase tracking-wide ${c.text} mb-0.5`}>{unit.title}</p>
      <p className="font-bold text-slate-800">{unit.topic}</p>
      <div className="mt-2.5 flex gap-1.5 text-xs flex-wrap">
        <span className="bg-white/80 rounded-md px-2 py-0.5 text-slate-500">📖 {unit.readings.length} readings</span>
        {unit.phrases.length > 0 && <span className="bg-white/80 rounded-md px-2 py-0.5 text-slate-500">💬 {unit.phrases.length} phrases</span>}
        {unit.resources.length > 0 && <span className="bg-white/80 rounded-md px-2 py-0.5 text-slate-500">🔗 {unit.resources.length} links</span>}
      </div>
    </button>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onSelectUnit }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 fade-up">
    {/* Hero */}
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-7 mb-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="font-black text-white text-lg">UX</span>
        </div>
        <div>
          <h1 className="text-2xl font-black leading-none">UNLOCK Extra</h1>
          <p className="text-indigo-200 text-sm">Intermediate Level English Course · Sabancı University</p>
        </div>
      </div>
      <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
        Your self-study vocabulary and resource hub for <strong className="text-white">Unlock 3 & Unlock 4</strong>.
        Browse vocabulary and phrases, use AI-powered flashcards and quizzes, and access all your
        course materials in one place.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {['Unlock 3', 'Unlock 4', '13 Units', '500+ Words', 'AI Flashcards', 'AI Quizzes', 'All Resource Links'].map(tag => (
          <span key={tag} className="bg-white/20 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>
    </div>

    {/* How to use */}
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
      <p className="font-semibold mb-1">📌 How to use UNLOCK Extra</p>
      <ul className="list-disc list-inside space-y-0.5 text-xs text-amber-700">
        <li>Use the <strong>sidebar</strong> to switch between <strong>Unlock 3</strong> and <strong>Unlock 4</strong></li>
        <li>Select a unit to see all vocabulary, phrases and grammar from your TLP</li>
        <li>Tap any word or phrase to get an AI definition, example and Turkish translation 🇹🇷</li>
        <li>Use <strong>Flashcards</strong> to test yourself — think first, then flip!</li>
        <li>Use <strong>Quiz Me</strong> for AI-generated multiple choice questions</li>
        <li>Find all your external links (edcafe.ai, Google Docs, etc.) in the Resources tab of each unit</li>
      </ul>
    </div>

    {/* UL4 Units */}
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-bold text-slate-700">📗 Unlock 4 Units</h2>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">8 units</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {UNITS.map(u => <UnitCard key={u.id} unit={u} onClick={() => onSelectUnit(u.id)} />)}
      </div>
    </div>

    {/* UL3 Units */}
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-bold text-slate-700">📘 Unlock 3 Units</h2>
        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">5 units</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {UL3_UNITS.map(u => <UnitCard key={u.id} unit={u} onClick={() => onSelectUnit(u.id)} />)}
      </div>
    </div>

    {/* Quick links */}
    <h2 className="text-lg font-bold text-slate-700 mb-3">🔗 Cross-Unit Resources</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
      {[
        { emoji: '🎧', label: 'Listening Practice', color: 'bg-sky-50 border-sky-200 text-sky-700' },
        { emoji: '✍️', label: 'UL4 Writing Exams', color: 'bg-rose-50 border-rose-200 text-rose-700' },
        { emoji: '📖', label: 'UL4 Grammar', color: 'bg-violet-50 border-violet-200 text-violet-700' },
        { emoji: '🏆', label: 'UL4 Final Practice', color: 'bg-amber-50 border-amber-200 text-amber-700' },
      ].map(item => (
        <div key={item.label} className={`${item.color} border rounded-xl p-3 text-center text-xs font-semibold`}>
          <p className="text-2xl mb-1">{item.emoji}</p>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {[
        { emoji: '📋', label: 'UL3 LE Practice', color: 'bg-teal-50 border-teal-200 text-teal-700' },
        { emoji: '📝', label: 'UL3 Midterm', color: 'bg-teal-50 border-teal-200 text-teal-700' },
        { emoji: '📖', label: 'UL3 Reading Packs', color: 'bg-teal-50 border-teal-200 text-teal-700' },
        { emoji: '✍️', label: 'UL3 Writing', color: 'bg-teal-50 border-teal-200 text-teal-700' },
      ].map(item => (
        <div key={item.label} className={`${item.color} border rounded-xl p-3 text-center text-xs font-semibold`}>
          <p className="text-2xl mb-1">{item.emoji}</p>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  </div>
);
