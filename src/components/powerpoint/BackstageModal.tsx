import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Printer, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Type, 
  ShieldCheck,
  Download
} from 'lucide-react';
import { StudentSession, AccessibilitySettings } from '../../types';

interface BackstageModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: StudentSession | null;
  accessibility: AccessibilitySettings;
  onChangeAccessibility: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenSessionModal: () => void;
  onOpenTeacherModal: () => void;
  onPrintCertificate: () => void;
}

export const BackstageModal: React.FC<BackstageModalProps> = ({
  isOpen,
  onClose,
  session,
  accessibility,
  onChangeAccessibility,
  onOpenSessionModal,
  onOpenTeacherModal,
  onPrintCertificate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-[#D24726] text-white animate-in fade-in duration-150">
      {/* Left Backstage Navigation column */}
      <div className="w-48 sm:w-60 bg-[#B83B1D] flex flex-col p-4 space-y-3 shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2 hover:bg-black/15 rounded-lg text-white font-bold text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Terug naar dia's</span>
        </button>

        <div className="space-y-1 text-xs">
          <button
            onClick={onClose}
            className="w-full text-left p-2.5 rounded bg-white/20 font-bold flex items-center gap-2.5"
          >
            <FileText className="w-4 h-4" />
            <span>Info & Presentatie</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSessionModal();
            }}
            className="w-full text-left p-2.5 rounded hover:bg-white/10 font-semibold flex items-center gap-2.5 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Leerling Sessie</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onPrintCertificate();
            }}
            className="w-full text-left p-2.5 rounded hover:bg-white/10 font-semibold flex items-center gap-2.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Afdrukken / PDF</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenTeacherModal();
            }}
            className="w-full text-left p-2.5 rounded hover:bg-white/10 font-semibold flex items-center gap-2.5 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Leerkrachtpaneel</span>
          </button>
        </div>

        <div className="mt-auto pt-6 text-[11px] text-white/70 border-t border-white/20">
          <span>Microsoft PowerPoint Look & Feel</span>
          <br />
          <span>Katholiek Onderwijs Vlaanderen</span>
        </div>
      </div>

      {/* Right Backstage Details Pane */}
      <div className="flex-1 bg-white text-slate-900 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="text-2xl font-heading font-black text-slate-900">
              Presentatie-informatie
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              KISS_Presentaties_Introductieles_1steMiddelbaar.pptx
            </p>
          </div>

          {/* Student Status Card */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block">
                Actieve Leerling
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {session?.studentName || 'Geen leerling geselecteerd'} (Klas {session?.studentClass || '1A'})
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Voortgang: {session?.completedModules.length || 0} van de 6 modules afgerond • Quizscore: {session?.quizScore || 0}/8
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenSessionModal();
              }}
              className="px-4 py-2 bg-[#D24726] hover:bg-[#B83B1D] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
            >
              Wissel Leerling
            </button>
          </div>

          {/* Dyslexia & Accessibility Settings */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-[#D24726]" />
              Dyslexie & Leesbaarheid Voorkeuren
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accessibility.dyslexiaFont}
                  onChange={(e) => onChangeAccessibility({ dyslexiaFont: e.target.checked })}
                  className="rounded text-[#D24726] focus:ring-[#D24726] w-4 h-4"
                />
                <div>
                  <span className="font-bold block text-slate-900">Dyslexielettertype (Lexend)</span>
                  <span className="text-[11px] text-slate-500">Minder visuele drukte en duidelijke lettervormen</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accessibility.readingRuler}
                  onChange={(e) => onChangeAccessibility({ readingRuler: e.target.checked })}
                  className="rounded text-[#D24726] focus:ring-[#D24726] w-4 h-4"
                />
                <div>
                  <span className="font-bold block text-slate-900">Leesliniaal</span>
                  <span className="text-[11px] text-slate-500">Volgt de muis om de huidige tekstregel te accentueren</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accessibility.tintedBackground}
                  onChange={(e) => onChangeAccessibility({ tintedBackground: e.target.checked })}
                  className="rounded text-[#D24726] focus:ring-[#D24726] w-4 h-4"
                />
                <div>
                  <span className="font-bold block text-slate-900">Oogcomfort tint (Zachtgeel)</span>
                  <span className="text-[11px] text-slate-500">Voorkomt vermoeidheid door fel wit schermlicht</span>
                </div>
              </label>
            </div>
          </div>

          {/* Leerplan Context */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-600" />
              Gekoppeld aan het Leerplan ICT 1ste Graad
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Dit lespakket implementeert de minimumdoelen en het keuzedoel <strong>LPD K2 (Presentatiesoftware)</strong> en <strong>LPD 6 (Auteursrecht, bronvermelding en ethiek)</strong> voor het Katholiek Onderwijs Vlaanderen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
