import React, { useEffect } from 'react';
import { 
  Trophy, 
  Printer, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles,
  HelpCircle,
  Lightbulb,
  ThumbsUp,
  AlertCircle,
  Star,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentSession } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/curriculumData';
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
    // Cheerful confetti celebration
    confetti({
      particleCount: 90,
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

  const quizScore = session?.quizScore ?? 0;
  const quizAnswers = session?.quizAnswers ?? {};
  const isQuizCompleted = session?.quizCompleted ?? false;
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Identify wrong and correct questions
  const wrongQuestions = QUIZ_QUESTIONS.filter((q) => {
    const studentAns = quizAnswers[q.id];
    return studentAns !== undefined && studentAns !== q.correctIndex;
  });

  const correctQuestions = QUIZ_QUESTIONS.filter((q) => {
    const studentAns = quizAnswers[q.id];
    return studentAns !== undefined && studentAns === q.correctIndex;
  });

  const formattedDate = new Date().toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            Module 5 • Jouw Feedback & Score
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            Knap gedaan! Bekijk hier jouw feedback
          </h1>
          <p className="mt-1 text-amber-100 text-sm max-w-xl leading-relaxed">
            Hieronder zie je precies wat je supergoed onder de knie hebt en handige tips voor foutjes die je nog kunt verbeteren!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            id="btn-print-feedback"
            className="px-5 py-2.5 bg-white text-orange-900 hover:bg-amber-50 font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Afdrukken / Opslaan</span>
          </button>
        </div>
      </div>

      {/* Main Feedback & Celebration Card (Printable) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8 print:border-none print:shadow-none print:p-2">
        {/* Celebration Header */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-200">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-amber-100 text-orange-600 flex items-center justify-center shadow-inner">
            {quizScore >= 6 ? (
              <Trophy className="w-9 h-9 sm:w-11 sm:h-11 text-orange-600 animate-bounce" />
            ) : (
              <ThumbsUp className="w-9 h-9 sm:w-11 sm:h-11 text-orange-600" />
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            KISS Presentatie Feedback
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
            {quizScore === 8
              ? '🌟 Geweldig! Een absolute topscore!'
              : quizScore >= 6
              ? '👏 Goed gedaan! Je bent geslaagd voor de KISS-regels!'
              : '💪 Mooie inzet! Bekijk hieronder jouw tips.'}
          </h2>

          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Jouw score op de KISS-Quiz: <strong className="text-orange-600 text-base font-extrabold">{quizScore} van de {totalQuestions} vragen juist</strong>.
          </p>

          <span className="text-xs text-slate-400 block">
            Datum: {formattedDate}
          </span>
        </div>

        {/* Section 1: Wat heb je super gedaan? */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="text-base sm:text-lg font-bold">
              Wat heb je super gedaan?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                  Het KISS-principe beheersen
                </strong>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Je weet dat minder tekst en rustige dia’s je publiek helpen te luisteren naar jouw verhaal.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                  De 6x6-regel toepassen
                </strong>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Geen lappen tekst meer: maximaal 6 regels en kernwoorden in plaats van voorleeszinnen.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                  Contrast & Duidelijke letters
                </strong>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Je kiest schreefloze letters en hoog contrast zodat iedereen achterin de klas kan meelezen.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                  Foto's & Auteursrecht
                </strong>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Foto's schalen via de hoekpunten en altijd respect voor de maker via een bronvermelding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Gerichte feedback op gemaakte fouten */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900">
              <Lightbulb className="w-5 h-5 text-orange-500" />
              <h3 className="text-base sm:text-lg font-bold">
                {wrongQuestions.length === 0 ? 'Foutloos resultaat!' : 'Gerichte tips voor jouw foutjes:'}
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {wrongQuestions.length === 0
                ? '0 fouten'
                : `${wrongQuestions.length} ${wrongQuestions.length === 1 ? 'aandachtspunt' : 'aandachtspunten'}`}
            </span>
          </div>

          {wrongQuestions.length === 0 ? (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <strong className="text-sm font-bold text-amber-950 block">
                  🎉 Geen enkele fout gemaakt!
                </strong>
                <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                  Je hebt alle vragen van de quiz juist beantwoord. Je hebt alle presentatieregels helemaal in je vingers en bent klaar om zelf een spetterende presentatie te geven!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {wrongQuestions.map((q) => {
                const userChoiceIdx = quizAnswers[q.id];
                const userChoiceText = userChoiceIdx !== undefined ? q.options[userChoiceIdx] : 'Geen antwoord';
                const correctChoiceText = q.options[q.correctIndex];

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-left"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {q.id}
                      </span>
                      <strong className="text-xs sm:text-sm font-bold text-slate-900">
                        {q.question}
                      </strong>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-900">
                        <span className="text-[10px] uppercase tracking-wider font-bold block text-rose-700">
                          Jouw antwoord:
                        </span>
                        <span className="mt-0.5 block">{userChoiceText}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                        <span className="text-[10px] uppercase tracking-wider font-bold block text-emerald-700">
                          Juist antwoord:
                        </span>
                        <span className="mt-0.5 block font-semibold">{correctChoiceText}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2 mt-1">
                      <Lightbulb className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Gouden tip:</strong> {q.explanation}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 print:hidden">
        <button
          onClick={onRestart}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Opnieuw starten vanaf het begin</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Feedback afdrukken of opslaan</span>
        </button>
      </div>
    </div>
  );
};
