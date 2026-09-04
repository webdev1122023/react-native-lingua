import type { LanguageCode, Unit } from "@/types/learning";

// Beginner-friendly sample units. Each unit groups a handful of lessons
// for a language (see data/lessons.ts). Extend this list following the
// same shape when adding more content.
export const units: Unit[] = [
  {
    id: "ru-unit-1",
    languageId: "ru",
    title: "Основы 1 (Basics 1)",
    description: "Greet people and talk about family.",
    order: 1,
  },
  {
    id: "tw-unit-1",
    languageId: "tw",
    title: "Nsɛnhyɛ 1 (Basics 1)",
    description: "Greet people and talk about family.",
    order: 1,
  },
  {
    id: "es-unit-1",
    languageId: "es",
    title: "Basics 1",
    description: "Greet people and talk about family.",
    order: 1,
  },
  {
    id: "fr-unit-1",
    languageId: "fr",
    title: "Basics 1",
    description: "Say hello and order at a café.",
    order: 1,
  },
  {
    id: "ja-unit-1",
    languageId: "ja",
    title: "基礎 1 (Basics 1)",
    description: "Greetings and introducing yourself.",
    order: 1,
  },
  {
    id: "de-unit-1",
    languageId: "de",
    title: "Grundlagen 1 (Basics 1)",
    description: "Greetings, family, numbers, and everyday phrases.",
    order: 1,
  },
  {
    id: "it-unit-1",
    languageId: "it",
    title: "Basi 1 (Basics 1)",
    description: "Greetings, family, numbers, and everyday phrases.",
    order: 1,
  },
  {
    id: "ko-unit-1",
    languageId: "ko",
    title: "기초 1 (Basics 1)",
    description: "Greetings, family, numbers, and everyday phrases.",
    order: 1,
  },
];

export function getUnitsByLanguage(languageId: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
