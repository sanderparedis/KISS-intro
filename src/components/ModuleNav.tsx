import React from 'react';
import { BookOpen, Sparkles, AlertTriangle, HelpCircle, Award, Lock } from 'lucide-react';
import { StudentSession } from '../types';

interface ModuleNavProps {
  activeModule: string;
  setActiveModule: (mod: string) => void;
  session: StudentSession | null;
}

export const MODULES = [
  { id: 'intro', label: '1. Waarom Presenteren?', icon: BookOpen },
  { id: 'kiss', label: '2. Het KISS-Principe', icon: Sparkles },
  { id: 'spot', label: '3. Spot de Fout (Klassikaal)', icon: AlertTriangle },
  { id: 'quiz', label: '4. De KISS-Quiz', icon: HelpCircle },
  { id: 'diploma', label: '5. Jouw Score & Feedback', icon: Award },
];

export const ModuleNav: React.FC<ModuleNavProps> = ({
  activeModule,
  setActiveModule,
  session,
}) => {
  const quizAnswersCount = Object.keys(session?.quizAnswers || {}).length;
  const isQuizFullyAnswered = session?.quizCompleted || quizAnswersCount >= 8;

  return (
    <nav className="bg-white border-b border-slate-200 overflow-x-auto scrollbar-none py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          const isCompleted = session?.completedModules.includes(mod.id);
          const isLocked = mod.id === 'diploma' && !isQuizFullyAnswered;

          return (
            <button
              key={mod.id}
              disabled={isLocked}
              onClick={() => {
                if (!isLocked) {
                  setActiveModule(mod.id);
                }
              }}
              id={`nav-${mod.id}`}
              title={isLocked ? 'Beantwoord eerst alle 8 vragen van de quiz om te ontgrendelen' : undefined}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                isLocked
                  ? 'opacity-45 text-slate-400 cursor-not-allowed bg-slate-50'
                  : isActive
                  ? 'bg-orange-500 text-white shadow-xs font-semibold'
                  : isCompleted
                  ? 'bg-orange-50 text-orange-950 hover:bg-orange-100/70 border border-orange-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isLocked ? (
                <Lock className="w-4 h-4 text-slate-400" />
              ) : (
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isCompleted ? 'text-orange-600' : 'text-slate-400'}`} />
              )}
              <span>{mod.label}</span>
              {isLocked && (
                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
                  vergrendeld
                </span>
              )}
              {isCompleted && !isActive && !isLocked && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
