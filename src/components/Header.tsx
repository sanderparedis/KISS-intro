import React from 'react';
import { User, Users, CheckCircle2, Award, BookOpen, RotateCcw } from 'lucide-react';
import { StudentSession } from '../types';

interface HeaderProps {
  session: StudentSession | null;
  onOpenSessionModal: () => void;
  onOpenTeacherModal: () => void;
  activeModule: string;
  setActiveModule: (mod: string) => void;
  allModulesCount: number;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  onOpenSessionModal,
  onOpenTeacherModal,
  completedCount,
  allModulesCount,
}) => {
  const progressPct = Math.round((completedCount / allModulesCount) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Curriculum tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-xs shadow-orange-500/20">
            K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-slate-900 text-lg tracking-tight">
                KISS Presentaties
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                1ste Middelbaar ICT
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Leerplan Katholiek Onderwijs Vlaanderen (LPD K2 & LPD 6)
            </p>
          </div>
        </div>

        {/* Middle: Progress info */}
        {session && (
          <div className="hidden lg:flex items-center gap-3 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/80">
            <span className="text-xs font-medium text-slate-600">Voortgang les:</span>
            <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700">{progressPct}%</span>
          </div>
        )}

        {/* Right side: Session badge & Teacher link */}
        <div className="flex items-center gap-2">
          {session ? (
            <button
              onClick={onOpenSessionModal}
              id="btn-active-session"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors text-sm font-medium"
              title="Klik om te wisselen van sessie of naam aan te passen"
            >
              <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold">
                {session.studentName.charAt(0).toUpperCase() || 'L'}
              </div>
              <div className="text-left leading-tight max-w-[120px] sm:max-w-[160px] truncate">
                <span className="block font-semibold truncate text-xs sm:text-sm">
                  {session.studentName}
                </span>
                <span className="block text-[11px] text-amber-700 truncate">
                  Klas {session.studentClass}
                </span>
              </div>
              <RotateCcw className="w-3.5 h-3.5 text-amber-600 ml-1 shrink-0" />
            </button>
          ) : (
            <button
              onClick={onOpenSessionModal}
              id="btn-start-session"
              className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Start Sessie</span>
            </button>
          )}

          <button
            onClick={onOpenTeacherModal}
            id="btn-teacher-dashboard"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Leerkrachtpaneel (Overzicht alle leerlingensessies)"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
