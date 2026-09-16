import React, { useState } from 'react';
import { User, Plus, X, GraduationCap, Clock, Trash2, ArrowRight } from 'lucide-react';
import { StudentSession } from '../types';
import { getAllSessions, createNewSession, setActiveSessionId, deleteSession } from '../utils/sessionStorage';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSession: StudentSession | null;
  onSessionChange: (session: StudentSession) => void;
}

export const SessionModal: React.FC<SessionModalProps> = ({
  isOpen,
  onClose,
  currentSession,
  onSessionChange,
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('1A');
  const [sessions, setSessions] = useState<StudentSession[]>(getAllSessions());

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSess = createNewSession(name.trim() || undefined, studentClass);
    setSessions(getAllSessions());
    onSessionChange(newSess);
    setName('');
    onClose();
  };

  const handleSelect = (sess: StudentSession) => {
    setActiveSessionId(sess.id);
    onSessionChange(sess);
    onClose();
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Weet je zeker dat je deze sessie wilt wissen?')) {
      deleteSession(id);
      const updated = getAllSessions();
      setSessions(updated);
      if (currentSession?.id === id) {
        if (updated.length > 0) {
          onSessionChange(updated[0]);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white relative">
          {currentSession && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs text-white">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-white">
                Mijn Lessessie (Eigen Tempo)
              </h2>
              <p className="text-xs text-amber-100">
                Iedereen leert op zijn eigen tempo zonder persoonlijke naam of account
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Quick Start / New Session */}
          <div className="space-y-3 bg-amber-50/70 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-orange-600" />
                Nieuwe sessie opstarten
              </h3>
              <span className="text-[11px] text-amber-800 font-medium">Anoniem & lokaal bewaard</span>
            </div>
            <p className="text-xs text-slate-600">
              Wil je met een schone lei beginnen of de les opnieuw zelfstandig doornemen? Start met 1 klik een nieuwe sessie.
            </p>
            <form onSubmit={handleCreate} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Sessienaam of label (optioneel):
                </label>
                <input
                  type="text"
                  placeholder={`Bv. Sessie #${sessions.length + 1} of Pc 3`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                id="btn-start-my-session"
                className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Nieuwe sessie op eigen tempo starten</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Existing sessions on this device */}
          {sessions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Bestaande sessies op dit toestel ({sessions.length})
                </h4>
              </div>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {sessions.map((sess) => {
                  const isCurrent = currentSession?.id === sess.id;
                  return (
                    <div
                      key={sess.id}
                      onClick={() => handleSelect(sess)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-orange-500 bg-orange-50/60 ring-1 ring-orange-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isCurrent
                              ? 'bg-orange-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {sess.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                              {sess.studentName}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                            <span>Quiz: {sess.quizScore}/8</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(sess.lastActive).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="text-[11px] font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                            Actief
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, sess.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Sessie wissen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
