import React from 'react';
import { UNITS } from '../data/courseData';

type Page = 'home' | 'unit' | 'listening' | 'writing' | 'grammar' | 'final';

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
  orange: 'text-orange-600 bg-orange-50', yellow: 'text-yellow-600 bg-yellow-50',
  purple: 'text-purple-600 bg-purple-50', indigo: 'text-indigo-600 bg-indigo-50',
};

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, currentUnitId, onNavigate, isOpen, onClose }) => {
  const nav = (page: Page, unitId?: number) => { onNavigate(page, unitId); onClose(); };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>

        {/* Logo */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">UX</span>
            </div>
            <div>
              <p className="font-black text-slate-800 text-sm leading-none">UNLOCK Extra</p>
              <p className="text-xs text-slate-400 mt-0.5">Route 2 · ENG 002</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <button onClick={() => nav('home')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span>🏠</span> Home
          </button>

          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pt-3 pb-1">Units</p>
          {UNITS.map(u => (
            <button key={u.id} onClick={() => nav('unit', u.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${currentPage === 'unit' && currentUnitId === u.id
                  ? `${UNIT_COLORS[u.color]} font-semibold`
                  : 'text-slate-600 hover:bg-slate-50'}`}>
              <span className="text-base">{u.emoji}</span>
              <span className="truncate">{u.topic}</span>
            </button>
          ))}

          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pt-3 pb-1">Resources</p>
          {([
            ['listening', '🎧', 'Listening Practice'],
            ['writing', '✍️', 'Writing Exams'],
            ['grammar', '📖', 'Grammar & Other'],
            ['final', '🏆', 'Final Practice'],
          ] as [Page, string, string][]).map(([page, icon, label]) => (
            <button key={page} onClick={() => nav(page)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <span>{icon}</span> {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">Prepared by Nezaket Özgirin · ELAE</p>
        </div>
      </aside>
    </>
  );
};
