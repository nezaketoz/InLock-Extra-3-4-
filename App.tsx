import React, { useState } from 'react';
import { UNITS } from './data/courseData';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { UnitPage } from './components/UnitPage';
import { FlashcardMode } from './components/FlashcardMode';
import { QuizMode } from './components/QuizMode';
import { ResourcePage } from './components/ResourcePage';

type Page = 'home' | 'unit' | 'listening' | 'writing' | 'grammar' | 'final';
type Mode = 'browse' | 'flashcards' | 'quiz';
type PracticeMode = 'vocab' | 'phrases';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [unitId, setUnitId] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('browse');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('vocab');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (newPage: Page, id?: number) => {
    setPage(newPage);
    if (id !== undefined) setUnitId(id);
    setMode('browse');
  };

  const unit = unitId !== null ? UNITS.find(u => u.id === unitId) ?? null : null;

  const startFlashcards = (pm: PracticeMode) => { setPracticeMode(pm); setMode('flashcards'); };
  const startQuiz       = (pm: PracticeMode) => { setPracticeMode(pm); setMode('quiz'); };
  const exitPractice    = () => setMode('browse');

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        currentPage={page}
        currentUnitId={unitId}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 flex items-center gap-3 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {mode !== 'browse' && (
            <button onClick={exitPractice} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          <div className="flex-1">
            {page === 'home' && <p className="font-bold text-slate-700 text-sm">Home</p>}
            {page === 'unit' && unit && (
              <p className="font-bold text-slate-700 text-sm">
                {unit.emoji} {unit.title} – {unit.topic}
                {mode === 'flashcards' && <span className="ml-2 text-indigo-600">· Flashcards</span>}
                {mode === 'quiz' && <span className="ml-2 text-emerald-600">· Quiz</span>}
              </p>
            )}
            {page === 'listening' && <p className="font-bold text-slate-700 text-sm">🎧 Listening Practice</p>}
            {page === 'writing'   && <p className="font-bold text-slate-700 text-sm">✍️ Writing Exams</p>}
            {page === 'grammar'   && <p className="font-bold text-slate-700 text-sm">📖 Grammar & Other</p>}
            {page === 'final'     && <p className="font-bold text-slate-700 text-sm">🏆 Final Practice</p>}
          </div>
          <div className="text-xs text-slate-400 hidden sm:block">Sabancı University · ELAE</div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {page === 'home' && <HomePage onSelectUnit={id => navigate('unit', id)} />}

          {page === 'unit' && unit && mode === 'browse' && (
            <UnitPage unit={unit} onFlashcards={startFlashcards} onQuiz={startQuiz} />
          )}
          {page === 'unit' && unit && mode === 'flashcards' && (
            <FlashcardMode unit={unit} mode={practiceMode} onExit={exitPractice} />
          )}
          {page === 'unit' && unit && mode === 'quiz' && (
            <QuizMode unit={unit} mode={practiceMode} onExit={exitPractice} />
          )}

          {(page === 'listening' || page === 'writing' || page === 'grammar' || page === 'final') && (
            <ResourcePage section={page} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
