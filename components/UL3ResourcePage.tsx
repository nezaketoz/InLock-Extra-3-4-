import React from 'react';
import { UL3_LE_PRACTICE, UL3_MIDTERM_PRACTICE, UL3_READING_PACKS, UL3_WRITING_RESOURCES, ResourceLink } from '../data/courseData';

type Section = 'ul3-le' | 'ul3-midterm' | 'ul3-reading' | 'ul3-writing';

const ICONS: Record<string, string> = {
  flashcard: '🃏', reading: '📄', quiz: '✏️', video: '▶️',
  grammar: '📖', writing: '✍️', speaking: '🎙️', other: '🔗',
};

const LinkRow: React.FC<{ r: ResourceLink }> = ({ r }) => (
  <div className={`flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 ${r.url ? 'hover:border-indigo-300 hover:shadow-sm transition-all' : 'opacity-60'}`}>
    <span className="text-lg">{ICONS[r.type] || '🔗'}</span>
    <span className="text-sm font-medium text-slate-700 flex-1">{r.label}</span>
    {r.url
      ? <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 font-semibold hover:underline">Open ↗</a>
      : <span className="text-xs text-slate-400">⚠️ Link needed</span>
    }
  </div>
);

export const UL3ResourcePage: React.FC<{ section: Section }> = ({ section }) => {
  const configs: Record<Section, { title: string; emoji: string; desc: string; links: ResourceLink[] }> = {
    'ul3-le':      { title: 'LE Practice', emoji: '📋', desc: 'Language exam practice sets with answer keys.', links: UL3_LE_PRACTICE },
    'ul3-midterm': { title: 'Midterm Practice', emoji: '📝', desc: 'All midterm practice sets with answer keys, grammar revision and error correction.', links: UL3_MIDTERM_PRACTICE },
    'ul3-reading': { title: 'Reading Packs', emoji: '📖', desc: 'Reading practice packs with answer keys.', links: UL3_READING_PACKS },
    'ul3-writing': { title: 'Writing, Grammar & Other', emoji: '✍️', desc: 'Writing tutors, grammar resources, word formation and speaking practice.', links: UL3_WRITING_RESOURCES },
  };
  const cfg = configs[section];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-up">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">Unlock 3</span>
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-1">{cfg.emoji} {cfg.title}</h1>
      <p className="text-slate-500 text-sm mb-6">{cfg.desc}</p>
      <div className="space-y-2">
        {cfg.links.map((r, i) => <LinkRow key={i} r={r} />)}
      </div>
    </div>
  );
};
