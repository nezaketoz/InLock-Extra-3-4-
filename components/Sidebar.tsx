import React, { useState } from 'react';
import { UNITS, UL3_UNITS } from '../data/courseData';

type Page = 'home' | 'unit' | 'listening' | 'writing' | 'grammar' | 'final' | 'ul3-le' | 'ul3-midterm' | 'ul3-reading' | 'ul3-writing';

interface SidebarProps {
  currentPage: Page;
  currentUnitId: number | null;
  onNavigate: (page: Page, unitId?: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const UNIT_COLORS: Record<string, string> = {
  blue: 'text-blue-600 bg-blue-50', emerald: 'text-emerald-600 bg-emerald-50',
  rose: 'text-rose-600 bg-rose-50', green: 'text-green-600 bg-green-50',
  orange: 'text-orange-600 bg-orange-50', yellow: 'text-yellow-700 bg-yellow-50',
  purple: 'text-purple-600 bg-purple-50', indigo: 'text-indigo-600 bg-indigo-50',
  amber: 'text-amber-600 bg-amber-50', teal: 'text-teal-600 bg-teal-50',
  sky: 'text-sky-600 bg-sky-50', pink: 'text-pink-600 bg-pink-50',
  violet: 'text-violet-600 bg-violet-50',
};

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, currentUnitId, onNavigate, isOpen, onClose }) => {
  const [book, setBook] = useState<'ul3' | 'ul4'>('ul4');
  const nav = (page: Page, unitId?: number) => { onNavigate(page, unitId); onClose(); };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>

        {/* Logo */}
        <div className="p-4 border-b border-slate-100">
          <button onClick={() => nav('home')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white font-black text-sm">UX</span>
            </div>
            <div className="text-left">
              <p className="font-black text-slate-800 text-sm leading-none">UNLOCK Extra</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-tight">Intermediate English Course</p>
            </div>
          </button>
        </div>

        {/* Book toggle */}
        <div className="px-3 pt-3 pb-1">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button onClick={() => setBook('ul3')}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${book === 'ul3' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>
              Unlock 3
            </button>
            <button onClick={() => setBook('ul4')}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${book === 'ul4' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>
              Unlock 4
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <button onClick={() => nav('home')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span>🏠</span> Home
          </button>

          {/* Units */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pt-3 pb-1">
            {book === 'ul3' ? 'Unlock 3 Units' : 'Unlock 4 Units'}
          </p>
          {(book === 'ul3' ? UL3_UNITS : UNITS).map(u => (
            <button key={u.id} onClick={() => nav('unit', u.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${currentPage === 'unit' && currentUnitId === u.id
                  ? `${UNIT_COLORS[u.color]} font-semibold`
                  : 'text-slate-600 hover:bg-slate-50'}`}>
              <span className="text-base flex-shrink-0">{u.emoji}</span>
              <span className="truncate">{u.topic}</span>
            </button>
          ))}

          {/* Resources */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pt-3 pb-1">
            {book === 'ul3' ? 'UL3 Resources' : 'UL4 Resources'}
          </p>
          {book === 'ul3' ? (
            <>
              {([
                ['ul3-le',      '📋', 'LE Practice'],
                ['ul3-midterm', '📝', 'Midterm Practice'],
                ['ul3-reading', '📖', 'Reading Packs'],
                ['ul3-writing', '✍️', 'Writing & Grammar'],
              ] as [Page, string, string][]).map(([page, icon, label]) => (
                <button key={page} onClick={() => nav(page)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </>
          ) : (
            <>
              {([
                ['listening', '🎧', 'Listening Practice'],
                ['writing',   '✍️', 'Writing Exams'],
                ['grammar',   '📖', 'Grammar & Other'],
                ['final',     '🏆', 'Final Practice'],
              ] as [Page, string, string][]).map(([page, icon, label]) => (
                <button key={page} onClick={() => nav(page)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </>
          )}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">Prepared by Nezaket Özgirin · ELAE</p>
        </div>
      </aside>
    </>
  );
};
