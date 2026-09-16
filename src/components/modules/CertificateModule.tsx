import React, { useEffect } from 'react';
import { 
  Award, 
  Printer, 
  CheckCircle2, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  Calendar, 
  User, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentSession } from '../../types';
import { saveSession } from '../../utils/sessionStorage';

interface CertificateModuleProps {
  session: StudentSession | null;
  onUpdateSession: (session: StudentSession) => void;
  onRestart: () => void;
}

export const CertificateModule: React.FC<CertificateModuleProps> = ({
  session,
  onUpdateSession,
  onRestart,
}) => {
  useEffect(() => {
    // Trigger confetti on diploma opening
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });

    if (session && !session.diplomaIssued) {
      const updated = { ...session, diplomaIssued: true };
      saveSession(updated);
      onUpdateSession(updated);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const quizScore = session?.quizScore || 0;
  const makeoverScore = session?.makeoverProject?.score || 100;
  const studentName = session?.studentName || 'Leerling';
  const studentClass = session?.studentClass || '1A';
  const formattedDate = new Date().toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Top Banner with Print Button */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            Module 6 • Resultaat & Diploma
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            Gefeliciteerd!
          </h1>
          <p className="mt-1 text-amber-100 text-sm">
            Je hebt de interactieve lesmodule over het KISS-principe en doeltreffende presentaties succesvol doorlopen.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            id="btn-print-diploma"
            className="px-5 py-2.5 bg-white text-orange-900 hover:bg-amber-50 font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Afdrukken / PDF</span>
          </button>
        </div>
      </div>

      {/* Optional name bar (print:hidden) */}
      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:hidden">
        <div className="text-slate-600">
          <strong className="text-slate-900">Diploma personaliseren?</strong> Je hoeft geen naam op te geven. Wil je je naam toch op het afgedrukte diploma?
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Optioneel: typ je naam..."
            value={session?.studentName && !session.studentName.startsWith('Sessie #') ? session.studentName : ''}
            onChange={(e) => {
              if (session) {
                const val = e.target.value;
                const updated = { ...session, studentName: val || 'Leerling' };
                saveSession(updated);
                onUpdateSession(updated);
              }
            }}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-orange-500 w-48"
          />
        </div>
      </div>

      {/* The Printable Certificate Container */}
      <div className="bg-white rounded-3xl border-4 border-double border-amber-300 p-8 sm:p-12 shadow-xl relative overflow-hidden print:border-2 print:p-6 print:shadow-none">
        {/* Decorative corner seals */}
        <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-amber-600/70 border-b border-amber-300 pb-1">
          Katholiek Onderwijs Vlaanderen • ICT 1ste Graad
        </div>
        <div className="absolute top-4 right-4 text-xs font-semibold text-slate-400">
          Leerplancode: I-ICT-ab
        </div>

        <div className="text-center space-y-4 my-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
            <Award className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block">
            Officieel Certificaat van Bekwaamheid
          </span>

          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            KISS Presentator Diploma
          </h2>

          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Hierbij wordt bevestigd dat de leerling met glans de leerplandoelen voor doeltreffende, sobere presentaties heeft behaald:
          </p>

          {/* Student details */}
          <div className="bg-amber-50/60 border border-amber-200 py-3 px-8 rounded-2xl inline-block my-2 min-w-[280px]">
            {session?.studentName && !session.studentName.startsWith('Sessie #') ? (
              <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 block">
                {session.studentName}
              </span>
            ) : (
              <div className="py-1">
                <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">Naam leerling:</span>
                <span className="text-xl sm:text-2xl font-mono text-slate-400 font-bold block pt-1">
                  ...................................................
                </span>
              </div>
            )}
            <span className="text-xs font-semibold text-orange-800 block mt-1">
              ICT 1ste Graad • Datum: {formattedDate}
            </span>
          </div>
        </div>

        {/* Curriculum Competence Checklist */}
        <div className="border-t border-b border-slate-200 py-6 my-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
            Behaalde Leerplandoelen (Katholiek Onderwijs Vlaanderen)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">LPD K2: Het KISS-principe hanteren</strong>
                <span className="text-slate-600">Sobere lay-out, max 6x6 regels en kernwoorden i.p.v. lappen voorleestekst.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">LPD K2: Contrast & Doelgroepgerichte Stijl</strong>
                <span className="text-slate-600">Groot kleurcontrast en strakke, schreefloze lettertypes leesbaar vanaf de achterste rij.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">LPD K2 & K3: Afbeeldingen correct schalen</strong>
                <span className="text-slate-600">Geen uitgerekte of platgedrukte foto’s; hoekpunten gebruiken om verhouding te bewaren.</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-semibold">LPD 6: Auteursrecht & Bronvermelding</strong>
                <span className="text-slate-600">Rechtenvrije beelden zoeken en bron correct vermelden met respect voor auteursrecht.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results summary table */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center my-6">
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
            <span className="text-[11px] font-semibold text-orange-800 block">KISS Quiz Score</span>
            <span className="text-xl font-black text-orange-950">{quizScore} / 8</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-800 block">Makeover Studio</span>
            <span className="text-xl font-black text-emerald-950">{makeoverScore}%</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-amber-800 block">Beoordeling</span>
            <span className="text-xl font-black text-amber-950">Geslaagd ★★★</span>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-8 flex justify-between items-end text-xs text-slate-600">
          <div className="space-y-1">
            <span className="block font-bold text-slate-800">Handtekening Leerling:</span>
            <div className="w-40 border-b border-slate-400 pt-6"></div>
            <span className="text-[11px] italic text-slate-500">
              {session?.studentName && !session.studentName.startsWith('Sessie #') ? session.studentName : 'Handtekening leerling'}
            </span>
          </div>

          <div className="text-right space-y-1">
            <span className="block font-bold text-slate-800">Vakleerkracht ICT:</span>
            <div className="w-40 border-b border-slate-400 pt-6 ml-auto"></div>
            <span className="text-[11px] font-semibold text-slate-700">De vakleerkracht ICT</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 print:hidden">
        <button
          onClick={onRestart}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Opnieuw doornemen vanaf begin</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Afdrukken of opslaan voor leerkracht</span>
        </button>
      </div>
    </div>
  );
};
