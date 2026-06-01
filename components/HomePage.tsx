import React from 'react';
import { UNITS } from '../data/courseData';

const COLOR_MAP: Record<string, { card: string; badge: string; text: string }> = {
  blue:    { card: 'border-blue-200 bg-blue-50 hover:bg-blue-100',    badge: 'bg-blue-100 text-blue-700',    text: 'text-blue-700' },
  emerald: { card: 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100', badge: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-700' },
  rose:    { card: 'border-rose-200 bg-rose-50 hover:bg-rose-100',    badge: 'bg-rose-100 text-rose-700',    text: 'text-rose-700' },
  green:   { card: 'border-green-200 bg-green-50 hover:bg-green-100', badge: 'bg-green-100 text-green-700',  text: 'text-green-700' },
  orange:  { card: 'border-orange-200 bg-orange-50 hover:bg-orange-100', badge: 'bg-orange-100 text-orange-700', text: 'text-orange-700' },
  yellow:  { card: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100', badge: 'bg-yellow-100 text-yellow-700', text: 'text-yellow-700' },
  purple:  { card: 'border-purple-200 bg-purple-50 hover:bg-purple-100', badge: 'bg-purple-100 text-purple-700', text: 'text-purple-700' },
  indigo:  { card: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100', badge: 'bg-indigo-100 text-indigo-700', text: 'text-indigo-700' },
};

interface HomePageProps { onSelectUnit: (id: number) => void; }

export const HomePage: React.FC<HomePageProps> = ({ onSelectUnit }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 fade-up">
    {/* Hero */}
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-7 mb-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
          <span className="font-black text-white text-lg">UX</span>
        </div>
        <div>
          <h1 className="text-2xl font-black leading-none">UNLOCK Extra</h1>
          <p className="text-indigo-200 text-sm">Route 2 · ENG 002 · Spring 2025–26</p>
        </div>
      </div>
      <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
        Your self-study vocabulary and learning hub for <strong className="text-white">Unlock 4</strong>.
        Each unit features vocabulary, phrases, grammar notes, AI-powered flashcards and quizzes,
        and links to all your external resources.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {['8 Units', '500+ Words', 'AI Flashcards', 'AI Quizzes', 'Grammar Notes', 'Resource Links'].map(tag => (
          <span key={tag} className="bg-white/20 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>
    </div>

    {/* Notice */}
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
      <p className="font-semibold mb-1">📌 How to use UNLOCK Extra</p>
      <ul className="list-disc list-inside space-y-0.5 text-xs text-amber-700">
        <li>Select a unit to see all vocabulary, phrases and grammar from your TLP</li>
        <li>Tap any word or phrase to get an AI definition, example and Turkish translation</li>
        <li>Use <strong>Flashcards</strong> to test yourself — think first, then flip!</li>
        <li>Use <strong>Quiz Me</strong> for AI-generated multiple choice questions</li>
        <li>Find all your external links (Quizlet, online readings, etc.) in the Resources tab</li>
        <li>These are the <em>key target words only</em> — refer to your TLP for the full list</li>
      </ul>
    </div>

    {/* Units grid */}
    <h2 className="text-lg font-bold text-slate-700 mb-3">📚 Course Units</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
      {UNITS.map(u => {
        const c = COLOR_MAP[u.color];
        return (
          <button key={u.id} onClick={() => onSelectUnit(u.id)}
            className={`${c.card} border-2 rounded-2xl p-4 text-left transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 group`}>
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{u.emoji}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{u.vocabulary.length} words</span>
            </div>
            <p className={`text-xs font-bold uppercase tracking-wide ${c.text} mb-0.5`}>{u.title}</p>
            <p className="font-bold text-slate-800">{u.topic}</p>
            <div className="mt-2.5 flex gap-1.5 text-xs flex-wrap">
              <span className="bg-white/80 rounded-md px-2 py-0.5 text-slate-500">📖 {u.readings.length} readings</span>
              <span className="bg-white/80 rounded-md px-2 py-0.5 text-slate-500">🎧 {u.listenings.length} listenings</span>
              <span className="bg-white/80 rounded-md px-2 py-0.5 text-slate-500">💬 {u.phrases.length} phrases</span>
            </div>
          </button>
        );
      })}
    </div>

    {/* Quick links */}
    <h2 className="text-lg font-bold text-slate-700 mb-3">🔗 Quick Access</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { emoji: '🎧', label: 'Listening Practice', color: 'bg-sky-50 border-sky-200 text-sky-700', page: 'listening' },
        { emoji: '✍️', label: 'Writing Exams', color: 'bg-rose-50 border-rose-200 text-rose-700', page: 'writing' },
        { emoji: '📖', label: 'Grammar & Other', color: 'bg-violet-50 border-violet-200 text-violet-700', page: 'grammar' },
        { emoji: '🏆', label: 'Final Practice', color: 'bg-amber-50 border-amber-200 text-amber-700', page: 'final' },
      ].map(item => (
        <div key={item.page} className={`${item.color} border rounded-xl p-3 text-center text-xs font-semibold`}>
          <p className="text-2xl mb-1">{item.emoji}</p>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  </div>
);
