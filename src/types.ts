export interface StudentSession {
  id: string;
  studentName: string;
  studentClass: string;
  createdAt: string;
  lastActive: string;
  completedModules: string[];
  quizAnswers: Record<number, number>;
  quizScore: number;
  quizCompleted: boolean;
  spotErrorsFound: Record<string, string[]>;
  makeoverProject: {
    theme: 'space' | 'animals' | 'ocean';
    title: string;
    bulletPoints: string[];
    bgColor: string;
    textColor: string;
    fontFamily: string;
    imageScale: 'cover' | 'contain' | 'stretched';
    selectedImage: string;
    hasAttribution: boolean;
    attributionText: string;
    submitted: boolean;
    score: number;
  };
  diplomaIssued: boolean;
  accessibility?: {
    dyslexiaFont: boolean;
    fontSize: 'small' | 'normal' | 'large' | 'xlarge';
    lineSpacing: 'normal' | 'spacious';
    readingRuler: boolean;
    tintedBackground: boolean;
  };
}

export interface AccessibilitySettings {
  dyslexiaFont: boolean;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  lineSpacing: 'normal' | 'spacious';
  readingRuler: boolean;
  tintedBackground: boolean;
}

export interface QuizQuestion {
  id: number;
  curriculumCode: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface ErrorHotspot {
  id: string;
  label: string;
  description: string;
  category: 'tekst' | 'contrast' | 'afbeelding' | 'auteursrecht' | 'lettertype';
}

export interface SlideCase {
  id: string;
  title: string;
  topic: string;
  badSlide: {
    headline: string;
    paragraphs: string[];
    bgClass: string;
    textClass: string;
    fontClass: string;
    imageSrc: string;
    imageCaption?: string;
    stretchedImage?: boolean;
    distractions?: string[];
  };
  goodSlide: {
    headline: string;
    bullets: string[];
    bgClass: string;
    textClass: string;
    fontClass: string;
    imageSrc: string;
    imageAttribution: string;
    speakerNotes: string;
  };
  errorsToFind: ErrorHotspot[];
}
