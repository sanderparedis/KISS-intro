import React, { useState } from 'react';
import { 
  Type, 
  Sparkles, 
  Image as ImageIcon, 
  Palette, 
  Play, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  FileText, 
  List, 
  Check, 
  ShieldCheck, 
  Info,
  Maximize2,
  ChevronDown
} from 'lucide-react';
import { AccessibilitySettings } from '../../types';

interface PowerPointRibbonProps {
  activeTab: 'home' | 'insert' | 'design' | 'slideshow' | 'accessibility';
  setActiveTab: (tab: 'home' | 'insert' | 'design' | 'slideshow' | 'accessibility') => void;
  accessibility: AccessibilitySettings;
  onChangeAccessibility: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenBackstage: () => void;
  onStartSlideShow: () => void;
  onNewSlideJump: () => void;
}

export const PowerPointRibbon: React.FC<PowerPointRibbonProps> = ({
  activeTab,
  setActiveTab,
  accessibility,
  onChangeAccessibility,
  onOpenBackstage,
  onStartSlideShow,
  onNewSlideJump,
}) => {
  const tabs = [
    { id: 'home', label: 'Start' },
    { id: 'insert', label: 'Invoegen' },
    { id: 'design', label: 'Ontwerpen' },
    { id: 'slideshow', label: 'Diavoorstelling' },
    { id: 'accessibility', label: 'Toegankelijkheid & Dyslexie' },
  ];

  const fontSizeLabels: Record<string, string> = {
    small: '14 pt',
    normal: '16 pt',
    large: '18 pt',
    xlarge: '21 pt',
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
    <div className="bg-[#F3F2F1] border-b border-[#E1DFDD] select-none text-slate-800 text-xs shadow-2xs font-sans">
      {/* Ribbon Tabs Header */}
      <div className="flex items-center px-2 pt-1 gap-1 border-b border-[#E1DFDD]/70 overflow-x-auto scrollbar-none">
        {/* Bestand button (Dark red Office style) */}
        <button
          onClick={onOpenBackstage}
          className="px-3.5 py-1.5 bg-[#D24726] hover:bg-[#B83B1D] text-white font-bold rounded-t text-xs transition-colors"
        >
          Bestand
        </button>

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isA11y = tab.id === 'accessibility';
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-t text-xs font-medium transition-all relative whitespace-nowrap ${
                isActive
                  ? 'bg-white text-slate-900 border-t-2 border-t-[#D24726] shadow-2xs font-semibold'
                  : isA11y
                  ? 'text-[#D24726] font-bold hover:bg-orange-100/60'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
              {isA11y && !isActive && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-orange-200 text-[#D24726] font-extrabold">
                  A+ / Dyslexie
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Ribbon Command Strip */}
      <div className="h-24 px-3 py-2 bg-white flex items-center gap-4 overflow-x-auto scrollbar-none">
        {/* TAB: START (HOME) */}
        {activeTab === 'home' && (
          <div className="flex items-center gap-4 divide-x divide-slate-200 h-full">
            {/* Group: Dia's */}
            <div className="flex flex-col justify-between h-full pr-4">
              <button
                onClick={onNewSlideJump}
                className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-800 transition-colors"
              >
                <div className="w-7 h-5 border-2 border-dashed border-[#D24726] rounded-xs flex items-center justify-center text-[#D24726] font-bold text-xs">
                  +
                </div>
                <span className="text-[11px] font-semibold mt-1">Dia Kiezen</span>
              </button>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Dia's</span>
            </div>

            {/* Group: Lettertype & Dyslexie */}
            <div className="flex flex-col justify-between h-full pl-4 pr-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  {/* Font picker */}
                  <select
                    value={accessibility.dyslexiaFont ? 'lexend' : 'standard'}
                    onChange={(e) =>
                      onChangeAccessibility({ dyslexiaFont: e.target.value === 'lexend' })
                    }
                    className="px-2 py-0.5 border border-slate-300 rounded text-xs bg-slate-50 font-medium text-slate-800 focus:outline-hidden"
                  >
                    <option value="standard">Plus Jakarta Sans (Standaard)</option>
                    <option value="lexend">Lexend (Dyslexievriendelijk)</option>
                  </select>

                  {/* Font size dropdown */}
                  <select
                    value={accessibility.fontSize}
                    onChange={(e) =>
                      onChangeAccessibility({ fontSize: e.target.value as any })
                    }
                    className="px-1.5 py-0.5 border border-slate-300 rounded text-xs bg-slate-50 font-mono text-slate-800 focus:outline-hidden font-bold"
                  >
                    <option value="small">14 pt (Klein)</option>
                    <option value="normal">16 pt (Standaard)</option>
                    <option value="large">18 pt (Groot)</option>
                    <option value="xlarge">21 pt (Extra Groot)</option>
                  </select>

                  {/* A- / A+ buttons */}
                  <button
                    onClick={handleDecreaseFont}
                    disabled={accessibility.fontSize === 'small'}
                    className="px-1.5 py-0.5 border border-slate-300 rounded hover:bg-slate-100 text-xs font-bold disabled:opacity-40"
                    title="Lettergrootte verkleinen"
                  >
                    A-
                  </button>
                  <button
                    onClick={handleIncreaseFont}
                    disabled={accessibility.fontSize === 'xlarge'}
                    className="px-1.5 py-0.5 border border-slate-300 rounded hover:bg-slate-100 text-xs font-bold disabled:opacity-40"
                    title="Lettergrootte vergroten"
                  >
                    A+
                  </button>
                </div>

                {/* Styling icons */}
                <div className="flex items-center gap-1">
                  <span className="p-1 rounded bg-slate-100 text-slate-700 font-bold text-xs" title="Vetgedrukt">B</span>
                  <span className="p-1 rounded hover:bg-slate-100 text-slate-700 italic text-xs" title="Cursief">I</span>
                  <span className="p-1 rounded hover:bg-slate-100 text-slate-700 underline text-xs" title="Onderstrepen">U</span>
                  <span className="mx-1 text-slate-300">|</span>
                  <button
                    onClick={() => onChangeAccessibility({ dyslexiaFont: !accessibility.dyslexiaFont })}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded flex items-center gap-1 ${
                      accessibility.dyslexiaFont
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Type className="w-3 h-3 text-[#D24726]" />
                    <span>Dyslexie-font: {accessibility.dyslexiaFont ? 'AAN' : 'UIT'}</span>
                  </button>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Lettertype</span>
            </div>

            {/* Group: Alinea & 6x6 Regel */}
            <div className="flex flex-col justify-between h-full pl-4 pr-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 border border-orange-200 rounded text-center">
                  <List className="w-4 h-4 text-[#D24726] mx-auto" />
                  <span className="text-[10px] font-extrabold text-[#D24726] block">6x6 Regel</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">
                  <span className="block font-bold">Opsomming</span>
                  <span>Max. 6 regels / 6 woorden</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Alinea</span>
            </div>
          </div>
        )}

        {/* TAB: INVOEGEN */}
        {activeTab === 'insert' && (
          <div className="flex items-center gap-4 divide-x divide-slate-200 h-full">
            <div className="flex flex-col justify-between h-full pr-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center p-1 hover:bg-slate-100 rounded text-slate-700">
                  <ImageIcon className="w-5 h-5 text-[#D24726]" />
                  <span className="text-[11px] mt-0.5">Afbeelding</span>
                </div>
                <div className="flex flex-col items-center p-1 hover:bg-slate-100 rounded text-slate-700">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] mt-0.5">Bronvermelding</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Afbeeldingen (LPD 6)</span>
            </div>

            <div className="flex flex-col justify-between h-full pl-4">
              <div className="text-[11px] text-slate-600 max-w-xs">
                <strong>Wenk leerplan:</strong> Gebruik rechtenvrije beelden (bv. Pixabay, Unsplash) en behoud de originele verhouding door aan de hoeken te trekken.
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Mediawijsheid</span>
            </div>
          </div>
        )}

        {/* TAB: ONTWERPEN */}
        {activeTab === 'design' && (
          <div className="flex items-center gap-4 divide-x divide-slate-200 h-full">
            <div className="flex flex-col justify-between h-full pr-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded text-center text-[10px] font-bold border border-slate-700">
                  Donker thema
                </div>
                <div className="p-2 bg-white text-slate-900 rounded text-center text-[10px] font-bold border border-slate-300">
                  Licht thema
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Thema's</span>
            </div>

            <div className="flex flex-col justify-between h-full pl-4">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-orange-600" />
                <div className="text-[11px] text-slate-700">
                  <strong>Contrastcontrole:</strong> Minstens 4.5:1 contrast vereist voor beamers in het klaslokaal.
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Kleurcontrast</span>
            </div>
          </div>
        )}

        {/* TAB: DIAVOORSTELLING */}
        {activeTab === 'slideshow' && (
          <div className="flex items-center gap-4 divide-x divide-slate-200 h-full">
            <div className="flex flex-col justify-between h-full pr-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={onStartSlideShow}
                  className="flex flex-col items-center p-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded text-orange-950 font-bold"
                >
                  <Play className="w-5 h-5 text-[#D24726] fill-current" />
                  <span className="text-[11px] mt-0.5">Vanaf het begin (F5)</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Starten</span>
            </div>

            <div className="flex flex-col justify-between h-full pl-4">
              <div className="text-[11px] text-slate-600">
                Tijdens het presenteren gebruik je de dia's als decor. Lees niet voor!
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Presentatietips</span>
            </div>
          </div>
        )}

        {/* TAB: TOEGANKELIJKHEID & DYSLEXIE (Crucial feature!) */}
        {activeTab === 'accessibility' && (
          <div className="flex items-center gap-4 divide-x divide-slate-200 h-full">
            {/* Dyslexia Font Toggle */}
            <div className="flex flex-col justify-between h-full pr-4">
              <button
                onClick={() =>
                  onChangeAccessibility({ dyslexiaFont: !accessibility.dyslexiaFont })
                }
                className={`p-2 rounded-xl flex items-center gap-2.5 transition-all border ${
                  accessibility.dyslexiaFont
                    ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black ${
                    accessibility.dyslexiaFont ? 'bg-[#D24726] text-white' : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  Aa
                </div>
                <div className="text-left">
                  <span className="block font-extrabold text-xs">
                    Dyslexie-lettertype (Lexend)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {accessibility.dyslexiaFont ? 'Nu actief (letters dansen minder)' : 'Klik om in te schakelen'}
                  </span>
                </div>
              </button>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Typografie</span>
            </div>

            {/* Font Size Scaling */}
            <div className="flex flex-col justify-between h-full pl-4 pr-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-700 block">
                  Lettergrootte aanpassen:
                </span>
                <div className="flex items-center gap-1">
                  {(['small', 'normal', 'large', 'xlarge'] as const).map((sz) => {
                    const isCur = accessibility.fontSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => onChangeAccessibility({ fontSize: sz })}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all border ${
                          isCur
                            ? 'bg-[#D24726] text-white border-[#D24726] shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                      >
                        {sz === 'small' ? '14pt' : sz === 'normal' ? '16pt' : sz === 'large' ? '18pt' : '21pt'}
                      </button>
                    );
                  })}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Tekstgrootte</span>
            </div>

            {/* Reading ruler & Tinted comfort background */}
            <div className="flex flex-col justify-between h-full pl-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onChangeAccessibility({ readingRuler: !accessibility.readingRuler })
                  }
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                    accessibility.readingRuler
                      ? 'bg-yellow-200 text-yellow-950 border-yellow-400 font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                  title="Toont een meebewegende leesstrook over de tekst"
                >
                  Leesliniaal: {accessibility.readingRuler ? 'AAN' : 'UIT'}
                </button>

                <button
                  onClick={() =>
                    onChangeAccessibility({ tintedBackground: !accessibility.tintedBackground })
                  }
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                    accessibility.tintedBackground
                      ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                  title="Rustige zachtgele/ivoor achtergrond tegen schittering van het scherm"
                >
                  Oogcomfort tint: {accessibility.tintedBackground ? 'AAN' : 'UIT'}
                </button>
              </div>
              <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider">Leeshulp</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
