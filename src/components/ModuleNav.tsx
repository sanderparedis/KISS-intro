import React from 'react';
import { BookOpen, Sparkles, AlertTriangle, Wand2, HelpCircle, Award } from 'lucide-react';
import { StudentSession } from '../types';

interface ModuleNavProps {
  activeModule: string;
  setActiveModule: (mod: string) => void;
  session: StudentSession | null;
}

export const MODULES = [
  { id: 'intro', label: '1. Waarom Presenteren?', icon: BookOpen },
  { id: 'kiss', label: '2. Het KISS-Principe', icon: Sparkles },
  { id: 'spot', label: '3. Spot de Fout', icon: AlertTriangle },
  { id: 'makeover', label: '4. Makeover Studio', icon: Wand2 },
  { id: 'quiz', label: '5. De KISS-Quiz', icon: HelpCircle },
  { id: 'diploma', label: '6. Diploma & Rapport', icon: Award },
];

export const ModuleNav: React.FC<ModuleNavProps> = ({
  activeModule,
  setActiveModule,
  session,
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 overflow-x-auto scrollbar-none py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          const isCompleted = session?.completedModules.includes(mod.id);

          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              id={`nav-${mod.id}`}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-orange-500 text-white shadow-xs font-semibold'
                  : isCompleted
                  ? 'bg-orange-50 text-orange-950 hover:bg-orange-100/70 border border-orange-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isCompleted ? 'text-orange-600' : 'text-slate-400'}`} />
              <span>{mod.label}</span>
              {isCompleted && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
