import type { Language, LanguageCode } from "@/types/learning";

// Supported languages shown on the language selection screen.
// Not every language has full lesson content yet (see data/units.ts and
// data/lessons.ts) — add units/lessons for a language to unlock its content.
export const languages: Language[] = [
  {
    id: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "https://flagcdn.com/w320/ru.png",
    description: "The most widely spoken Slavic language in the world.",
  },
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    description: "Spoken by over 500 million people around the world.",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    description: "The language of love, spoken across five continents.",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/jp.png",
    description: "Unlock a language rich in culture and tradition.",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    description: "The most widely spoken native language in the EU.",
  },
  {
    id: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "https://flagcdn.com/w320/it.png",
    description: "The language of art, food, and everyday beauty.",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "https://flagcdn.com/w320/kr.png",
    description: "A fast-growing language loved for its culture.",
  },
  {
    id: "tw",
    name: "Twi",
    nativeName: "Twi",
    flag: "https://flagcdn.com/w320/gh.png",
    description: "A widely spoken Akan language from Ghana.",
  },
];

export function getLanguageById(id: LanguageCode): Language | undefined {
  return languages.find((language) => language.id === id);
}
