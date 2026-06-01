import React from 'react';
import { LISTENING_RESOURCES, WRITING_RESOURCES, GRAMMAR_RESOURCES, FINAL_PRACTICE_RESOURCES, ResourceLink } from '../data/courseData';

type Section = 'listening' | 'writing' | 'grammar' | 'final';

const ICONS: Record<string, string> = {
  flashcard: '🃏', reading: '📄', quiz: '✏️', video: '▶️',
  grammar: '📖', writing: '✍️', speaking: '🎙️', other: '🔗',
};

const LinkRow: React.FC<{ r: ResourceLink }> = ({ r }) => (
  <div className={`flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 ${r.url ? 'hover:border-indigo-300 hover:shadow-sm transition-all' : 'opacity-60'}`}>
    <span className="text-lg">{ICONS[r.type] || '🔗'}</span>
    <span className="text-sm font-medium text-slate-700 flex-1">{r.label}</span>
    {r.url ? (
      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 font-semibold hover:underline">Open ↗</a>
    ) : (
      <span className="text-xs text-slate-400">⚠️ Link needed</span>
    )}
  </div>
);

export const ResourcePage: React.FC<{ section: Section }> = ({ section }) => {
  if (section === 'listening') return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-up">
      <h1 className="text-2xl font-black text-slate-800 mb-1">🎧 Listening Practice</h1>
      <p className="text-slate-500 text-sm mb-6">Extra listening materials for all units.</p>
      <div className="space-y-3">
        {LISTENING_RESOURCES.map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="font-semibold text-slate-800 mb-3">🎧 {item.topic}</p>
            <div className="flex flex-wrap gap-2">
              {item.tapUrl !== undefined && (
                <a href={item.tapUrl || '#'} target="_blank" rel="noopener noreferrer"
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 ${item.tapUrl ? 'bg-sky-100 text-sky-700 hover:bg-sky-200' : 'bg-slate-100 text-slate-400'}`}>
                  ▶️ Tape / Audio {!item.tapUrl && '(coming soon)'}
                </a>
              )}
              {item.taskUrl !== undefined && (
                <a href={item.taskUrl || '#'} target="_blank" rel="noopener noreferrer"
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 ${item.taskUrl ? 'bg-violet-100 text-violet-700 hover:bg-violet-200' : 'bg-slate-100 text-slate-400'}`}>
                  📝 Task {!item.taskUrl && '(coming soon)'}
                </a>
              )}
              {item.akUrl !== undefined && (
                <a href={item.akUrl || '#'} target="_blank" rel="noopener noreferrer"
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 ${item.akUrl ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                  ✅ Answer Key {!item.akUrl && '(coming soon)'}
                </a>
              )}
              {(item as any).onlineUrl !== undefined && (
                <a href={(item as any).onlineUrl || '#'} target="_blank" rel="noopener noreferrer"
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${(item as any).onlineUrl ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>
                  🌐 Online Listening {!(item as any).onlineUrl && '(coming soon)'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const configs: Record<Exclude<Section, 'listening'>, { title: string; emoji: string; desc: string; links: ResourceLink[] }> = {
    writing: { title: 'Writing Exams', emoji: '✍️', desc: 'Writing exam practice tasks, planning sheets and sample essays.', links: WRITING_RESOURCES },
    grammar: { title: 'Grammar & Other Resources', emoji: '📖', desc: 'Grammar packs, word formation, paraphrasing and revision materials.', links: GRAMMAR_RESOURCES },
    final:   { title: 'Final Practice', emoji: '🏆', desc: 'Final exam preparation and oral practice resources.', links: FINAL_PRACTICE_RESOURCES },
  };
  const cfg = configs[section as Exclude<Section, 'listening'>];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-up">
      <h1 className="text-2xl font-black text-slate-800 mb-1">{cfg.emoji} {cfg.title}</h1>
      <p className="text-slate-500 text-sm mb-6">{cfg.desc}</p>
      <div className="space-y-2">
        {cfg.links.map((r, i) => <LinkRow key={i} r={r} />)}
      </div>
    </div>
  );
};
