import React, { useState } from 'react';
import { 
  Sparkles, 
  ListOrdered, 
  Contrast, 
  Image as ImageIcon, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldCheck,
  Type,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Eye,
  Unlock,
  RotateCcw
} from 'lucide-react';
import { StudentSession } from '../../types';
import { KISS_PRINCIPLES } from '../../data/curriculumData';

const FAULTY_6X6_SAMPLE = 
`• Parijs is de grote en romantische hoofdstad van het Europese land Frankrijk met veel bezienswaardigheden
• Er wonen volgens de officiële volkstelling meer dan 2,1 miljoen inwoners in het historische centrum
• De wereldberoemde Eiffeltoren werd gebouwd voor de wereldtentoonstelling en trekt jaarlijks miljoenen toeristen
• De prachtige rivier de Seine stroomt dwars door het centrum en je kan er met rondvaartboten varen
• In het beroemde kunstmuseum het Louvre hangt het wereldberoemde meesterwerk de Mona Lisa van Da Vinci
• Je kan er in elke straat verse warme croissants en knapperige stokbroden kopen bij traditionele bakkerijen
• Het openbaar vervoer met het uitgebreide metronetwerk brengt alle reizigers snel naar elke bekende bezienswaardigheid`;

const GOOD_6X6_SAMPLE = 
`• Hoofdstad van Frankrijk
• 2,1 miljoen inwoners
• Beroemd om de Eiffeltoren
• Rivier de Seine
• Louvre & Mona Lisa
• Uitgebreid metronetwerk`;

interface KissPrincipleModuleProps {
  session: StudentSession | null;
  onCompleteModule: (modId: string) => void;
  onNext: () => void;
}

export const KissPrincipleModule: React.FC<KissPrincipleModuleProps> = ({
  session,
  onCompleteModule,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<'k' | 'i' | 's1' | 's2'>('k');

  // Progressive reveal states for distraction-free reading
  const [revealedK, setRevealedK] = useState<Record<string, boolean>>({});
  const [revealedI, setRevealedI] = useState<Record<string, boolean>>({});
  const [revealedS1, setRevealedS1] = useState<Record<string, boolean>>({ contrast: true });
  const [revealedS2, setRevealedS2] = useState<Record<string, boolean>>({ ratio: false, copyright: false });

  const toggleK = (id: string) => {
    setRevealedK(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleI = (id: string) => {
    setRevealedI(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleS1 = (id: string) => {
    setRevealedS1(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Interactive 6x6 tester - starts with a faulty slide that students must improve
  const [testText, setTestText] = useState(FAULTY_6X6_SAMPLE);

  // Interactive contrast preview
  const [selectedBg, setSelectedBg] = useState<'light' | 'dark' | 'yellow' | 'navy'>('navy');
  const [selectedTextColor, setSelectedTextColor] = useState<'white' | 'yellow' | 'gray' | 'dark'>('white');

  // Interactive aspect ratio demo
  const [isStretched, setIsStretched] = useState(false);

  const lines = testText.split('\n').filter((l) => l.trim().length > 0);
  const lineCount = lines.length;
  const maxWordsInLine = Math.max(
    ...lines.map((l) => l.trim().split(/\s+/).filter(Boolean).length),
    0
  );
  const passes6x6 = lineCount <= 6 && maxWordsInLine <= 6;

  const handleNext = () => {
    onCompleteModule('kiss');
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Top Title */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
          Module 2 • De 4 Vuistregels
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight">
          Het KISS-Principe: Eenvoud siert!
        </h1>
        <p className="mt-2 text-amber-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          KISS staat voor <strong>"Keep It Short & Simple"</strong>. Het is dé internationale standaard voor heldere communicatie en presentaties. Laten we de 4 letters ontleden!
        </p>
      </div>

      {/* 4 Tabs for K - I - S - S */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'k', letter: 'K', label: 'Keep it simple', icon: Sparkles },
          { id: 'i', letter: 'I', label: 'Information (6x6)', icon: ListOrdered },
          { id: 's1', letter: 'S', label: 'Style & Contrast', icon: Contrast },
          { id: 's2', letter: 'S', label: 'Structure & Media', icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              id={`tab-kiss-${tab.id}`}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                isActive
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md ring-2 ring-orange-400/50'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-black font-heading ${isActive ? 'text-white' : 'text-orange-600'}`}>
                  {tab.letter}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-200' : 'text-slate-400'}`} />
              </div>
              <span className={`block font-bold text-xs sm:text-sm truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: K - Keep it Simple */}
      {activeTab === 'k' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl">
                K
              </div>
              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900">
                  Keep it simple • Houd het eenvoudig
                </h2>
                <p className="text-xs text-slate-500">Minder is meer: laat witruimte en ademruimte op je scherm</p>
              </div>
            </div>

            <button
              onClick={() => {
                const allOpen = revealedK.k1 && revealedK.k2 && revealedK.k3;
                setRevealedK({ k1: !allOpen, k2: !allOpen, k3: !allOpen });
              }}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 underline self-start sm:self-auto"
            >
              {revealedK.k1 && revealedK.k2 && revealedK.k3 ? 'Alles inklappen' : 'Alles onthullen'}
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Klik op een tegel hieronder om de vuistregel stap-voor-stap te lezen:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Rule K1 */}
            <div
              onClick={() => toggleK('k1')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                revealedK.k1
                  ? 'bg-orange-50/70 border-orange-300 ring-1 ring-orange-200 shadow-sm'
                  : 'bg-slate-50 hover:bg-orange-50/30 border-slate-200 hover:border-orange-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🎯</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    revealedK.k1 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {revealedK.k1 ? '✓ Ontdekt' : '👉 Klik om te lezen'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">1 onderwerp per dia</h4>
                {revealedK.k1 ? (
                  <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-orange-200 animate-in fade-in duration-200">
                    Prop nooit geschiedenis, klimaat en economie op één dia. Verdeel je inhoud over meerdere rustige dia’s. Eén hoofdpunt per dia geeft je toeschouwer rust.
                  </p>
                ) : (
                  <span className="text-[11px] text-slate-500 block pt-1">
                    Waarom mag je nooit 3 onderwerpen tegelijk tonen? Klik om te zien.
                  </span>
                )}
              </div>
              <div className="mt-3 flex justify-end">
                {revealedK.k1 ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {/* Rule K2 */}
            <div
              onClick={() => toggleK('k2')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                revealedK.k2
                  ? 'bg-orange-50/70 border-orange-300 ring-1 ring-orange-200 shadow-sm'
                  : 'bg-slate-50 hover:bg-orange-50/30 border-slate-200 hover:border-orange-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🧹</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    revealedK.k2 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {revealedK.k2 ? '✓ Ontdekt' : '👉 Klik om te lezen'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Weg met toeters & bellen</h4>
                {revealedK.k2 ? (
                  <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-orange-200 animate-in fade-in duration-200">
                    Vermijd rondvliegende letters, knipperende gifs en piepende geluidseffecten. Ze leiden enkel af van je verhaal en maken je presentatie kinderachtig.
                  </p>
                ) : (
                  <span className="text-[11px] text-slate-500 block pt-1">
                    Wat is het effect van draaiende animaties en geluidjes? Klik om te zien.
                  </span>
                )}
              </div>
              <div className="mt-3 flex justify-end">
                {revealedK.k2 ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {/* Rule K3 */}
            <div
              onClick={() => toggleK('k3')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                revealedK.k3
                  ? 'bg-orange-50/70 border-orange-300 ring-1 ring-orange-200 shadow-sm'
                  : 'bg-slate-50 hover:bg-orange-50/30 border-slate-200 hover:border-orange-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🤍</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    revealedK.k3 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {revealedK.k3 ? '✓ Ontdekt' : '👉 Klik om te lezen'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Durf witruimte te laten</h4>
                {revealedK.k3 ? (
                  <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-orange-200 animate-in fade-in duration-200">
                    Een dia hoeft niet voor 100% volgestouwd te worden. Lege ruimte brengt rust voor het oog en vestigt direct de aandacht op wat wél belangrijk is.
                  </p>
                ) : (
                  <span className="text-[11px] text-slate-500 block pt-1">
                    Waarom is witruimte de beste vriend van je presentatie? Klik om te zien.
                  </span>
                )}
              </div>
              <div className="mt-3 flex justify-end">
                {revealedK.k3 ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <span className="font-bold">Tip voor 1ste middelbaar:</span>
            <span>Als een toeschouwer meer dan 3 seconden nodig heeft om te begrijpen wat er op je dia staat, is hij te ingewikkeld!</span>
          </div>
        </div>
      )}

      {/* Tab 2: I - Information (De 6x6 Regel) */}
      {activeTab === 'i' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl">
              I
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Information • De 6x6 Regel
              </h2>
              <p className="text-xs text-slate-500">De gouden vuistregel voor tekst volgens het leerplan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => toggleI('lines')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                revealedI.lines
                  ? 'bg-orange-50 border-orange-300 shadow-sm'
                  : 'bg-white hover:bg-orange-50/40 border-slate-200 hover:border-orange-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    ≤ 6
                  </span>
                  <div>
                    <strong className="block text-sm text-slate-900">Deel 1: Maximaal 6 regels</strong>
                    <span className="text-xs text-slate-500">
                      {revealedI.lines ? 'Nooit meer dan 6 bullets per dia' : 'Klik om de regel te openen ▾'}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  {revealedI.lines ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {revealedI.lines && (
                <div className="mt-3 pt-3 border-t border-orange-200 text-xs text-slate-700 space-y-1.5 animate-in fade-in duration-200">
                  <p>
                    <strong>Waarom?</strong> Zodra er 7 of meer regels op een dia staan, verandert je presentatie in een dichtgetikeld boek. Het menselijk brein raakt dan overprikkeld.
                  </p>
                  <span className="block text-[11px] text-orange-800 bg-orange-100/70 p-2 rounded-lg font-medium">
                    💡 Heb je meer te vertellen? Maak gewoon een tweede dia! Dia’s kosten niets.
                  </span>
                </div>
              )}
            </div>

            <div
              onClick={() => toggleI('words')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                revealedI.words
                  ? 'bg-orange-50 border-orange-300 shadow-sm'
                  : 'bg-white hover:bg-orange-50/40 border-slate-200 hover:border-orange-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    ≤ 6
                  </span>
                  <div>
                    <strong className="block text-sm text-slate-900">Deel 2: Maximaal 6 woorden</strong>
                    <span className="text-xs text-slate-500">
                      {revealedI.words ? 'Kernwoorden i.p.v. volzinnen' : 'Klik om de regel te openen ▾'}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  {revealedI.words ? <ChevronUp className="w-4 h-4 text-orange-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {revealedI.words && (
                <div className="mt-3 pt-3 border-t border-orange-200 text-xs text-slate-700 space-y-1.5 animate-in fade-in duration-200">
                  <p>
                    <strong>Waarom?</strong> Schrijf nooit volzinnen met punten en komma's. Gebruik enkel steekwoorden als kapstok voor jouw mondelinge verhaal.
                  </p>
                  <span className="block text-[11px] text-orange-800 bg-orange-100/70 p-2 rounded-lg font-medium">
                    💡 Slecht: "Parijs is gelegen aan de Seine en heeft 2 miljoen inwoners."<br/>
                    ✅ Goed: "• 2 miljoen inwoners • Rivier Seine"
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive 6x6 Checker - Improvement Challenge */}
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-orange-600" />
                  Oefening: Verbeter deze dia zelf naar de 6x6-regel!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Deze dia staat vol lange zinnen en telt 7 regels. Schrap overbodige woorden tot er <strong>maximaal 6 regels</strong> met <strong>maximaal 6 kernwoorden per regel</strong> overblijven.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
                    lineCount <= 6 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {lineCount <= 6 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                  {lineCount} / 6 regels
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
                    maxWordsInLine <= 6 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {maxWordsInLine <= 6 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                  Max {maxWordsInLine} / 6 woorden
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 font-medium">
                Pas de tekst in het vak hieronder aan:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTestText(FAULTY_6X6_SAMPLE)}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Herstel de foute tekst om opnieuw te oefenen"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  Herstel foute dia
                </button>
                <button
                  type="button"
                  onClick={() => setTestText(GOOD_6X6_SAMPLE)}
                  className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Bekijk een goedgekeurd voorbeeld met steekwoorden"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-orange-600" />
                  Voorbeeldoplossing
                </button>
              </div>
            </div>

            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={7}
              className="w-full p-4 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all leading-relaxed shadow-inner"
              placeholder="Typ of plak hier je dia-tekst met bullet points..."
            />

            {/* Dynamic Real-Time Feedback */}
            <div
              className={`p-4 rounded-xl flex items-start gap-3 text-xs leading-relaxed transition-all ${
                passes6x6
                  ? 'bg-emerald-50 text-emerald-950 border-2 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-950 border-2 border-rose-300 shadow-sm'
              }`}
            >
              {passes6x6 ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-sm text-emerald-900 mb-0.5">
                      🎉 Fantastisch verbeterd! Deze dia voldoet perfect aan de 6x6-regel!
                    </strong>
                    <span>
                      Je hebt de tekst succesvol omgevormd tot krachtige steekwoorden. Je publiek kan dit in 3 seconden scannen terwijl jij het boeiende verhaal vertelt!
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-sm text-rose-900 mb-0.5">
                      Nog niet goedgekeurd: deze dia is te vol voor de klas!
                    </strong>
                    <ul className="list-disc pl-4 space-y-1 mt-1 text-rose-800">
                      {lineCount > 6 && (
                        <li>
                          <strong>Te veel regels:</strong> Er staan momenteel <strong>{lineCount} regels</strong> (maximaal 6 toegestaan). Verwijder de minst belangrijke punten of splits ze naar een volgende dia.
                        </li>
                      )}
                      {maxWordsInLine > 6 && (
                        <li>
                          <strong>Te veel woorden:</strong> De langste regel telt momenteel <strong>{maxWordsInLine} woorden</strong> (maximaal 6 toegestaan). Schrap lidwoorden ("de", "het", "een") en werkwoorden om enkel kernbegrippen over te houden!
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: S - Style & Contrast */}
      {activeTab === 's1' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl">
              S
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Style & Contrast • Leesbaarheid op afstand
              </h2>
              <p className="text-xs text-slate-500">Zorg dat ook de achterste rij in de klas je dia haarscherp kan lezen</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Contrast className="w-4 h-4 text-orange-600" />
                4 Vuistregels voor Kleur & Lettertypes
              </h3>
              <span className="text-xs text-slate-500 font-medium">Klik op een vuistregel voor uitleg en voorbeelden</span>
            </div>

            <div className="space-y-3">
              {/* Rule 1: High Contrast & Interactive Tester */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  revealedS1.contrast
                    ? 'bg-slate-50/90 border-orange-300 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  onClick={() => toggleS1('contrast')}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-bold text-slate-900">1. Hoog contrast tussen tekst en achtergrond</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-orange-700 hidden sm:inline">
                      {revealedS1.contrast ? 'Inklappen' : 'Klik voor voorbeeld & tester'}
                    </span>
                    {revealedS1.contrast ? <ChevronUp className="w-4 h-4 text-orange-700" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {revealedS1.contrast && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Kies altijd voor <strong>donkere letters op een lichte achtergrond</strong>, óf <strong>witte letters op een donkere achtergrond</strong>. Grijs op wit of lichtblauw op wit verdwijnt volledig als er daglicht op het projectiescherm valt!
                    </p>

                    {/* Visual Comparison: Good vs Bad */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 bg-slate-100 rounded-xl border border-rose-200">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-2">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Fout voorbeeld: Slecht contrast</span>
                        </div>
                        <div className="p-4 bg-slate-200/70 rounded-lg text-slate-400 text-xs font-medium text-center">
                          Lichtgrijze letters op een grijze achtergrond (onleesbaar)
                        </div>
                        <p className="text-[11px] text-rose-700 mt-2">
                          Lage verhouding (1.4:1). Vanaf rij 2 ziet niemand meer wat er staat.
                        </p>
                      </div>

                      <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Goed voorbeeld: Hoog contrast</span>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-lg text-white text-xs font-bold text-center shadow-xs">
                          Kraakheldere witte letters op donkerblauw (haarscherp)
                        </div>
                        <p className="text-[11px] text-emerald-800 mt-2">
                          Hoge verhouding (18:1). Direct en moeiteloos leesbaar tot in de achterste hoek.
                        </p>
                      </div>
                    </div>

                    {/* Interactive Contrast Tester */}
                    <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-300 space-y-3 shadow-xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Contrast className="w-4 h-4 text-orange-600" />
                        Interactieve Contrast-Tester • Experimenteer zelf!
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Kies Achtergrondkleur:</label>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedBg('navy')}
                              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                                selectedBg === 'navy' ? 'bg-slate-950 text-white ring-2 ring-orange-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Donkerblauw
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedBg('light')}
                              className={`px-3 py-1.5 text-xs rounded-lg font-bold border transition-all ${
                                selectedBg === 'light' ? 'bg-white border-orange-500 text-slate-900 ring-2 ring-orange-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                              }`}
                            >
                              Wit
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedBg('yellow')}
                              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                                selectedBg === 'yellow' ? 'bg-yellow-300 text-yellow-950 ring-2 ring-orange-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Geel
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Kies Tekstkleur:</label>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedTextColor('white')}
                              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                                selectedTextColor === 'white' ? 'bg-slate-800 text-white ring-2 ring-orange-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Wit
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedTextColor('dark')}
                              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                                selectedTextColor === 'dark' ? 'bg-slate-950 text-white ring-2 ring-orange-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Donkergrijs
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedTextColor('yellow')}
                              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                                selectedTextColor === 'yellow' ? 'bg-yellow-400 text-slate-950 ring-2 ring-orange-500' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Geel
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Live preview slide box */}
                      <div
                        className={`p-5 rounded-xl transition-all border ${
                          selectedBg === 'navy'
                            ? 'bg-slate-950 border-slate-800'
                            : selectedBg === 'yellow'
                            ? 'bg-yellow-200 border-yellow-400'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        <p
                          className={`text-base font-bold transition-colors ${
                            selectedTextColor === 'white'
                              ? 'text-white'
                              : selectedTextColor === 'yellow'
                              ? 'text-yellow-400'
                              : 'text-slate-900'
                          }`}
                        >
                          Kan de achterste rij in het klaslokaal deze zin direct lezen?
                        </p>
                        <span
                          className={`text-xs block mt-1 transition-colors ${
                            selectedTextColor === 'white'
                              ? 'text-slate-300'
                              : selectedTextColor === 'yellow'
                              ? 'text-yellow-700'
                              : 'text-slate-600'
                          }`}
                        >
                          Kijk kritisch naar de scherpte van de letters tegen de achtergrond.
                        </span>
                      </div>

                      {/* Live Contrast Verdict */}
                      <div className="text-xs">
                        {(selectedBg === 'navy' && selectedTextColor === 'white') || (selectedBg === 'light' && selectedTextColor === 'dark') ? (
                          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 text-emerald-900 font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Uitstekend contrast! Voldoet perfect aan de leesbaarheidsnormen voor projectie.</span>
                          </div>
                        ) : (selectedBg === 'light' && selectedTextColor === 'yellow') || (selectedBg === 'yellow' && selectedTextColor === 'white') ? (
                          <div className="p-3 bg-rose-50 rounded-lg border border-rose-300 text-rose-900 font-bold flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>Onleesbaar contrast! Geel op wit of wit op geel verdwijnt op een beamer.</span>
                          </div>
                        ) : (
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 text-amber-900 font-bold flex items-center gap-2">
                            <span>Voldoende, maar let op: bij fel binnenvallend zonlicht kan de leesbaarheid verminderen.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rule 2: Sans-serif font */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  revealedS1.font
                    ? 'bg-slate-50/90 border-orange-300 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  onClick={() => toggleS1('font')}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-bold text-slate-900">2. Schreefloos lettertype (sans-serif)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-orange-700 hidden sm:inline">
                      {revealedS1.font ? 'Inklappen' : 'Klik voor voorbeeld'}
                    </span>
                    {revealedS1.font ? <ChevronUp className="w-4 h-4 text-orange-700" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {revealedS1.font && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Kies strakke, moderne letters zonder sierhaakjes (zoals <strong>Calibri, Arial, Segoe UI of ons dyslexie-lettertype OpenDyslexic</strong>). Sierlijke krulletters en zwierige handschriften zijn vermoeiend om te ontcijferen en smelten van veraf samen tot een onleesbare kriebel.
                    </p>

                    {/* Visual Comparison: Sans-serif vs Serif/Cursive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-200">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-2">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Fout: Sierlijk handschrift / krullende schreven</span>
                        </div>
                        <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200 text-center">
                          <span className="font-serif italic text-base sm:text-lg text-amber-950 block">
                            "Kastelen en Ridders in de Middeleeuwen"
                          </span>
                        </div>
                        <p className="text-[11px] text-rose-700 mt-2 leading-tight">
                          ❌ Dunne lijntjes, krullen en haakjes vervagen op een projectiescherm.
                        </p>
                      </div>

                      <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Goed: Strak schreefloos lettertype</span>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                          <span className="font-sans font-extrabold text-base sm:text-lg text-slate-900 block tracking-tight">
                            Kastelen en Ridders in de Middeleeuwen
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800 mt-2 leading-tight">
                          ✅ Open letters met gelijke lijndikte zijn onmiddellijk herkenbaar.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rule 3: Forbidden combos */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  revealedS1.forbidden
                    ? 'bg-slate-50/90 border-orange-300 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  onClick={() => toggleS1('forbidden')}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="text-sm font-bold text-slate-900">3. Verboden kleurcombinaties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-orange-700 hidden sm:inline">
                      {revealedS1.forbidden ? 'Inklappen' : 'Klik voor voorbeeld'}
                    </span>
                    {revealedS1.forbidden ? <ChevronUp className="w-4 h-4 text-orange-700" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {revealedS1.forbidden && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Wist je dat gemiddeld <strong>1 op de 12 jongens (en 1 à 2 leerlingen per klas)</strong> kleurenblind is? Voor hen verdwijnt rood op groen volledig. En neonkleuren trillen pijnlijk op het netvlies van je publiek!
                    </p>

                    {/* Visual Comparison: 3 Forbidden Combos */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-2 text-center shadow-xs">
                        <div className="bg-white border border-yellow-200 text-yellow-300 font-black text-xs py-3 px-2 rounded-lg">
                          GEEL OP WIT
                        </div>
                        <div className="text-[11px] text-rose-700 font-semibold">
                          ❌ Te weinig helderheidsverschil: letters verdwijnen in het wit.
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-2 text-center shadow-xs">
                        <div className="bg-emerald-800 text-rose-500 font-black text-xs py-3 px-2 rounded-lg">
                          ROOD OP GROEN
                        </div>
                        <div className="text-[11px] text-rose-700 font-semibold">
                          ❌ Kleurenblinden zien geen contrast, enkel een modderige grijstint.
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-2 text-center shadow-xs">
                        <div className="bg-fuchsia-600 text-cyan-300 font-black text-xs py-3 px-2 rounded-lg">
                          NEON VIBRATIE
                        </div>
                        <div className="text-[11px] text-rose-700 font-semibold">
                          ❌ Trilt optisch (chromostereopsis) en geeft direct hoofdpijn.
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                      <strong>✅ De gouden oplossing:</strong> Gebruik altijd een veilige basis: donkerblauw of donkergrijs op een lichte achtergrond, óf witte letters op een donkerblauwe achtergrond.
                    </div>
                  </div>
                )}
              </div>

              {/* Rule 4: Max 2-3 colors */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  revealedS1.colors
                    ? 'bg-slate-50/90 border-orange-300 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  onClick={() => toggleS1('colors')}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-bold text-slate-900">4. Maximaal 2 tot 3 kleuren in je hele presentatie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-orange-700 hidden sm:inline">
                      {revealedS1.colors ? 'Inklappen' : 'Klik voor voorbeeld'}
                    </span>
                    {revealedS1.colors ? <ChevronUp className="w-4 h-4 text-orange-700" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {revealedS1.colors && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Een presentatie is geen regenboogfeestje of kleurboek. Kies <strong>1 accentkleur</strong> voor je titels en <strong>1 neutrale kleur</strong> voor je leestekst. Zo straalt je dia rust en professionaliteit uit.
                    </p>

                    {/* Visual Comparison: Rainbow vs Harmonious */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 bg-rose-50/40 rounded-xl border border-rose-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Fout: De "Regenboog-dia"</span>
                        </div>
                        <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1 text-xs">
                          <div className="font-extrabold text-purple-600 text-sm">Titel in het Paars</div>
                          <div className="font-bold text-yellow-600">Subtitel in Okergeel</div>
                          <div className="text-red-600">• Punt 1 in felrood</div>
                          <div className="text-emerald-600">• Punt 2 in felgroen</div>
                          <div className="text-blue-600">• Punt 3 in felblauw</div>
                        </div>
                        <p className="text-[11px] text-rose-700 leading-tight">
                          ❌ Oogt chaotisch, vermoeiend en leidt de aandacht weg van de spreker.
                        </p>
                      </div>

                      <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Goed: Rustig 2-kleuren palet</span>
                        </div>
                        <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1 text-xs shadow-xs">
                          <div className="font-extrabold text-orange-600 text-sm">Titel in Accentkleur (Oranje)</div>
                          <div className="font-semibold text-slate-500">Subtitel in zacht donkergrijs</div>
                          <div className="text-slate-800">• Punt 1 in neutrale leestekst</div>
                          <div className="text-slate-800">• Punt 2 in neutrale leestekst</div>
                          <div className="text-slate-800">• Punt 3 in neutrale leestekst</div>
                        </div>
                        <p className="text-[11px] text-emerald-800 leading-tight">
                          ✅ Rustig en overzichtelijk: het publiek kan zich concentreren op je uitleg.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: S - Structure & Media */}
      {activeTab === 's2' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl">
              S
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Structure & Media • Kwaliteit en Auteursrecht
              </h2>
              <p className="text-xs text-slate-500">Afbeeldingen met meerwaarde: juist schalen en eerlijk bronnen gebruiken</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Aspect ratio rule & stretch simulator */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 
                  onClick={() => setRevealedS2(prev => ({ ...prev, ratio: !prev.ratio }))}
                  className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 cursor-pointer hover:text-orange-600 transition-colors"
                >
                  <Maximize2 className="w-4 h-4 text-orange-600" />
                  Gouden Regel: Trek NOOIT aan de zijkanten!
                  {revealedS2.ratio ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsStretched(!isStretched)}
                  className="text-xs px-2.5 py-1 bg-orange-100 text-orange-800 hover:bg-orange-200 rounded-lg font-bold transition-colors"
                >
                  {isStretched ? 'Toon Normaal' : 'Simuleer Uitrekken'}
                </button>
              </div>

              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative flex items-center justify-center border border-slate-300">
                <img
                  src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80"
                  alt="Leeuw in het wild"
                  className={`transition-all duration-300 ${
                    isStretched ? 'w-full h-full object-fill scale-x-125 scale-y-75' : 'w-auto h-full object-contain'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/75 text-[10px] text-white font-mono">
                  {isStretched ? '❌ VERVORMD / UITGEREKT (Fout!)' : '✅ Correcte verhouding (Hoekpunt gebruikt)'}
                </div>
              </div>

              <div 
                onClick={() => setRevealedS2(prev => ({ ...prev, ratio: !prev.ratio }))}
                className="cursor-pointer"
              >
                {revealedS2.ratio ? (
                  <p className="text-xs text-slate-700 leading-relaxed p-3 bg-white rounded-xl border border-slate-200 animate-in fade-in duration-200">
                    Als je een foto kleiner of groter maakt in PowerPoint of Canva, neem dan altijd de <strong>hoekpunten</strong>. Zo behoud je de originele verhouding van de foto en wordt een dier of persoon niet lachwekkend platgedrukt!
                  </p>
                ) : (
                  <span className="text-[11px] text-orange-600 font-semibold flex items-center gap-1 hover:underline">
                    👉 Klik om de regel over hoekpunten te lezen ▾
                  </span>
                )}
              </div>
            </div>

            {/* Accessible Copyright Guide (Laagdrempelig) */}
            <div className="space-y-4">
              <div 
                onClick={() => setRevealedS2(prev => ({ ...prev, copyright: !prev.copyright }))}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  revealedS2.copyright ? 'bg-amber-50/80 border-amber-300 shadow-xs' : 'bg-white hover:bg-amber-50/40 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Auteursrecht: Mag je zomaar elke foto van Google plukken?
                  </h4>
                  <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                    {revealedS2.copyright ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-amber-700" />}
                  </span>
                </div>

                {revealedS2.copyright ? (
                  <div className="mt-3 pt-3 border-t border-amber-200 space-y-3 text-xs text-amber-950 leading-relaxed animate-in fade-in duration-200">
                    <p className="font-semibold text-amber-900">
                      <strong>Nee!</strong> Net zoals je niet zomaar iemands fiets of brooddoos mag meenemen, zijn foto's op het internet het creatieve werk van een fotograaf of tekenaar.
                    </p>

                    <div className="space-y-2.5 pt-1">
                      <div className="p-2.5 bg-white/90 rounded-xl border border-amber-200">
                        <strong className="block text-amber-900 text-xs font-bold mb-0.5">
                          📸 1. Gebruik gratis fotowebsites
                        </strong>
                        <p className="text-amber-800 text-[11px]">
                          Zoek foto's op beeldbanken zoals <strong>Pixabay</strong> of <strong>Unsplash</strong>. Fotografen geven daar zélf toestemming om hun beelden gratis in schoolpresentaties te tonen.
                        </p>
                      </div>

                      <div className="p-2.5 bg-white/90 rounded-xl border border-amber-200">
                        <strong className="block text-amber-900 text-xs font-bold mb-0.5">
                          ✍️ 2. Schrijf de bron erbij
                        </strong>
                        <p className="text-amber-800 text-[11px]">
                          Zet onder je afbeelding een klein regeltje (bijvoorbeeld: <em>Foto: Pixabay / fotograaf</em>). Dat is een kleine moeite en wel zo eerlijk naar de maker!
                        </p>
                      </div>

                      <div className="p-2.5 bg-white/90 rounded-xl border border-amber-200">
                        <strong className="block text-amber-900 text-xs font-bold mb-0.5">
                          👥 3. Vraag toestemming bij foto's van klasgenoten
                        </strong>
                        <p className="text-amber-800 text-[11px]">
                          Wil je een foto van een klasgenoot gebruiken? Vraag altijd eerst: <em>"Mag ik deze foto in mijn presentatie tonen?"</em> Toon nooit stiekeme of gênante foto's op het grote bord.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="text-[11px] text-amber-800 block mt-1">
                    👉 Klik om te ontdekken hoe je eerlijk en veilig foto's gebruikt in je presentatie ▾
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action to Module 3 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="text-xs sm:text-sm text-slate-600">
          Heb je het <strong>KISS-principe</strong> begrepen? Test je speurderoog in Module 3!
        </div>
        <button
          onClick={handleNext}
          id="btn-next-to-spot"
          className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>Naar Module 3: Spot de Fout!</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
