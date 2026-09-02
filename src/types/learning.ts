// Core content types for the learning content system.
// Data files under `data/` are typed against these shapes.

export type LanguageCode = "ru" | "es" | "fr" | "ja" | "de" | "it" | "ko" | "tw";

export interface Language {
  id: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

export interface VocabularyItem {
  id: string;
  term: string;
  translation: string;
  transliteration?: string;
  notes?: string;
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
  context: string;
}

export type ActivityType =
  | "vocabulary"
  | "phrase-practice"
  | "conversation"
  | "listening"
  | "pronunciation";

export interface LessonActivity {
  id: string;
  type: ActivityType;
  instruction: string;
  vocabularyIds?: string[];
  phraseIds?: string[];
}

export interface Unit {
  id: string;
  languageId: LanguageCode;
  title: string;
  description: string;
  order: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  languageId: LanguageCode;
  title: string;
  description: string;
  goal: string;
  order: number;
  xp: number;
  imageUrl?: string;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: LessonActivity[];
  /** Context handed to the AI teacher (Vision Agent) for this lesson's audio session. */
  aiTeacherPrompt: string;
}
