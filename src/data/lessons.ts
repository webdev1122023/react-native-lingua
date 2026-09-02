import type { LanguageCode, Lesson } from "@/types/learning";

// Beginner-friendly sample lessons for a few languages. Each lesson carries
// its own vocabulary, phrases, and activities, plus an `aiTeacherPrompt`
// used to brief the AI teacher (Vision Agent) for the audio lesson session.
// Follow this same shape when adding more lessons.
export const lessons: Lesson[] = [
  // ---- Russian: Basics 1 ----
  {
    id: "ru-lesson-1",
    unitId: "ru-unit-1",
    languageId: "ru",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself in Russian.",
    goal: "Greet someone and introduce yourself in Russian.",
    order: 1,
    xp: 10,
    vocabulary: [
      { id: "ru-l1-v1", term: "привет", translation: "hi", transliteration: "privet" },
      {
        id: "ru-l1-v2",
        term: "здравствуйте",
        translation: "hello (formal)",
        transliteration: "zdravstvuyte",
      },
      {
        id: "ru-l1-v3",
        term: "до свидания",
        translation: "goodbye",
        transliteration: "do svidaniya",
      },
      {
        id: "ru-l1-v4",
        term: "пожалуйста",
        translation: "please",
        transliteration: "pozhaluysta",
      },
      {
        id: "ru-l1-v5",
        term: "спасибо",
        translation: "thank you",
        transliteration: "spasibo",
      },
    ],
    phrases: [
      {
        id: "ru-l1-p1",
        text: "Как тебя зовут?",
        translation: "What is your name?",
        context: "Ask someone for their name.",
      },
      {
        id: "ru-l1-p2",
        text: "Меня зовут...",
        translation: "My name is...",
        context: "Introduce yourself.",
      },
      {
        id: "ru-l1-p3",
        text: "Очень приятно",
        translation: "Nice to meet you",
        context: "Say after being introduced to someone.",
      },
    ],
    activities: [
      {
        id: "ru-l1-a1",
        type: "vocabulary",
        instruction: "Learn how to greet someone in Russian.",
        vocabularyIds: ["ru-l1-v1", "ru-l1-v2", "ru-l1-v3", "ru-l1-v4", "ru-l1-v5"],
      },
      {
        id: "ru-l1-a2",
        type: "phrase-practice",
        instruction: "Practice introducing yourself.",
        phraseIds: ["ru-l1-p1", "ru-l1-p2", "ru-l1-p3"],
      },
      {
        id: "ru-l1-a3",
        type: "conversation",
        instruction: "Have a short greeting conversation with your AI teacher.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Russian teacher speaking mostly English. This lesson is only about greetings and introductions. Teach 'privet', 'zdravstvuyte', 'do svidaniya', 'pozhaluysta', and 'spasibo' one at a time, saying the Russian word, its reading, and the English meaning. Then help the student practice 'Kak tebya zovut?' and answering with 'Menya zovut...', followed by 'Ochen' priyatno'. Ask the student to repeat after you, listen to their response, and gently correct pronunciation. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },
  {
    id: "ru-lesson-2",
    unitId: "ru-unit-1",
    languageId: "ru",
    title: "Family & Friends",
    description: "Talk about your family and friends in Russian.",
    goal: "Describe your family members in Russian.",
    order: 2,
    xp: 15,
    vocabulary: [
      { id: "ru-l2-v1", term: "семья", translation: "family", transliteration: "sem'ya" },
      { id: "ru-l2-v2", term: "мама", translation: "mom", transliteration: "mama" },
      { id: "ru-l2-v3", term: "папа", translation: "dad", transliteration: "papa" },
      { id: "ru-l2-v4", term: "брат", translation: "brother", transliteration: "brat" },
      { id: "ru-l2-v5", term: "сестра", translation: "sister", transliteration: "sestra" },
      { id: "ru-l2-v6", term: "друг", translation: "friend", transliteration: "drug" },
    ],
    phrases: [
      {
        id: "ru-l2-p1",
        text: "Это моя семья",
        translation: "This is my family",
        context: "Introduce your family.",
      },
      {
        id: "ru-l2-p2",
        text: "Он мой брат",
        translation: "He is my brother",
        context: "Introduce a male family member.",
      },
      {
        id: "ru-l2-p3",
        text: "Она моя подруга",
        translation: "She is my friend",
        context: "Introduce a female friend.",
      },
    ],
    activities: [
      {
        id: "ru-l2-a1",
        type: "vocabulary",
        instruction: "Learn family and friend vocabulary.",
        vocabularyIds: [
          "ru-l2-v1",
          "ru-l2-v2",
          "ru-l2-v3",
          "ru-l2-v4",
          "ru-l2-v5",
          "ru-l2-v6",
        ],
      },
      {
        id: "ru-l2-a2",
        type: "phrase-practice",
        instruction: "Practice describing your family.",
        phraseIds: ["ru-l2-p1", "ru-l2-p2", "ru-l2-p3"],
      },
      {
        id: "ru-l2-a3",
        type: "conversation",
        instruction: "Tell your AI teacher about your family.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Russian teacher speaking mostly English. This lesson is only about family and friends. Teach 'sem'ya', 'mama', 'papa', 'brat', 'sestra', and 'drug' one at a time with English translations. Then help the student build sentences like 'Eto moya sem'ya' and 'On moy brat'. Ask the student to describe their own family using these words, listen closely, and correct gently. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },

  // ---- Twi: Basics 1 ----
  {
    id: "tw-lesson-1",
    unitId: "tw-unit-1",
    languageId: "tw",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself in Twi.",
    goal: "Greet someone and introduce yourself in Twi.",
    order: 1,
    xp: 10,
    vocabulary: [
      { id: "tw-l1-v1", term: "Akwaaba", translation: "welcome" },
      { id: "tw-l1-v2", term: "Ɛte sɛn?", translation: "how are you?" },
      { id: "tw-l1-v3", term: "Eye", translation: "I'm fine / it's good" },
      { id: "tw-l1-v4", term: "Medaase", translation: "thank you" },
      { id: "tw-l1-v5", term: "Nante yie", translation: "goodbye (go well)" },
    ],
    phrases: [
      {
        id: "tw-l1-p1",
        text: "Yɛfrɛ wo sɛn?",
        translation: "What is your name?",
        context: "Ask someone for their name.",
      },
      {
        id: "tw-l1-p2",
        text: "Me din de...",
        translation: "My name is...",
        context: "Introduce yourself.",
      },
      {
        id: "tw-l1-p3",
        text: "Anigye sɛ mahyia wo",
        translation: "Nice to meet you",
        context: "Say after being introduced to someone.",
      },
    ],
    activities: [
      {
        id: "tw-l1-a1",
        type: "vocabulary",
        instruction: "Learn how to greet someone in Twi.",
        vocabularyIds: ["tw-l1-v1", "tw-l1-v2", "tw-l1-v3", "tw-l1-v4", "tw-l1-v5"],
      },
      {
        id: "tw-l1-a2",
        type: "phrase-practice",
        instruction: "Practice introducing yourself.",
        phraseIds: ["tw-l1-p1", "tw-l1-p2", "tw-l1-p3"],
      },
      {
        id: "tw-l1-a3",
        type: "conversation",
        instruction: "Have a short greeting conversation with your AI teacher.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Twi teacher speaking mostly English. This lesson is only about greetings and introductions. Teach 'Akwaaba', 'Ɛte sɛn?', 'Eye', 'Medaase', and 'Nante yie' one at a time, giving the English translation right after each. Then help the student practice 'Yɛfrɛ wo sɛn?' and answering with 'Me din de...', followed by 'Anigye sɛ mahyia wo'. Ask the student to repeat words after you, listen to their response, and gently correct pronunciation. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },
  {
    id: "tw-lesson-2",
    unitId: "tw-unit-1",
    languageId: "tw",
    title: "Family & Friends",
    description: "Talk about your family and friends in Twi.",
    goal: "Describe your family members in Twi.",
    order: 2,
    xp: 15,
    vocabulary: [
      { id: "tw-l2-v1", term: "Abusua", translation: "family" },
      { id: "tw-l2-v2", term: "Maame", translation: "mother" },
      { id: "tw-l2-v3", term: "Agya", translation: "father" },
      { id: "tw-l2-v4", term: "Nuabarima", translation: "brother" },
      { id: "tw-l2-v5", term: "Nuabaa", translation: "sister" },
      { id: "tw-l2-v6", term: "Adamfo", translation: "friend" },
    ],
    phrases: [
      {
        id: "tw-l2-p1",
        text: "Yei ne m'abusua",
        translation: "This is my family",
        context: "Introduce your family.",
      },
      {
        id: "tw-l2-p2",
        text: "Ɔyɛ me nuabarima",
        translation: "He is my brother",
        context: "Introduce a male family member.",
      },
      {
        id: "tw-l2-p3",
        text: "Ɔyɛ m'adamfo",
        translation: "She is my friend",
        context: "Introduce a friend.",
      },
    ],
    activities: [
      {
        id: "tw-l2-a1",
        type: "vocabulary",
        instruction: "Learn family and friend vocabulary.",
        vocabularyIds: [
          "tw-l2-v1",
          "tw-l2-v2",
          "tw-l2-v3",
          "tw-l2-v4",
          "tw-l2-v5",
          "tw-l2-v6",
        ],
      },
      {
        id: "tw-l2-a2",
        type: "phrase-practice",
        instruction: "Practice describing your family.",
        phraseIds: ["tw-l2-p1", "tw-l2-p2", "tw-l2-p3"],
      },
      {
        id: "tw-l2-a3",
        type: "conversation",
        instruction: "Tell your AI teacher about your family.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Twi teacher speaking mostly English. This lesson is only about family and friends. Teach 'Abusua', 'Maame', 'Agya', 'Nuabarima', 'Nuabaa', and 'Adamfo' one at a time with English translations. Then help the student build sentences like 'Yei ne m'abusua' and 'Ɔyɛ me nuabarima'. Ask the student to describe their own family using these words, listen closely, and correct gently. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },

  // ---- Spanish: Basics 1 ----
  {
    id: "es-lesson-1",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself in Spanish.",
    goal: "Greet someone and introduce yourself in Spanish.",
    order: 1,
    xp: 10,
    vocabulary: [
      { id: "es-l1-v1", term: "hola", translation: "hello" },
      { id: "es-l1-v2", term: "buenos días", translation: "good morning" },
      { id: "es-l1-v3", term: "adiós", translation: "goodbye" },
      { id: "es-l1-v4", term: "por favor", translation: "please" },
      { id: "es-l1-v5", term: "gracias", translation: "thank you" },
    ],
    phrases: [
      {
        id: "es-l1-p1",
        text: "¿Cómo te llamas?",
        translation: "What is your name?",
        context: "Ask someone for their name.",
      },
      {
        id: "es-l1-p2",
        text: "Me llamo...",
        translation: "My name is...",
        context: "Introduce yourself.",
      },
      {
        id: "es-l1-p3",
        text: "Mucho gusto",
        translation: "Nice to meet you",
        context: "Say after being introduced to someone.",
      },
    ],
    activities: [
      {
        id: "es-l1-a1",
        type: "vocabulary",
        instruction: "Learn how to greet someone in Spanish.",
        vocabularyIds: ["es-l1-v1", "es-l1-v2", "es-l1-v3", "es-l1-v4", "es-l1-v5"],
      },
      {
        id: "es-l1-a2",
        type: "phrase-practice",
        instruction: "Practice introducing yourself.",
        phraseIds: ["es-l1-p1", "es-l1-p2", "es-l1-p3"],
      },
      {
        id: "es-l1-a3",
        type: "conversation",
        instruction: "Have a short greeting conversation with your AI teacher.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Spanish teacher speaking mostly English. This lesson is only about greetings and introductions. Teach 'hola', 'buenos días', 'adiós', 'por favor', and 'gracias' one at a time, giving the English translation right after each. Then help the student practice '¿Cómo te llamas?' and answering with 'Me llamo...', followed by 'Mucho gusto'. Ask the student to repeat words after you, listen to their response, and gently correct pronunciation. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },
  {
    id: "es-lesson-2",
    unitId: "es-unit-1",
    languageId: "es",
    title: "Family & Friends",
    description: "Talk about your family and friends in Spanish.",
    goal: "Describe your family members in Spanish.",
    order: 2,
    xp: 15,
    vocabulary: [
      { id: "es-l2-v1", term: "familia", translation: "family" },
      { id: "es-l2-v2", term: "madre", translation: "mother" },
      { id: "es-l2-v3", term: "padre", translation: "father" },
      { id: "es-l2-v4", term: "hermano", translation: "brother" },
      { id: "es-l2-v5", term: "hermana", translation: "sister" },
      { id: "es-l2-v6", term: "amigo/a", translation: "friend" },
    ],
    phrases: [
      {
        id: "es-l2-p1",
        text: "Esta es mi familia",
        translation: "This is my family",
        context: "Introduce your family.",
      },
      {
        id: "es-l2-p2",
        text: "Él es mi hermano",
        translation: "He is my brother",
        context: "Introduce a male family member.",
      },
      {
        id: "es-l2-p3",
        text: "Ella es mi amiga",
        translation: "She is my friend",
        context: "Introduce a female friend.",
      },
    ],
    activities: [
      {
        id: "es-l2-a1",
        type: "vocabulary",
        instruction: "Learn family and friend vocabulary.",
        vocabularyIds: [
          "es-l2-v1",
          "es-l2-v2",
          "es-l2-v3",
          "es-l2-v4",
          "es-l2-v5",
          "es-l2-v6",
        ],
      },
      {
        id: "es-l2-a2",
        type: "phrase-practice",
        instruction: "Practice describing your family.",
        phraseIds: ["es-l2-p1", "es-l2-p2", "es-l2-p3"],
      },
      {
        id: "es-l2-a3",
        type: "conversation",
        instruction: "Tell your AI teacher about your family.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Spanish teacher speaking mostly English. This lesson is only about family and friends. Teach 'familia', 'madre', 'padre', 'hermano', 'hermana', and 'amigo/a' one at a time with English translations. Then help the student build sentences like 'Esta es mi familia' and 'Él es mi hermano'. Ask the student to describe their own family using these words, listen closely, and correct gently. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },

  // ---- French: Basics 1 ----
  {
    id: "fr-lesson-1",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself in French.",
    goal: "Greet someone and introduce yourself in French.",
    order: 1,
    xp: 10,
    vocabulary: [
      { id: "fr-l1-v1", term: "bonjour", translation: "hello / good morning" },
      { id: "fr-l1-v2", term: "bonsoir", translation: "good evening" },
      { id: "fr-l1-v3", term: "au revoir", translation: "goodbye" },
      { id: "fr-l1-v4", term: "s'il vous plaît", translation: "please" },
      { id: "fr-l1-v5", term: "merci", translation: "thank you" },
    ],
    phrases: [
      {
        id: "fr-l1-p1",
        text: "Comment tu t'appelles ?",
        translation: "What is your name?",
        context: "Ask someone for their name.",
      },
      {
        id: "fr-l1-p2",
        text: "Je m'appelle...",
        translation: "My name is...",
        context: "Introduce yourself.",
      },
      {
        id: "fr-l1-p3",
        text: "Enchanté(e)",
        translation: "Nice to meet you",
        context: "Say after being introduced to someone.",
      },
    ],
    activities: [
      {
        id: "fr-l1-a1",
        type: "vocabulary",
        instruction: "Learn how to greet someone in French.",
        vocabularyIds: ["fr-l1-v1", "fr-l1-v2", "fr-l1-v3", "fr-l1-v4", "fr-l1-v5"],
      },
      {
        id: "fr-l1-a2",
        type: "phrase-practice",
        instruction: "Practice introducing yourself.",
        phraseIds: ["fr-l1-p1", "fr-l1-p2", "fr-l1-p3"],
      },
      {
        id: "fr-l1-a3",
        type: "conversation",
        instruction: "Have a short greeting conversation with your AI teacher.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging French teacher speaking mostly English. This lesson is only about greetings and introductions. Teach 'bonjour', 'bonsoir', 'au revoir', 's'il vous plaît', and 'merci' one at a time with English translations. Then help the student practice 'Comment tu t'appelles ?' and answering with 'Je m'appelle...', followed by 'Enchanté(e)'. Ask the student to repeat after you, listen to their response, and gently correct pronunciation. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },
  {
    id: "fr-lesson-2",
    unitId: "fr-unit-1",
    languageId: "fr",
    title: "At the Café",
    description: "Order food and drinks at a French café.",
    goal: "Order a drink and ask for the bill in French.",
    order: 2,
    xp: 15,
    vocabulary: [
      { id: "fr-l2-v1", term: "un café", translation: "a coffee" },
      { id: "fr-l2-v2", term: "de l'eau", translation: "water" },
      { id: "fr-l2-v3", term: "l'addition", translation: "the bill" },
      { id: "fr-l2-v4", term: "je voudrais", translation: "I would like" },
      { id: "fr-l2-v5", term: "merci beaucoup", translation: "thank you very much" },
    ],
    phrases: [
      {
        id: "fr-l2-p1",
        text: "Je voudrais un café, s'il vous plaît",
        translation: "I would like a coffee, please",
        context: "Order a drink.",
      },
      {
        id: "fr-l2-p2",
        text: "L'addition, s'il vous plaît",
        translation: "The bill, please",
        context: "Ask for the bill.",
      },
      {
        id: "fr-l2-p3",
        text: "C'est combien ?",
        translation: "How much is it?",
        context: "Ask for a price.",
      },
    ],
    activities: [
      {
        id: "fr-l2-a1",
        type: "vocabulary",
        instruction: "Learn café ordering vocabulary.",
        vocabularyIds: ["fr-l2-v1", "fr-l2-v2", "fr-l2-v3", "fr-l2-v4", "fr-l2-v5"],
      },
      {
        id: "fr-l2-a2",
        type: "phrase-practice",
        instruction: "Practice ordering at a café.",
        phraseIds: ["fr-l2-p1", "fr-l2-p2", "fr-l2-p3"],
      },
      {
        id: "fr-l2-a3",
        type: "conversation",
        instruction: "Role-play ordering a drink with your AI teacher.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging French teacher speaking mostly English. This lesson is only about ordering at a café. Teach 'un café', 'de l'eau', 'l'addition', 'je voudrais', and 'merci beaucoup' one at a time with English translations. Then role-play a café order using 'Je voudrais un café, s'il vous plaît' and 'L'addition, s'il vous plaît'. Ask the student to order out loud, listen closely, and correct gently. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },

  // ---- Japanese: Basics 1 ----
  {
    id: "ja-lesson-1",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself in Japanese.",
    goal: "Greet someone and introduce yourself in Japanese.",
    order: 1,
    xp: 10,
    vocabulary: [
      {
        id: "ja-l1-v1",
        term: "こんにちは",
        translation: "hello",
        transliteration: "konnichiwa",
      },
      {
        id: "ja-l1-v2",
        term: "おはようございます",
        translation: "good morning",
        transliteration: "ohayou gozaimasu",
      },
      {
        id: "ja-l1-v3",
        term: "さようなら",
        translation: "goodbye",
        transliteration: "sayounara",
      },
      {
        id: "ja-l1-v4",
        term: "ありがとう",
        translation: "thank you",
        transliteration: "arigatou",
      },
      {
        id: "ja-l1-v5",
        term: "すみません",
        translation: "excuse me / sorry",
        transliteration: "sumimasen",
      },
    ],
    phrases: [
      {
        id: "ja-l1-p1",
        text: "はじめまして",
        translation: "Nice to meet you",
        context: "Say when meeting someone for the first time.",
      },
      {
        id: "ja-l1-p2",
        text: "わたしは...です",
        translation: "I am...",
        context: "Introduce yourself.",
      },
      {
        id: "ja-l1-p3",
        text: "よろしくお願いします",
        translation: "Please treat me well / nice to meet you",
        context: "Polite closing after introducing yourself.",
      },
    ],
    activities: [
      {
        id: "ja-l1-a1",
        type: "vocabulary",
        instruction: "Learn how to greet someone in Japanese.",
        vocabularyIds: ["ja-l1-v1", "ja-l1-v2", "ja-l1-v3", "ja-l1-v4", "ja-l1-v5"],
      },
      {
        id: "ja-l1-a2",
        type: "phrase-practice",
        instruction: "Practice introducing yourself.",
        phraseIds: ["ja-l1-p1", "ja-l1-p2", "ja-l1-p3"],
      },
      {
        id: "ja-l1-a3",
        type: "conversation",
        instruction: "Have a short greeting conversation with your AI teacher.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Japanese teacher speaking mostly English. This lesson is only about greetings and introductions. Teach 'konnichiwa', 'ohayou gozaimasu', 'sayounara', 'arigatou', and 'sumimasen' one at a time, saying the Japanese word, its reading, and the English meaning. Then help the student practice 'hajimemashite', introducing themselves with 'watashi wa ... desu', and closing with 'yoroshiku onegaishimasu'. Ask the student to repeat after you, listen closely, and gently correct pronunciation. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },
  {
    id: "ja-lesson-2",
    unitId: "ja-unit-1",
    languageId: "ja",
    title: "Self-Introduction",
    description: "Talk about your name and what you're studying.",
    goal: "Introduce your name and say what language you're studying.",
    order: 2,
    xp: 15,
    vocabulary: [
      { id: "ja-l2-v1", term: "なまえ", translation: "name", transliteration: "namae" },
      {
        id: "ja-l2-v2",
        term: "がくせい",
        translation: "student",
        transliteration: "gakusei",
      },
      {
        id: "ja-l2-v3",
        term: "せんせい",
        translation: "teacher",
        transliteration: "sensei",
      },
      {
        id: "ja-l2-v4",
        term: "にほんご",
        translation: "Japanese (language)",
        transliteration: "nihongo",
      },
      {
        id: "ja-l2-v5",
        term: "えいご",
        translation: "English (language)",
        transliteration: "eigo",
      },
    ],
    phrases: [
      {
        id: "ja-l2-p1",
        text: "お名前は何ですか",
        translation: "What is your name?",
        context: "Ask someone for their name politely.",
      },
      {
        id: "ja-l2-p2",
        text: "わたしはがくせいです",
        translation: "I am a student",
        context: "Describe your occupation.",
      },
      {
        id: "ja-l2-p3",
        text: "にほんごをべんきょうしています",
        translation: "I am studying Japanese",
        context: "Say what language you're studying.",
      },
    ],
    activities: [
      {
        id: "ja-l2-a1",
        type: "vocabulary",
        instruction: "Learn self-introduction vocabulary.",
        vocabularyIds: ["ja-l2-v1", "ja-l2-v2", "ja-l2-v3", "ja-l2-v4", "ja-l2-v5"],
      },
      {
        id: "ja-l2-a2",
        type: "phrase-practice",
        instruction: "Practice introducing yourself in more detail.",
        phraseIds: ["ja-l2-p1", "ja-l2-p2", "ja-l2-p3"],
      },
      {
        id: "ja-l2-a3",
        type: "conversation",
        instruction: "Introduce yourself fully to your AI teacher.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, encouraging Japanese teacher speaking mostly English. This lesson is only about self-introduction. Teach 'namae', 'gakusei', 'sensei', 'nihongo', and 'eigo' one at a time, saying the Japanese word, its reading, and the English meaning. Then help the student build sentences like 'watashi wa gakusei desu' and 'nihongo o benkyou shiteimasu'. Ask the student to introduce themselves out loud, listen closely, and correct gently. Keep replies to one or two short sentences and stay strictly on this lesson's content.",
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByLanguage(languageId: LanguageCode): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}
