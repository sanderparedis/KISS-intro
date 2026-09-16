import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Lightbulb, 
  RotateCcw,
  Award,
  BookOpen,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentSession } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/curriculumData';
import { saveSession } from '../../utils/sessionStorage';

interface QuizModuleProps {
  session: StudentSession | null;
  onUpdateSession: (session: StudentSession) => void;
  onCompleteModule: (modId: string) => void;
  onNext: () => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  session,
  onUpdateSession,
  onCompleteModule,
  onNext,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const question = QUIZ_QUESTIONS[currentQIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const currentAnswers = session?.quizAnswers || {};
  const selectedAnswerIdx = currentAnswers[question.id];
  const isAnswered = selectedAnswerIdx !== undefined;

  const handleSelectAnswer = (optionIdx: number) => {
    if (isAnswered || !session) return;

    const newAnswers = {
      ...currentAnswers,
      [question.id]: optionIdx,
    };

    // Calculate updated score
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (newAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const isAllDone = Object.keys(newAnswers).length === totalQuestions;
    if (isAllDone && score >= 6) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    const updatedSession: StudentSession = {
      ...session,
      quizAnswers: newAnswers,
      quizScore: score,
      quizCompleted: isAllDone,
    };

    saveSession(updatedSession);
    onUpdateSession(updatedSession);

    if (isAllDone) {
      onCompleteModule('quiz');
    }
  };

  const handleResetQuiz = () => {
    if (!session) return;
    if (confirm('Wil je de quiz opnieuw proberen? Je antwoorden worden gewist.')) {
      const updatedSession: StudentSession = {
        ...session,
        quizAnswers: {},
        quizScore: 0,
        quizCompleted: false,
      };
      saveSession(updatedSession);
      onUpdateSession(updatedSession);
      setCurrentQIndex(0);
      setShowHint(false);
    }
  };

  const answeredCount = Object.keys(currentAnswers).length;
  const currentScore = session?.quizScore || 0;
  const isAllAnswered = answeredCount === totalQuestions;

  const handleNext = () => {
    if (!isAllAnswered) return;
    onCompleteModule('quiz');
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
          Module 4 • Kennistest
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              De Grote KISS Presentatie Quiz
            </h1>
            <p className="mt-1 text-amber-100 text-sm">
              8 vragen over opmaak, vuistregels, auteursrecht en de leerplandoelen ICT.
            </p>
          </div>
          <div className="bg-white/15 px-4 py-2 rounded-2xl backdrop-blur-xs text-center border border-white/20 shrink-0">
            <span className="block text-[11px] uppercase tracking-wider font-semibold text-amber-100">Jouw Score</span>
            <span className="text-2xl font-black">{currentScore} / {totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Question Progress Dots */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto p-2 bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const ans = currentAnswers[q.id];
            const isCorrect = ans === q.correctIndex;
            const isDone = ans !== undefined;
            const isCurrent = currentQIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQIndex(idx);
                  setShowHint(false);
                }}
                className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'ring-2 ring-orange-500 bg-orange-600 text-white shadow-xs'
                    : isDone
                    ? isCorrect
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pr-2">
          <span>{answeredCount}/{totalQuestions} beantwoord</span>
          {answeredCount > 0 && (
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 px-2.5 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer"
              title="Wis antwoorden en start de quiz opnieuw"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Opnieuw</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Context & Tag */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="px-2.5 py-1 rounded-md bg-orange-100 text-orange-800 text-xs font-extrabold tracking-wide">
            {question.curriculumCode}
          </span>
          <span className="text-xs text-slate-500">
            Vraag {currentQIndex + 1} van {totalQuestions}
          </span>
        </div>

        {/* Question text */}
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 leading-snug">
            {question.question}
          </h2>
          <p className="text-xs text-slate-500 mt-1 italic">
            {question.context}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, optIdx) => {
            const isSelected = selectedAnswerIdx === optIdx;
            const isCorrect = optIdx === question.correctIndex;

            let buttonStyle = 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 font-semibold';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswered}
                onClick={() => handleSelectAnswer(optIdx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${buttonStyle}`}
              >
                <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-slate-700">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="text-sm flex-1 leading-relaxed">{option}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Box */}
        {isAnswered && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
              selectedAnswerIdx === question.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {selectedAnswerIdx === question.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct beantwoord!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Niet helemaal juist. Bekijk de uitleg:</span>
                </>
              )}
            </div>
            <p className="leading-relaxed opacity-90">{question.explanation}</p>
          </div>
        )}

        {/* Hint toggle if not yet answered */}
        {!isAnswered && (
          <div className="pt-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1.5 font-medium transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Verberg tip' : 'Hulp nodig? Toon tip'}</span>
            </button>
            {showHint && (
              <p className="mt-2 text-xs bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 animate-in fade-in">
                💡 <strong>Tip:</strong> {question.hint}
              </p>
            )}
          </div>
        )}

        {/* Question pagination buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            disabled={currentQIndex === 0}
            onClick={() => {
              setCurrentQIndex((prev) => Math.max(0, prev - 1));
              setShowHint(false);
            }}
            className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
          >
            Vorige vraag
          </button>

          {currentQIndex < totalQuestions - 1 ? (
            <button
              onClick={() => {
                setCurrentQIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
                setShowHint(false);
              }}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1"
            >
              <span>Volgende vraag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-medium">Laatste vraag</span>
          )}
        </div>
      </div>

      {/* Action to Feedback */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200">
        <div className="text-xs sm:text-sm text-slate-600">
          {isAllAnswered ? (
            <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Alle 8 vragen zijn beantwoord! Je kunt nu jouw score en feedback bekijken.
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-800 font-medium">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              Beantwoord eerst alle 8 vragen om jouw score en feedback te ontgrendelen ({answeredCount}/{totalQuestions} beantwoord).
            </span>
          )}
        </div>
        <button
          disabled={!isAllAnswered}
          onClick={handleNext}
          id="btn-next-to-diploma"
          className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 ${
            isAllAnswered
              ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs cursor-pointer'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-80'
          }`}
          title={isAllAnswered ? 'Ga naar jouw resultaten' : 'Beantwoord eerst alle 8 vragen'}
        >
          {isAllAnswered ? (
            <>
              <span>Naar Module 5: Jouw Score & Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Nog {totalQuestions - answeredCount} {totalQuestions - answeredCount === 1 ? 'vraag' : 'vragen'} te beantwoorden</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
