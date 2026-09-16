import React from 'react';
import { 
  Save, 
  RotateCcw, 
  RotateCw, 
  Play, 
  Search, 
  User, 
  Users, 
  Minus, 
  Square, 
  X, 
  Eye, 
  Type, 
  Sparkles,
  CloudCheck
} from 'lucide-react';
import { StudentSession, AccessibilitySettings } from '../../types';

interface PowerPointTitleBarProps {
  session: StudentSession | null;
  accessibility: AccessibilitySettings;
  onChangeAccessibility: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenSessionModal: () => void;
  onOpenTeacherModal: () => void;
  onStartSlideShow: () => void;
}

export const PowerPointTitleBar: React.FC<PowerPointTitleBarProps> = ({
  session,
  accessibility,
  onChangeAccessibility,
  onOpenSessionModal,
  onOpenTeacherModal,
  onStartSlideShow,
}) => {
  const fontSizeLabels: Record<string, string> = {
    small: '14pt',
    normal: '16pt',
    large: '18pt',
    xlarge: '21pt',
  };

  const handleDecreaseFont = () => {
    const sequence: AccessibilitySettings['fontSize'][] = ['small', 'normal', 'large', 'xlarge'];
    const currIdx = sequence.indexOf(accessibility.fontSize);
    if (currIdx > 0) {
      onChangeAccessibility({ fontSize: sequence[currIdx - 1] });
    }
  };

  const handleIncreaseFont = () => {
    const sequence: AccessibilitySettings['fontSize'][] = ['small', 'normal', 'large', 'xlarge'];
    const currIdx = sequence.indexOf(accessibility.fontSize);
    if (currIdx < sequence.length - 1) {
      onChangeAccessibility({ fontSize: sequence[currIdx + 1] });
    }
  };

  return (
    <div className="bg-[#D24726] text-white select-none border-b border-[#B83B1D] text-xs font-sans">
      <div className="flex items-center justify-between px-2 sm:px-3 h-10 gap-2">
        {/* Left: Quick Access Toolbar */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* PowerPoint 'P' Logo */}
          <div className="w-6 h-6 rounded bg-white text-[#D24726] flex items-center justify-center font-black text-sm shadow-xs font-sans">
            P
          </div>

          <div className="hidden sm:flex items-center gap-0.5 ml-1">
            <button
              className="p-1.5 hover:bg-black/15 rounded text-white/90 hover:text-white transition-colors"
              title="Automatisch opgeslagen in jouw leerlingensessie"
            >
              <Save className="w-3.5 h-3.5" />
            </button>
            <button
              className="p-1.5 hover:bg-black/15 rounded text-white/90 hover:text-white transition-colors"
              title="Ongedaan maken"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              className="p-1.5 hover:bg-black/15 rounded text-white/90 hover:text-white transition-colors"
              title="Opnieuw uitvoeren"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onStartSlideShow}
              className="p-1.5 hover:bg-black/15 rounded text-white hover:text-amber-200 transition-colors"
              title="Diavoorstelling starten (F5)"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Center: Presentation Name */}
        <div className="flex items-center gap-2 max-w-[280px] sm:max-w-md truncate">
          <span className="font-semibold text-xs sm:text-sm truncate">
            KISS_Presentaties_Introductieles_1steMiddelbaar.pptx
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-white/80 bg-black/15 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Opgeslagen
          </span>
        </div>

        {/* Right side: Accessibility (Font size & Dyslexie) + Student Session + Window controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dyslexia quick button */}
          <button
            onClick={() => onChangeAccessibility({ dyslexiaFont: !accessibility.dyslexiaFont })}
            className={`px-2 py-1 rounded text-xs font-bold transition-all flex items-center gap-1.5 border ${
              accessibility.dyslexiaFont
                ? 'bg-amber-300 text-slate-900 border-amber-400 shadow-xs'
                : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
            }`}
            title="Schakel dyslexievriendelijk lettertype (Lexend) in of uit"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dyslexie-lettertype:</span>
            <span>{accessibility.dyslexiaFont ? 'AAN' : 'UIT'}</span>
          </button>

          {/* Font Size A- / A+ Controls */}
          <div className="flex items-center bg-white/15 rounded border border-white/20 p-0.5">
            <button
              onClick={handleDecreaseFont}
              disabled={accessibility.fontSize === 'small'}
              className="px-1.5 py-0.5 hover:bg-white/20 rounded text-[11px] font-bold disabled:opacity-40"
              title="Lettergrootte verkleinen"
            >
              A-
            </button>
            <span className="px-1.5 text-[11px] font-mono font-bold text-amber-200">
              {fontSizeLabels[accessibility.fontSize]}
            </span>
            <button
              onClick={handleIncreaseFont}
              disabled={accessibility.fontSize === 'xlarge'}
              className="px-1.5 py-0.5 hover:bg-white/20 rounded text-[11px] font-bold disabled:opacity-40"
              title="Lettergrootte vergroten"
            >
              A+
            </button>
          </div>

          {/* Student Session Pill */}
          {session ? (
            <button
              onClick={onOpenSessionModal}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded border border-white/20 transition-colors text-left"
              title="Jouw lessessie (eigen tempo). Klik om een nieuwe sessie te starten of van sessie te wisselen."
            >
              <div className="w-5 h-5 rounded-full bg-white text-[#D24726] flex items-center justify-center text-[10px] font-bold">
                ✓
              </div>
              <span className="font-semibold text-xs truncate max-w-[100px] sm:max-w-[140px]">
                {session.studentName}
              </span>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded text-amber-200 hidden md:inline">
                Eigen tempo
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenSessionModal}
              className="px-2 py-1 bg-white text-[#D24726] font-bold rounded text-xs"
            >
              Start Sessie
            </button>
          )}

          {/* Teacher overview button */}
          <button
            onClick={onOpenTeacherModal}
            className="p-1 hover:bg-black/15 rounded text-white/90 hover:text-white"
            title="Leerkrachtenpaneel"
          >
            <Users className="w-4 h-4" />
          </button>

          {/* Window control buttons */}
          <div className="hidden lg:flex items-center ml-1">
            <button className="p-1.5 hover:bg-black/15 text-white/80">
              <Minus className="w-3 h-3" />
            </button>
            <button className="p-1.5 hover:bg-black/15 text-white/80">
              <Square className="w-2.5 h-2.5" />
            </button>
            <button className="p-1.5 hover:bg-red-700 text-white/80">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
