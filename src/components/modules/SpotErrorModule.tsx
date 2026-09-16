import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Sparkles, 
  Check, 
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { StudentSession } from '../../types';
import { SLIDE_CASES } from '../../data/curriculumData';
import { saveSession } from '../../utils/sessionStorage';

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
  const foundErrorIds = (session?.spotErrorsFound?.[activeCase.id] || []);

  const totalErrors = activeCase.errorsToFind.length;
  const isCaseFinished = foundErrorIds.length === totalErrors;

  const toggleError = (errId: string) => {
    if (!session) return;
    const currentList = session.spotErrorsFound?.[activeCase.id] || [];
    let updatedList: string[];
    if (currentList.includes(errId)) {
      updatedList = currentList.filter((id) => id !== errId);
    } else {
      updatedList = [...currentList, errId];
    }

    const updatedSession: StudentSession = {
      ...session,
      spotErrorsFound: {
        ...(session.spotErrorsFound || {}),
        [activeCase.id]: updatedList,
      },
    };

    saveSession(updatedSession);
    onUpdateSession(updatedSession);
  };

  const handleNext = () => {
    onCompleteModule('spot');
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
          Module 3 • Interactieve Speurtocht
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight">
          Spot de Fouten op de Dia!
        </h1>
        <p className="mt-2 text-amber-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          Onderzoek de dia hieronder zoals een echte expert. Klik op de fouten die de leerling gemaakt heeft tegen het KISS-principe!
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex items-center gap-3">
        {SLIDE_CASES.map((c, idx) => {
          const count = session?.spotErrorsFound?.[c.id]?.length || 0;
          const done = count === c.errorsToFind.length;
          return (
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
              <span>{c.title}</span>
              {done ? (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              ) : (
                <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px]">
                  {count}/{c.errorsToFind.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Slide & Error Hunt Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* The Slide Display */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {showTransformed ? 'KISS Versie (Na Makeover)' : 'Originele Slechte Dia'}
            </span>
            <button
              onClick={() => setShowTransformed(!showTransformed)}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showTransformed ? 'Toon Foute Dia' : 'Bekijk het KISS-resultaat'}</span>
            </button>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden aspect-16/10 flex flex-col transition-all relative">
            {!showTransformed ? (
              /* Bad Slide */
              <div
                className={`p-6 flex-1 flex flex-col justify-between ${activeCase.badSlide.bgClass} ${activeCase.badSlide.fontClass}`}
              >
                <div>
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-3 ${activeCase.badSlide.textClass}`}>
                    {activeCase.badSlide.headline}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                    <div className="sm:col-span-8 space-y-2">
                      {activeCase.badSlide.paragraphs.map((p, i) => (
                        <p key={i} className={`text-xs leading-relaxed ${activeCase.badSlide.textClass}`}>
                          {p}
                        </p>
                      ))}
                    </div>
                    <div className="sm:col-span-4 flex flex-col items-center">
                      <div className="w-full h-24 sm:h-28 overflow-hidden rounded border border-slate-400">
                        <img
                          src={activeCase.badSlide.imageSrc}
                          alt="Dino / Mars"
                          className="w-full h-full object-fill scale-x-150 scale-y-75"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 italic mt-1">
                        (Foto van Google)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-300 pt-2 flex justify-between">
                  <span>Dia 1 van 15</span>
                  <span>Opmerking: Veel tekst, onleesbare kleuren</span>
                </div>
              </div>
            ) : (
              /* Good Transformed Slide */
              <div
                className={`p-6 flex-1 flex flex-col justify-between ${activeCase.goodSlide.bgClass} ${activeCase.goodSlide.textClass} animate-in fade-in duration-300`}
              >
                <div>
                  <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">
                    {activeCase.topic}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white mt-1 mb-4">
                    {activeCase.goodSlide.headline}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-7">
                      <ul className="space-y-2.5">
                        {activeCase.goodSlide.bullets.map((b, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sm:col-span-5">
                      <div className="rounded-xl overflow-hidden border border-slate-700 aspect-video relative shadow-lg">
                        <img
                          src={activeCase.goodSlide.imageSrc}
                          alt={activeCase.goodSlide.headline}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1.5 py-0.5 rounded text-slate-300">
                          {activeCase.goodSlide.imageAttribution}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-amber-200/90 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Spreekernotities:</strong> {activeCase.goodSlide.speakerNotes}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Checklist & Feedback */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Vink de fouten aan die je ziet:
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {foundErrorIds.length} / {totalErrors} gevonden
              </span>
            </div>

            <div className="space-y-2">
              {activeCase.errorsToFind.map((err) => {
                const isFound = foundErrorIds.includes(err.id);
                return (
                  <button
                    key={err.id}
                    onClick={() => toggleError(err.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isFound
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isFound
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {isFound && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm block">
                        {err.label}
                      </span>
                      {isFound && (
                        <p className="text-xs text-emerald-800 mt-1 leading-snug">
                          {err.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {isCaseFinished && (
              <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Super speurwerk! Je hebt alle overtredingen tegen KISS ontmaskerd!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="text-xs sm:text-sm text-slate-600">
          Nu je weet wat er mis kan gaan, mag je in Module 4 <strong>zelf</strong> een dia renoveren!
        </div>
        <button
          onClick={handleNext}
          id="btn-next-to-makeover"
          className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>Naar Module 4: Makeover Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
