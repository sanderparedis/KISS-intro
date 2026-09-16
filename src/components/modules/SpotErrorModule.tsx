import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Users,
  Lightbulb
} from 'lucide-react';
import { StudentSession } from '../../types';
import { SLIDE_CASES } from '../../data/curriculumData';

interface SpotErrorModuleProps {
  session: StudentSession | null;
  onUpdateSession: (session: StudentSession) => void;
  onCompleteModule: (modId: string) => void;
  onNext: () => void;
}

export const SpotErrorModule: React.FC<SpotErrorModuleProps> = ({
  session,
  onUpdateSession,
  onCompleteModule,
  onNext,
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [showTransformed, setShowTransformed] = useState(false);

  const activeCase = SLIDE_CASES[selectedCaseIndex];

  const handleNext = () => {
    onCompleteModule('spot');
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2">
      {/* Title Header - Class Discussion Framing */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
          <Users className="w-3.5 h-3.5" />
          Module 3 • Klassikale Bespreking
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight">
          Spot de Fout op de Dia!
        </h1>
        <p className="mt-2 text-amber-100 text-sm sm:text-base max-w-3xl leading-relaxed">
          We bespreken deze dia eerst klassikaal. Welke overtredingen tegen het KISS-principe vallen jullie op? Nadat we dit klassikaal hebben besproken, kun je op de knop klikken om het getransformeerde KISS-resultaat te bekijken!
        </p>
      </div>

      {/* Case Selector Tabs & Toggle Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {SLIDE_CASES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCaseIndex(idx);
                setShowTransformed(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedCaseIndex === idx
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
              }`}
            >
              <span>Voorbeeld {idx + 1}: {idx === 0 ? 'T-Rex' : 'Missie naar Mars'}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowTransformed(!showTransformed)}
          id="btn-toggle-kiss-result"
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
            showTransformed
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
              : 'bg-orange-600 hover:bg-orange-700 text-white border border-orange-600 shadow-orange-200'
          }`}
        >
          {showTransformed ? (
            <>
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Toon foute dia</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Bekijk het KISS-resultaat</span>
            </>
          )}
        </button>
      </div>

      {/* Full Width Slide Display (Extra spacious for class viewing) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            {showTransformed ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-700">✨ Verbeterde KISS-Versie</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="text-rose-700">❌ Originele Foute Dia</span>
              </>
            )}
          </span>
          <span className="text-xs text-slate-400">
            {showTransformed ? 'Geoptimaliseerd volgens KISS' : 'Vol fouten tegen opmaak & inhoud'}
          </span>
        </div>

        <div className="w-full rounded-2xl border-2 border-slate-300 shadow-lg overflow-hidden min-h-[440px] flex flex-col transition-all relative">
          {!showTransformed ? (
            /* Bad Slide (Full Width, clear for class inspection) */
            <div
              className={`p-6 sm:p-10 flex-1 flex flex-col justify-between ${activeCase.badSlide.bgClass} ${activeCase.badSlide.fontClass}`}
            >
              <div>
                <h3 className={`text-lg sm:text-2xl font-bold tracking-tight mb-4 ${activeCase.badSlide.textClass}`}>
                  {activeCase.badSlide.headline}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    {activeCase.badSlide.paragraphs.map((para, i) => (
                      <p key={i} className={`text-sm sm:text-base leading-relaxed ${activeCase.badSlide.textClass}`}>
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="md:col-span-4 flex flex-col items-center justify-center">
                    <div className="relative rounded-xl overflow-hidden w-full max-w-sm shadow-md">
                      <img
                        src={activeCase.badSlide.imageSrc}
                        alt="Dia afbeelding"
                        className={`w-full h-44 sm:h-52 object-fill ${
                          activeCase.badSlide.stretchedImage ? 'scale-x-125 contrast-125' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Good Slide (Full Width KISS Result) */
            <div
              className={`p-6 sm:p-10 flex-1 flex flex-col justify-between ${activeCase.goodSlide.bgClass} ${activeCase.goodSlide.fontClass} animate-in fade-in duration-300`}
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/10 pb-3">
                  <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${activeCase.goodSlide.textClass}`}>
                    {activeCase.goodSlide.headline}
                  </h3>
                  <span className="self-start sm:self-auto text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                    ✓ KISS Goedgekeurd
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <ul className="space-y-3.5">
                      {activeCase.goodSlide.bullets.map((b, i) => (
                        <li
                          key={i}
                          className={`text-sm sm:text-lg font-semibold flex items-start gap-3 ${activeCase.goodSlide.textClass}`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 mt-2"></span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 w-full max-w-sm">
                      <img
                        src={activeCase.goodSlide.imageSrc}
                        alt="Correct formaat"
                        className="w-full h-48 sm:h-56 object-cover"
                      />
                      <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-black/80 px-2 py-0.5 rounded text-slate-300">
                        {activeCase.goodSlide.imageAttribution}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-amber-200/90 flex items-start gap-2.5 mt-6">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>KISS-inzicht:</strong> Rustige achtergrond, duidelijke schreefloze tekst en kernwoorden. De details vertel je zelf mondeling!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="text-xs sm:text-sm text-slate-600">
          Klaar met het klassikaal bespreken? Test jouw opgedane kennis in de <strong>KISS-Quiz</strong>!
        </div>
        <button
          onClick={handleNext}
          id="btn-next-to-quiz"
          className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>Naar Module 4: De KISS-Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
