import React from 'react';
import { Users, X, Download, Trash2, CheckCircle2, Award, Clock } from 'lucide-react';
import { StudentSession } from '../types';
import { getAllSessions, setActiveSessionId, deleteSession } from '../utils/sessionStorage';

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSession: (session: StudentSession) => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({
  isOpen,
  onClose,
  onSelectSession,
}) => {
  if (!isOpen) return null;

  const sessions = getAllSessions();

  const handleExportCSV = () => {
    if (sessions.length === 0) return;
    const headers = ['Naam', 'Klas', 'Datum', 'Quiz Score', 'Quiz Voltooid', 'Klaar'];
    const rows = sessions.map((s) => [
      `"${s.studentName}"`,
      `"${s.studentClass}"`,
      `"${new Date(s.createdAt).toLocaleDateString('nl-BE')}"`,
      `${s.quizScore}/8`,
      s.quizCompleted ? 'Ja' : 'Nee',
      s.diplomaIssued ? 'Ja' : 'Nee',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `KISS_Presentaties_Klasresultaten_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAll = () => {
    if (confirm('Weet je zeker dat je alle sessies van deze computer wilt wissen (bijv. voor de volgende klas)?')) {
      localStorage.removeItem('kiss_presentations_student_sessions_v1');
      localStorage.removeItem('kiss_presentations_active_session_id');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-white">
                Leerkrachtenpaneel (ICT)
              </h2>
              <p className="text-xs text-slate-400">
                Overzicht van alle individuele leerlingensessies op dit apparaat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold text-slate-700">
            Totaal aantal opgeslagen sessies: <span className="font-bold text-orange-600">{sessions.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={sessions.length === 0}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5 text-orange-600" />
              <span>Exporteer CSV (Smartschool/Excel)</span>
            </button>

            <button
              onClick={handleClearAll}
              disabled={sessions.length === 0}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wis alle sessies</span>
            </button>
          </div>
        </div>

        {/* Table of Sessions */}
        <div className="p-6 overflow-y-auto flex-1">
          {sessions.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold text-slate-600">Nog geen leerlingensessies gevonden op dit toestel.</p>
              <p className="text-xs text-slate-400 mt-1">Elke leerling die start wordt hier automatisch geregistreerd.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Leerling</th>
                    <th className="py-2.5 px-3">Klas</th>
                    <th className="py-2.5 px-3">Voortgang</th>
                    <th className="py-2.5 px-3">Quiz Score</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {s.studentName}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                          {s.studentClass}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-700">
                          {s.completedModules.length} / 5 modules
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-bold px-2 py-0.5 rounded-full ${
                            s.quizScore >= 6
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {s.quizScore} / 8
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {s.diplomaIssued ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Voltooid
                          </span>
                        ) : (
                          <span className="text-slate-400">Bezig</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setActiveSessionId(s.id);
                            onSelectSession(s);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded font-semibold text-xs"
                        >
                          Bekijk sessie
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
