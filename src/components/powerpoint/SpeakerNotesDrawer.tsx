import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Lightbulb, UserCheck } from 'lucide-react';

interface SpeakerNotesDrawerProps {
  activeModule: string;
  isOpen: boolean;
  onToggle: () => void;
}

const TEACHER_NOTES: Record<string, string> = {
  intro:
    'Sprekersnotitie van de leerkracht: Jij bent het middelpunt van je presentatie! Zorg voor oogcontact met je publiek. Je dia is geen spiekbriefje om woord voor woord af te lezen.',
  kiss:
    'Sprekersnotitie: Houd het simpel (Keep It Short & Simple). Maximaal 6 regels en maximaal 6 woorden per regel (de 6x6-regel). Zorg voor hoog contrast en trek altijd aan de hoekpunten van een foto!',
  spot:
    'Sprekersnotitie: Ga op zoek naar de 5 veelgemaakte fouten: te veel tekst, slecht contrast, uitgerekte afbeeldingen, geen bronvermelding (LPD 6) en schreeuwerige lettertypes.',
  makeover:
    'Sprekersnotitie: Pas de Makeover toe. Maak de zinnen korter, kies donkerblauw of wit als achtergrond en zorg dat de afbeelding zijn natuurlijke verhouding behoudt.',
  quiz:
    'Sprekersnotitie: Lees elke vraag aandachtig. De vragen zijn rechtstreeks gebaseerd op het ICT-leerplan Katholiek Onderwijs Vlaanderen (LPD K2 en LPD 6).',
  diploma:
    'Sprekersnotitie: Goed gedaan! Druk dit diploma af of sla het op als PDF voor je vakleerkracht ICT.',
};

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  activeModule,
  isOpen,
  onToggle,
}) => {
  const [studentNote, setStudentNote] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="border-t-2 border-[#D9D9D9] bg-white px-4 py-3 shrink-0 shadow-xs select-text">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#D24726]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Sprekersnotities (PowerPoint Notitievak)
          </span>
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800"
          title="Notitievak sluiten"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start text-xs">
        {/* Leerkracht Begeleidingsnotitie */}
        <div className="md:col-span-7 bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-amber-950 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block text-amber-900">Didactische tip:</span>
            {TEACHER_NOTES[activeModule] || 'Houd je dia eenvoudig en overzichtelijk.'}
          </div>
        </div>

        {/* Eigen notities typen */}
        <div className="md:col-span-5">
          <textarea
            value={studentNote}
            onChange={(e) => setStudentNote(e.target.value)}
            placeholder="Klik hier om je eigen sprekersnotities te typen (wat ga jij vertellen tijdens deze dia?)..."
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-[#D24726] focus:border-[#D24726]"
          />
        </div>
      </div>
    </div>
  );
};
