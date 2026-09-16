import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Monitor, Type } from 'lucide-react';
import { StudentSession, AccessibilitySettings } from '../../types';

interface SlideShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: string;
  setActiveModule: (mod: string) => void;
  session: StudentSession | null;
  accessibility: AccessibilitySettings;
  children: React.ReactNode;
}

const MODULE_ORDER = ['intro', 'kiss', 'spot', 'makeover', 'quiz', 'diploma'];

export const SlideShowModal: React.FC<SlideShowModalProps> = ({
  isOpen,
  onClose,
  activeModule,
  setActiveModule,
  children,
}) => {
  if (!isOpen) return null;

  const currentIndex = MODULE_ORDER.indexOf(activeModule);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveModule(MODULE_ORDER[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < MODULE_ORDER.length - 1) {
      setActiveModule(MODULE_ORDER[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none animate-in fade-in duration-200">
      {/* Top Slide Show Bar (fades on hover) */}
      <div className="p-3 flex items-center justify-between text-white/70 hover:text-white transition-opacity bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Monitor className="w-4 h-4 text-[#D24726]" />
          <span>Diavoorstelling (Dia {currentIndex + 1} van {MODULE_ORDER.length})</span>
          <span className="text-white/40">|</span>
          <span className="text-white/60">Druk op [Esc] om af te sluiten, [Pijltjes] om te bladeren</span>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-xs font-bold transition-colors flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          <span>Sluiten (Esc)</span>
        </button>
      </div>

      {/* Main Slide Presentation Canvas */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
        <div className="w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-700">
          {children}
        </div>
      </div>

      {/* Bottom Floating Control Pill */}
      <div className="p-4 flex items-center justify-center gap-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-full px-4 py-2 text-white text-xs shadow-xl">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1 hover:bg-slate-800 rounded-full disabled:opacity-30"
            title="Vorige dia"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-mono font-bold px-2">
            {currentIndex + 1} / {MODULE_ORDER.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === MODULE_ORDER.length - 1}
            className="p-1 hover:bg-slate-800 rounded-full disabled:opacity-30"
            title="Volgende dia"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
