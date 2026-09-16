import React, { useState } from 'react';
import { 
  ArrowRight, 
  Eye, 
  Volume2, 
  Meh, 
  Smile, 
  AlertCircle, 
  CheckCircle2, 
  Monitor, 
  Users, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb,
  Unlock,
  Lock
} from 'lucide-react';
import { StudentSession } from '../../types';

interface IntroModuleProps {
  session: StudentSession | null;
  onCompleteModule: (modId: string) => void;
  onNext: () => void;
}

export const IntroModule: React.FC<IntroModuleProps> = ({
  session,
  onCompleteModule,
  onNext,
}) => {
  const [demoMode, setDemoMode] = useState<'bad' | 'good'>('bad');
  
  // Progressive disclosure state for Golden Rules
  const [revealedRule1, setRevealedRule1] = useState<boolean>(false);
  const [revealedRule2, setRevealedRule2] = useState<boolean>(false);

  const totalRevealed = (revealedRule1 ? 1 : 0) + (revealedRule2 ? 1 : 0);

  const toggleAll = () => {
    if (revealedRule1 && revealedRule2) {
      setRevealedRule1(false);
      setRevealedRule2(false);
    } else {
      setRevealedRule1(true);
      setRevealedRule2(true);
    }
  };

  const handleNext = () => {
    onCompleteModule('intro');
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Intro Banner */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-6 sm:p-8 rounded-3xl border border-orange-200/60 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            Module 1 • Introductie
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Waarom maken we eigenlijk een presentatie?
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Welkom in het 1ste middelbaar bij het vak ICT! Binnenkort moet je voor Nederlands, Aardrijkskunde, Geschiedenis of Techniek een spreekbeurt geven met PowerPoint of Canva. Maar wat maakt een presentatie nou écht goed?
          </p>
        </div>
      </div>

      {/* The Core Truth: Progressive Reveal of the Golden Rules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              De 2 Gouden Regels van Presenteren
            </h2>
            <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full ml-1">
              {totalRevealed}/2 ontdekt
            </span>
          </div>

          <button
            onClick={toggleAll}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 underline"
          >
            {revealedRule1 && revealedRule2 ? 'Alles inklappen' : 'Alles onthullen'}
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Klik op elke kaart hieronder om de regel en het geheim van een top-presentatie te ontdekken:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Gouden Regel 1 */}
          <div
            id="card-gouden-regel-1"
            onClick={() => setRevealedRule1(!revealedRule1)}
            className={`cursor-pointer rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between ${
              revealedRule1
                ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-200/80 shadow-md'
                : 'bg-white hover:bg-orange-50/30 border-slate-200 hover:border-orange-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      revealedRule1 ? 'bg-orange-600 text-white shadow-xs' : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 block">
                      Gouden Regel 1
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Jij bent de presentatie!
                    </h3>
                  </div>
                </div>

                <div className="shrink-0">
                  {revealedRule1 ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ontdekt
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full animate-pulse">
                      <Unlock className="w-3.5 h-3.5" /> Klik om te tonen
                    </span>
                  )}
                </div>
              </div>

              {/* Revealable Content */}
              {revealedRule1 ? (
                <div className="space-y-3 pt-2 border-t border-orange-200/80 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Het publiek kijkt en luistert naar <strong className="text-orange-950 font-bold">jou</strong>. Je dia’s zijn slechts het decor op de achtergrond. Jij vertelt het verhaal met je eigen woorden, stem en oogcontact.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-orange-200 text-xs text-orange-950 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Kerninzicht:</strong> Je klasgenoten willen jouw verhaal horen. De dia ondersteunt jou met een foto of cijfer, maar vervangt jou nooit!
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-center justify-between">
                  <span>Klik hier om te ontdekken wie de echte ster van de presentatie is...</span>
                  <ChevronDown className="w-4 h-4 text-orange-500 shrink-0 ml-2" />
                </div>
              )}
            </div>

            {revealedRule1 && (
              <div className="pt-3 text-[11px] text-orange-700 font-medium flex items-center justify-between border-t border-orange-100 mt-4">
                <span>Klik nogmaals om weer te sluiten</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Gouden Regel 2 */}
          <div
            id="card-gouden-regel-2"
            onClick={() => setRevealedRule2(!revealedRule2)}
            className={`cursor-pointer rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between ${
              revealedRule2
                ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200/80 shadow-md'
                : 'bg-white hover:bg-amber-50/30 border-slate-200 hover:border-amber-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      revealedRule2 ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 block">
                      Gouden Regel 2
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      De dia is geen spiekbriefje!
                    </h3>
                  </div>
                </div>

                <div className="shrink-0">
                  {revealedRule2 ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ontdekt
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full animate-pulse">
                      <Unlock className="w-3.5 h-3.5" /> Klik om te tonen
                    </span>
                  )}
                </div>
              </div>

              {/* Revealable Content */}
              {revealedRule2 ? (
                <div className="space-y-3 pt-2 border-t border-amber-200/80 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Als je hele lappen tekst op het scherm zet en die gaat aflezen, haakt iedereen af. Mensen in de klas kunnen immers <strong className="text-amber-950 font-bold">veel sneller lezen dan jij kunt praten</strong>!
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Kerninzicht:</strong> Zodra je een dia voorleest met je rug naar de klas, luistert niemand meer. Gebruik steekwoorden en sprekersnotities!
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-center justify-between">
                  <span>Klik hier om te ontdekken waarom je nooit mag aflezen van je dia...</span>
                  <ChevronDown className="w-4 h-4 text-amber-600 shrink-0 ml-2" />
                </div>
              )}
            </div>

            {revealedRule2 && (
              <div className="pt-3 text-[11px] text-amber-800 font-medium flex items-center justify-between border-t border-amber-100 mt-4">
                <span>Klik nogmaals om weer te sluiten</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Simulator: See what the audience feels */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              Publiekssimulator: Ervaar het verschil zelf!
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik op de twee knoppen hieronder en bekijk wat er gebeurt met je klasgenoten.
            </p>
          </div>

          <div className="flex bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setDemoMode('bad')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                demoMode === 'bad'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Foute aanpak (Spiekbrief)
            </button>
            <button
              onClick={() => setDemoMode('good')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                demoMode === 'good'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              KISS aanpak (Krachtig)
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Simulated Slide */}
          <div className="lg:col-span-7">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Op het projectiescherm:</span>
              <span className={demoMode === 'bad' ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-semibold'}>
                {demoMode === 'bad' ? 'Overvol spiekbriefje' : 'KISS: Rust & Focus'}
              </span>
            </div>

            <div
              className={`aspect-16/10 rounded-xl p-5 border-2 shadow-inner transition-all flex flex-col justify-between ${
                demoMode === 'bad'
                  ? 'bg-yellow-50/70 border-rose-300'
                  : 'bg-slate-900 text-white border-slate-700'
              }`}
            >
              {demoMode === 'bad' ? (
                <div className="space-y-2 text-xs">
                  <h4 className="font-serif font-black text-rose-800 text-sm underline">
                    HOE WERKT EEN VULKAAN EN WAAROM BARSTEN ZE EIGENLIJK UIT IN DE WERELD
                  </h4>
                  <p className="text-slate-700 leading-tight">
                    Een vulkaan is een opening in het oppervlak van een planeet waar gesmolten gesteente, gas en as door naar buiten komen. Dit gebeurt doordat de tektonische platen van de aarde tegen elkaar botsen of uit elkaar drijven waardoor magma omhoog wordt geduwd door de enorme druk in de aardkorst.
                  </p>
                  <p className="text-slate-700 leading-tight">
                    Als de druk te hoog wordt volgt er een explosie en stroomt er lava met een temperatuur tussen de 700 en 1200 graden Celsius naar beneden die hele dorpen kan vernielen. De bekendste vulkaan is de Vesuvius in Italië die Pompeï bedolven heeft onder meters dikke aslagen.
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-slate-500 italic text-[11px]">
                    (Leerling leest dit met de rug naar de klas met trillende stem woord voor woord af...)
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Aardrijkskunde</span>
                    <h4 className="font-heading font-extrabold text-xl text-white mt-1">
                      Vulkanen & Magma
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 items-center my-2">
                    <ul className="space-y-2 text-sm text-slate-200">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>Druk in de aardkorst</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>Lavatemp: 700 - 1.200 °C</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>Voorbeeld: Vesuvius (Italië)</span>
                      </li>
                    </ul>
                    <div className="rounded-lg overflow-hidden border border-slate-700 aspect-video relative">
                      <img
                        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=70"
                        alt="Uitbarstende vulkaan"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 px-1 py-0.5 rounded text-slate-300">
                        Foto: Unsplash
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-orange-200/80 italic">
                    Spreker vertelt enthousiast over Pompeï terwijl iedereen naar de foto en kernfeiten kijkt.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Reaction of the Class */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              {demoMode === 'bad' ? (
                <Meh className="w-4 h-4 text-rose-500" />
              ) : (
                <Smile className="w-4 h-4 text-emerald-600" />
              )}
              <span>Reactie van je klasgenoten:</span>
            </h4>

            {demoMode === 'bad' ? (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-xs text-rose-900 flex items-start gap-2.5">
                  <span className="text-lg">😴</span>
                  <div>
                    <strong className="block font-semibold">Saaai en vermoeiend</strong>
                    "Moet ik nu die 15 regels lezen of luisteren naar wat jij probeert af te rammelen?"
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-xs text-rose-900 flex items-start gap-2.5">
                  <span className="text-lg">📱</span>
                  <div>
                    <strong className="block font-semibold">Aandacht verloren</strong>
                    Na 10 seconden staart iedereen uit het raam of tekent poppetjes in zijn schrift.
                  </div>
                </div>

                <div className="text-xs text-slate-500 italic mt-2">
                  Conclusie: Veel tekst op je dia doodt de aandacht van je publiek!
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-900 flex items-start gap-2.5">
                  <span className="text-lg">🤩</span>
                  <div>
                    <strong className="block font-semibold">Iedereen kijkt naar jou!</strong>
                    De dia prikkelt met een mooie foto en 3 duidelijke getallen. De rest leg jij rustig uit.
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-900 flex items-start gap-2.5">
                  <span className="text-lg">🧠</span>
                  <div>
                    <strong className="block font-semibold">Informatie blijft hangen</strong>
                    Je leerkracht geeft complimenten voor het oogcontact en de duidelijke structuur.
                  </div>
                </div>

                <div className="text-xs text-emerald-700 font-semibold mt-2">
                  Dit is precies waar het <strong>KISS-principe</strong> voor zorgt!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="text-xs sm:text-sm text-slate-600">
          Klaar om de vier vuistregels van <strong className="text-orange-600">KISS</strong> te ontdekken?
        </div>
        <button
          onClick={handleNext}
          id="btn-next-to-kiss"
          className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>Naar Module 2: Het KISS-principe</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
