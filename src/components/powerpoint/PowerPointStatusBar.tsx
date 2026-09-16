import React from 'react';
import { 
  FileText, 
  LayoutGrid, 
  BookOpen, 
  Play, 
  ZoomIn, 
  ZoomOut, 
  CheckCircle2, 
  Type, 
  Eye, 
  Sliders
} from 'lucide-react';
import { StudentSession, AccessibilitySettings } from '../../types';

interface PowerPointStatusBarProps {
  currentSlideNum: number;
  totalSlides: number;
  session: StudentSession | null;
  accessibility: AccessibilitySettings;
  onChangeAccessibility: (newSettings: Partial<AccessibilitySettings>) => void;
  showSpeakerNotes: boolean;
  setShowSpeakerNotes: (show: boolean) => void;
  onStartSlideShow: () => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
}

export const PowerPointStatusBar: React.FC<PowerPointStatusBarProps> = ({
  currentSlideNum,
  totalSlides,
  session,
  accessibility,
  onChangeAccessibility,
  showSpeakerNotes,
  setShowSpeakerNotes,
  onStartSlideShow,
  zoomLevel,
  setZoomLevel,
}) => {
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
    <footer className="bg-[#F0F0F0] border-t border-[#D9D9D9] select-none text-slate-700 text-xs px-3 h-8 flex items-center justify-between gap-2 shrink-0 z-30 font-sans print:hidden">
      {/* Left items */}
      <div className="flex items-center gap-3 truncate">
        <span className="font-semibold text-[11px] text-slate-800">
          Dia {currentSlideNum} van {totalSlides}
        </span>

        <span className="hidden sm:inline text-slate-300">|</span>

        <span className="hidden sm:inline text-[11px] text-slate-600">
          Nederlands (België)
        </span>

        <span className="hidden md:inline text-slate-300">|</span>

        <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Toegankelijkheid: Goedgekeurd</span>
        </div>

        {session && (
          <>
            <span className="hidden lg:inline text-slate-300">|</span>
            <span className="hidden lg:inline text-[11px] text-slate-600 truncate">
              Sessie: <strong className="text-slate-900">{session.studentName}</strong> ({session.studentClass})
            </span>
          </>
        )}
      </div>

      {/* Center: Dyslexia status quick toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChangeAccessibility({ dyslexiaFont: !accessibility.dyslexiaFont })}
          className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 transition-colors ${
            accessibility.dyslexiaFont
              ? 'bg-amber-200 text-amber-950 border border-amber-300'
              : 'hover:bg-slate-200 text-slate-700'
          }`}
          title="Schakel dyslexievriendelijk lettertype in of uit"
        >
          <Type className="w-3 h-3 text-[#D24726]" />
          <span>Dyslexie-stand: {accessibility.dyslexiaFont ? 'AAN' : 'UIT'}</span>
        </button>
      </div>

      {/* Right items: Speaker notes, Views, Zoom and Font size controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Speaker Notes Toggle */}
        <button
          onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
          className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
            showSpeakerNotes
              ? 'bg-[#D24726] text-white'
              : 'hover:bg-slate-200 text-slate-700'
          }`}
          title="Sprekersnotities in- of uitschakelen"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Notities</span>
        </button>

        {/* View mode icons */}
        <div className="hidden sm:flex items-center gap-1 border-l border-slate-300 pl-2">
          <button
            onClick={onStartSlideShow}
            className="p-1 hover:bg-slate-200 rounded text-slate-700 hover:text-[#D24726]"
            title="Diavoorstelling starten (F5)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Accessible Font Size Adjuster A- / A+ */}
        <div className="flex items-center gap-1 border-l border-slate-300 pl-2">
          <span className="text-[10px] text-slate-500 hidden sm:inline">Tekst:</span>
          <button
            onClick={handleDecreaseFont}
            disabled={accessibility.fontSize === 'small'}
            className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-slate-200 hover:bg-slate-300 rounded disabled:opacity-30"
            title="Lettertype kleiner maken"
          >
            -
          </button>
          <span className="text-[11px] font-mono font-bold px-1 text-[#D24726]">
            {accessibility.fontSize === 'small' ? '14pt' : accessibility.fontSize === 'normal' ? '16pt' : accessibility.fontSize === 'large' ? '18pt' : '21pt'}
          </span>
          <button
            onClick={handleIncreaseFont}
            disabled={accessibility.fontSize === 'xlarge'}
            className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-slate-200 hover:bg-slate-300 rounded disabled:opacity-30"
            title="Lettertype groter maken"
          >
            +
          </button>
        </div>

        {/* Zoom slider */}
        <div className="hidden md:flex items-center gap-1 border-l border-slate-300 pl-2">
          <button
            onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))}
            className="text-slate-500 hover:text-slate-800"
            title="Uitzoomen"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <input
            type="range"
            min={80}
            max={120}
            step={5}
            value={zoomLevel}
            onChange={(e) => setZoomLevel(Number(e.target.value))}
            className="w-16 sm:w-20 accent-[#D24726] h-1"
          />

          <button
            onClick={() => setZoomLevel(Math.min(120, zoomLevel + 10))}
            className="text-slate-500 hover:text-slate-800"
            title="Inzoomen"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono w-9 text-right font-medium">
            {zoomLevel}%
          </span>
        </div>
      </div>
    </footer>
  );
};
