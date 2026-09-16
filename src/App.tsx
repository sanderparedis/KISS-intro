import React, { useState, useEffect } from 'react';
import { PowerPointTitleBar } from './components/powerpoint/PowerPointTitleBar';
import { PowerPointRibbon } from './components/powerpoint/PowerPointRibbon';
import { PowerPointSlideThumbnails } from './components/powerpoint/PowerPointSlideThumbnails';
import { PowerPointStatusBar } from './components/powerpoint/PowerPointStatusBar';
import { SpeakerNotesDrawer } from './components/powerpoint/SpeakerNotesDrawer';
import { BackstageModal } from './components/powerpoint/BackstageModal';
import { SlideShowModal } from './components/powerpoint/SlideShowModal';
import { ReadingRuler } from './components/powerpoint/ReadingRuler';
import { SessionModal } from './components/SessionModal';
import { TeacherDashboardModal } from './components/TeacherDashboardModal';

import { IntroModule } from './components/modules/IntroModule';
import { KissPrincipleModule } from './components/modules/KissPrincipleModule';
import { SpotErrorModule } from './components/modules/SpotErrorModule';
import { MakeoverStudioModule } from './components/modules/MakeoverStudioModule';
import { QuizModule } from './components/modules/QuizModule';
import { CertificateModule } from './components/modules/CertificateModule';

import { StudentSession, AccessibilitySettings } from './types';
import { getOrCreateDefaultSession, saveSession } from './utils/sessionStorage';
import { CURRICULUM_GOALS } from './data/curriculumData';
import { BookOpen, UserPlus, Info, Type, Sliders, Eye } from 'lucide-react';

const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  dyslexiaFont: false,
  fontSize: 'normal',
  lineSpacing: 'normal',
  readingRuler: false,
  tintedBackground: false,
};

export default function App() {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [activeModule, setActiveModule] = useState<string>('intro');
  const [activeRibbonTab, setActiveRibbonTab] = useState<'home' | 'insert' | 'design' | 'slideshow' | 'accessibility'>('home');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(DEFAULT_ACCESSIBILITY);
  
  // UI states
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [thumbnailsCollapsed, setThumbnailsCollapsed] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isSlideShowOpen, setIsSlideShowOpen] = useState<boolean>(false);
  const [isBackstageOpen, setIsBackstageOpen] = useState<boolean>(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState<boolean>(false);

  // Load session & accessibility settings automatically
  useEffect(() => {
    const existing = getOrCreateDefaultSession();
    if (existing) {
      setSession(existing);
      if (existing.accessibility) {
        setAccessibility(existing.accessibility);
      }
    }
  }, []);

  // Save accessibility changes
  const handleChangeAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => {
      const updated = { ...prev, ...newSettings };
      if (session) {
        const updatedSession: StudentSession = {
          ...session,
          accessibility: updated,
        };
        saveSession(updatedSession);
        setSession(updatedSession);
      }
      return updated;
    });
  };

  const handleCompleteModule = (modId: string) => {
    if (!session) return;
    if (!session.completedModules.includes(modId)) {
      const updated: StudentSession = {
        ...session,
        completedModules: [...session.completedModules, modId],
      };
      saveSession(updated);
      setSession(updated);
    }
  };

  const handleUpdateSession = (updated: StudentSession) => {
    setSession(updated);
  };

  const handleSessionChange = (newSession: StudentSession) => {
    setSession(newSession);
    if (newSession.accessibility) {
      setAccessibility(newSession.accessibility);
    }
    setActiveModule('intro');
  };

  // Determine slide number (1 to 6)
  const moduleOrder = ['intro', 'kiss', 'spot', 'makeover', 'quiz', 'diploma'];
  const currentSlideNum = Math.max(1, moduleOrder.indexOf(activeModule) + 1);

  // Dynamic root accessibility classes
  const fontClass = accessibility.dyslexiaFont ? 'font-dyslexic' : '';
  const sizeClass = `font-size-${accessibility.fontSize}`;
  const spacingClass = accessibility.lineSpacing === 'spacious' ? 'spacing-spacious' : '';
  const tintClass = accessibility.tintedBackground ? 'tint-soft' : 'bg-slate-200/70';

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'intro':
        return (
          <IntroModule
            session={session}
            onCompleteModule={handleCompleteModule}
            onNext={() => setActiveModule('kiss')}
          />
        );
      case 'kiss':
        return (
          <KissPrincipleModule
            session={session}
            onCompleteModule={handleCompleteModule}
            onNext={() => setActiveModule('spot')}
          />
        );
      case 'spot':
        return (
          <SpotErrorModule
            session={session}
            onUpdateSession={handleUpdateSession}
            onCompleteModule={handleCompleteModule}
            onNext={() => setActiveModule('makeover')}
          />
        );
      case 'makeover':
        return (
          <MakeoverStudioModule
            session={session}
            onUpdateSession={handleUpdateSession}
            onCompleteModule={handleCompleteModule}
            onNext={() => setActiveModule('quiz')}
          />
        );
      case 'quiz':
        return (
          <QuizModule
            session={session}
            onUpdateSession={handleUpdateSession}
            onCompleteModule={handleCompleteModule}
            onNext={() => setActiveModule('diploma')}
          />
        );
      case 'diploma':
        return (
          <CertificateModule
            session={session}
            onUpdateSession={handleUpdateSession}
            onRestart={() => setActiveModule('intro')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen h-screen flex flex-col overflow-hidden select-text ${fontClass} ${sizeClass} ${spacingClass}`}
    >
      {/* Dyslexia reading line ruler if enabled */}
      <ReadingRuler enabled={accessibility.readingRuler} />

      {/* 1. Microsoft PowerPoint Title Bar */}
      <PowerPointTitleBar
        session={session}
        accessibility={accessibility}
        onChangeAccessibility={handleChangeAccessibility}
        onOpenSessionModal={() => setIsSessionModalOpen(true)}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onStartSlideShow={() => setIsSlideShowOpen(true)}
      />

      {/* 2. Microsoft PowerPoint Ribbon */}
      <PowerPointRibbon
        activeTab={activeRibbonTab}
        setActiveTab={setActiveRibbonTab}
        accessibility={accessibility}
        onChangeAccessibility={handleChangeAccessibility}
        onOpenBackstage={() => setIsBackstageOpen(true)}
        onStartSlideShow={() => setIsSlideShowOpen(true)}
        onNewSlideJump={() => setThumbnailsCollapsed(false)}
      />

      {/* 3. Main PowerPoint Workspace (Thumbnails + Slide Stage + Speaker Notes) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Slide Thumbnails */}
        <PowerPointSlideThumbnails
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          session={session}
          collapsed={thumbnailsCollapsed}
          setCollapsed={setThumbnailsCollapsed}
        />

        {/* Center: Slide Presentation Canvas */}
        <div className={`flex-1 flex flex-col overflow-hidden ${tintClass}`}>
          {/* Work area around slide */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 flex items-start justify-center">
            <div
              className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden transition-transform origin-top my-auto"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* PowerPoint Slide Header Indicator */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500 font-sans print:hidden">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D24726]"></span>
                  <span className="font-bold text-slate-800">
                    Dia {currentSlideNum}: {activeModule.toUpperCase()}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span>16:9 Breedbeeldindeling</span>
                </div>

                <div className="flex items-center gap-2">
                  {accessibility.dyslexiaFont && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center gap-1">
                      <Type className="w-3 h-3 text-[#D24726]" />
                      Lexend Dyslexie-lettertype actief
                    </span>
                  )}
                  <button
                    onClick={() => setShowCurriculumModal(true)}
                    className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>LPD K2 & 6</span>
                  </button>
                </div>
              </div>

              {/* Slide Content Area */}
              <div className="p-4 sm:p-6 lg:p-8">
                {renderModuleContent()}
              </div>
            </div>
          </div>

          {/* Collapsible Speaker Notes Drawer beneath the slide */}
          <SpeakerNotesDrawer
            activeModule={activeModule}
            isOpen={showSpeakerNotes}
            onToggle={() => setShowSpeakerNotes(!showSpeakerNotes)}
          />
        </div>
      </div>

      {/* 4. Microsoft PowerPoint Status Bar */}
      <PowerPointStatusBar
        currentSlideNum={currentSlideNum}
        totalSlides={moduleOrder.length}
        session={session}
        accessibility={accessibility}
        onChangeAccessibility={handleChangeAccessibility}
        showSpeakerNotes={showSpeakerNotes}
        setShowSpeakerNotes={setShowSpeakerNotes}
        onStartSlideShow={() => setIsSlideShowOpen(true)}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />

      {/* MODALS */}
      {/* Session Manager Modal */}
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        currentSession={session}
        onSessionChange={handleSessionChange}
      />

      {/* Teacher Dashboard Modal */}
      <TeacherDashboardModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        onSelectSession={handleSessionChange}
      />

      {/* PowerPoint Backstage / File Modal */}
      <BackstageModal
        isOpen={isBackstageOpen}
        onClose={() => setIsBackstageOpen(false)}
        session={session}
        accessibility={accessibility}
        onChangeAccessibility={handleChangeAccessibility}
        onOpenSessionModal={() => setIsSessionModalOpen(true)}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onPrintCertificate={() => {
          setActiveModule('diploma');
          setTimeout(() => window.print(), 300);
        }}
      />

      {/* Full screen slide show modal */}
      <SlideShowModal
        isOpen={isSlideShowOpen}
        onClose={() => setIsSlideShowOpen(false)}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        session={session}
        accessibility={accessibility}
      >
        {renderModuleContent()}
      </SlideShowModal>

      {/* Curriculum Goals Modal */}
      {showCurriculumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                  Leerplan ICT 1ste graad Katholiek Onderwijs Vlaanderen
                </h3>
              </div>
              <button
                onClick={() => setShowCurriculumModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Deze interactieve lesmodule dekt de doelstellingen uit het officiële leerplan <strong>I-ICT-ab (versie oktober 2024)</strong>:
            </p>

            <div className="space-y-3">
              {CURRICULUM_GOALS.map((goal) => (
                <div key={goal.code} className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-orange-800 bg-orange-100 px-2 py-0.5 rounded">
                      {goal.code}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{goal.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {goal.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              Inclusief: KISS-principe, 6x6-regel, contrastnormen, evenredig schalen van afbeeldingen (geen vervorming), en auteursrechtelijke bronvermelding.
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setShowCurriculumModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
