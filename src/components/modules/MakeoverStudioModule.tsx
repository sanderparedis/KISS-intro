import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  ShieldCheck, 
  RotateCcw,
  Sliders,
  Check
} from 'lucide-react';
import { StudentSession } from '../../types';
import { MAKEOVER_TEMPLATES } from '../../data/curriculumData';
import { saveSession } from '../../utils/sessionStorage';

interface MakeoverStudioProps {
  session: StudentSession | null;
  onUpdateSession: (session: StudentSession) => void;
  onCompleteModule: (modId: string) => void;
  onNext: () => void;
}

export const MakeoverStudioModule: React.FC<MakeoverStudioProps> = ({
  session,
  onUpdateSession,
  onCompleteModule,
  onNext,
}) => {
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const currentTemplate = MAKEOVER_TEMPLATES[activeTemplateIdx];

  // Makeover state initialized from session or template
  const [title, setTitle] = useState(
    session?.makeoverProject?.title || currentTemplate.title
  );
  const [bullets, setBullets] = useState<string[]>(
    session?.makeoverProject?.bulletPoints || currentTemplate.badContent.suggestedBullets
  );
  const [bgColor, setBgColor] = useState(session?.makeoverProject?.bgColor || 'bg-slate-900');
  const [textColor, setTextColor] = useState(session?.makeoverProject?.textColor || 'text-white');
  const [fontFamily, setFontFamily] = useState(session?.makeoverProject?.fontFamily || 'font-sans');
  const [imageScale, setImageScale] = useState<'contain' | 'cover' | 'stretched'>(
    session?.makeoverProject?.imageScale || 'cover'
  );
  const [selectedImage, setSelectedImage] = useState(
    session?.makeoverProject?.selectedImage || currentTemplate.badContent.defaultImage
  );
  const [hasAttribution, setHasAttribution] = useState(
    session?.makeoverProject?.hasAttribution ?? true
  );
  const [attributionText, setAttributionText] = useState(
    session?.makeoverProject?.attributionText || 'Bron: NASA / Unsplash (Rechtenvrij)'
  );

  // Calculate live KISS Score
  const isTitleConcise = title.trim().length > 0 && title.trim().length < 35 && !title.includes('ALLES OVER');
  const areBulletsConcise = bullets.length <= 5 && bullets.every(b => b.split(' ').length <= 8);
  const isContrastGood = (bgColor.includes('slate-900') && textColor.includes('white')) || 
                        (bgColor.includes('white') && textColor.includes('slate-900')) ||
                        (bgColor.includes('emerald-950') && textColor.includes('white'));
  const isFontGood = fontFamily === 'font-sans';
  const isImageGood = imageScale !== 'stretched' && hasAttribution;

  let score = 0;
  if (isTitleConcise) score += 20;
  if (areBulletsConcise) score += 25;
  if (isContrastGood) score += 25;
  if (isFontGood) score += 15;
  if (isImageGood) score += 15;

  const handleSaveToSession = () => {
    if (!session) return;
    const updated: StudentSession = {
      ...session,
      makeoverProject: {
        theme: currentTemplate.id as any,
        title,
        bulletPoints: bullets,
        bgColor,
        textColor,
        fontFamily,
        imageScale,
        selectedImage,
        hasAttribution,
        attributionText,
        submitted: true,
        score,
      },
    };
    saveSession(updated);
    onUpdateSession(updated);
    onCompleteModule('makeover');
  };

  const handleNext = () => {
    handleSaveToSession();
    onNext();
  };

  const handleApplySuggested = () => {
    setTitle(currentTemplate.title);
    setBullets([...currentTemplate.badContent.suggestedBullets]);
    setBgColor('bg-slate-900');
    setTextColor('text-white');
    setFontFamily('font-sans');
    setImageScale('cover');
    setHasAttribution(true);
    setAttributionText('Bron: NASA / Unsplash (Rechtenvrij)');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Title */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
          Module 4 • Zelf Aan de Slag
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight">
          Slide Makeover Studio
        </h1>
        <p className="mt-2 text-amber-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          Tover een overvolle, lelijke dia om tot een strakke, professionele presentatiedia volgens de regels van het ICT-leerplan!
        </p>
      </div>

      {/* Live KISS Meter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Wand2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-slate-900 text-base">
                KISS Kwaliteitsmeter:
              </span>
              <span
                className={`text-sm font-extrabold px-2.5 py-0.5 rounded-full ${
                  score >= 80
                    ? 'bg-emerald-100 text-emerald-800'
                    : score >= 50
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {score}%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {score >= 80
                ? 'Uitstekend! Deze dia voldoet volledig aan het KISS-principe!'
                : 'Blijf sleutelen: let op contrast, lettertype en beknopte regels.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplySuggested}
            className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>KISS Tips toepassen</span>
          </button>
          <button
            onClick={handleSaveToSession}
            id="btn-save-makeover"
            className="text-xs px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Opslaan in mijn sessie</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: The Live Canvas Preview */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Live Dia Voorvertoning ({title})
          </span>

          <div
            className={`rounded-2xl border-2 border-slate-300 shadow-lg overflow-hidden aspect-16/10 flex flex-col justify-between p-6 transition-all ${bgColor} ${textColor} ${fontFamily}`}
          >
            {/* Top: Category & Title */}
            <div>
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider block">
                {currentTemplate.subject}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 mb-4">
                {title || 'Voer een beknopte titel in'}
              </h3>

              {/* Grid content: bullets on left, media on right */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-7">
                  <ul className="space-y-2">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:col-span-5">
                  <div className="rounded-xl overflow-hidden border border-slate-700 aspect-video relative shadow-md bg-black/50">
                    <img
                      src={selectedImage}
                      alt="Onderwerp afbeelding"
                      className={`w-full h-full ${
                        imageScale === 'stretched'
                          ? 'object-fill scale-x-125 scale-y-75'
                          : imageScale === 'contain'
                          ? 'object-contain'
                          : 'object-cover'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {hasAttribution && (
                      <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 px-1 py-0.5 rounded text-slate-200">
                        {attributionText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="text-[10px] opacity-70 border-t border-slate-700/50 pt-2 flex justify-between">
              <span>Sessie van: {session?.studentName || 'Leerling'}</span>
              <span>1ste graad Secundair ICT</span>
            </div>
          </div>

          {/* Checklist Feedback Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${isTitleConcise ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${isTitleConcise ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Beknopte titel</span>
            </div>
            <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${areBulletsConcise ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${areBulletsConcise ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>6x6 Regel</span>
            </div>
            <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${isContrastGood ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${isContrastGood ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Hoog contrast</span>
            </div>
            <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${isFontGood ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${isFontGood ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Schreefloos font</span>
            </div>
            <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${isImageGood ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
              <CheckCircle2 className={`w-3.5 h-3.5 ${isImageGood ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Beeld + Bron</span>
            </div>
          </div>
        </div>

        {/* Right: Customization Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <Sliders className="w-4 h-4 text-orange-600" />
              Dia Instellingen (KISS Controls)
            </h3>

            {/* 1. Titel bewerken */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                1. Titel van de dia:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
              <span className="text-[11px] text-slate-500">
                Tip: Geen schreeuwerige hoofletters of hele zinnen.
              </span>
            </div>

            {/* 2. Tekst & Bullet points */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                2. Kernwoorden (1 per regel):
              </label>
              <textarea
                rows={4}
                value={bullets.join('\n')}
                onChange={(e) => setBullets(e.target.value.split('\n'))}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
              <span className="text-[11px] text-slate-500">
                Houd je aan max 4 tot 6 regels en korte kernwoorden.
              </span>
            </div>

            {/* 3. Kleur & Contrast */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-orange-600" />
                3. Kleurencombinatie:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setBgColor('bg-slate-900');
                    setTextColor('text-white');
                  }}
                  className={`p-2 rounded-lg border text-xs font-bold text-left ${
                    bgColor === 'bg-slate-900' ? 'bg-slate-900 text-white border-orange-500 ring-2 ring-orange-500/40' : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  Donkerblauw + Wit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBgColor('bg-white');
                    setTextColor('text-slate-900');
                  }}
                  className={`p-2 rounded-lg border text-xs font-bold text-left ${
                    bgColor === 'bg-white' ? 'bg-white text-slate-900 border-orange-500 ring-2 ring-orange-500/40' : 'bg-slate-50 text-slate-800 border-slate-300'
                  }`}
                >
                  Wit + Donker
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBgColor('bg-yellow-200');
                    setTextColor('text-yellow-500');
                  }}
                  className={`p-2 rounded-lg border text-xs font-bold text-left ${
                    bgColor === 'bg-yellow-200' ? 'bg-yellow-100 text-yellow-600 border-rose-500' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}
                  title="Fout contrast!"
                >
                  Geel op Geel (Fout!)
                </button>
              </div>
            </div>

            {/* 4. Typografie */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-orange-600" />
                4. Lettertype:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFontFamily('font-sans')}
                  className={`p-2 rounded-lg border text-xs font-bold ${
                    fontFamily === 'font-sans' ? 'bg-orange-50 border-orange-500 text-orange-950 font-sans' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Strak Sans-Serif (Aanbevolen)
                </button>
                <button
                  type="button"
                  onClick={() => setFontFamily('font-serif italic')}
                  className={`p-2 rounded-lg border text-xs font-serif italic ${
                    fontFamily === 'font-serif italic' ? 'bg-orange-50 border-orange-500 text-orange-950' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Krulletjes / Cursief
                </button>
              </div>
            </div>

            {/* 5. Afbeelding & Schalen */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
                5. Afbeelding schalen (LPD K2):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setImageScale('cover')}
                  className={`p-2 rounded-lg border text-xs font-bold ${
                    imageScale === 'cover' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Verhouding behouden
                </button>
                <button
                  type="button"
                  onClick={() => setImageScale('stretched')}
                  className={`p-2 rounded-lg border text-xs font-bold ${
                    imageScale === 'stretched' ? 'bg-rose-50 border-rose-500 text-rose-950' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Uitgerekt aan zijkant
                </button>
              </div>
            </div>

            {/* 6. Auteursrecht (LPD 6) */}
            <div className="space-y-1.5 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAttribution}
                  onChange={(e) => setHasAttribution(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Bronvermelding toevoegen (LPD 6 Auteursrecht)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Action to Quiz */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="text-xs sm:text-sm text-slate-600">
          Tevreden over je makeover? Sla je werk op en bewijs je kennis in de <strong>KISS-Quiz</strong>!
        </div>
        <button
          onClick={handleNext}
          id="btn-next-to-quiz"
          className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>Opslaan & Naar Module 5: De KISS Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
