import vocabularyData from "./kids_vocabulary_ages_5_6.json";

export interface Question {
  id: number;
  word: string;
  correctAnswer: string;
  options: string[];
  imageUrl: string;
  category: string;
}

// Function to get the correct image path for a word
const getImagePath = (word: string): string => {
  // All images are now SVG files
  const wordLower = word.toLowerCase();

  // For now, we'll prefer SVG files for animals since we just created them
  const animalWords = [
    "cat",
    "dog",
    "cow",
    "pig",
    "duck",
    "bird",
    "fish",
    "frog",
    "sheep",
    "horse",
    "goat",
    "hen",
    "bear",
    "lion",
    "tiger",
    "elephant",
    "monkey",
    "snake",
    "mouse",
    "rabbit",
  ];

  // For body parts, we'll prefer the SVG files we just created
  const bodyPartWords = [
    "head",
    "hair",
    "eyes",
    "ears",
    "nose",
    "mouth",
    "teeth",
    "hand",
    "leg",
    "foot",
  ];

  // For clothing items, we'll prefer the SVG files we just created
  const clothingWords = [
    "shirt",
    "pants",
    "dress",
    "hat",
    "shoes",
    "socks",
    "coat",
    "scarf",
    "gloves",
    "boots",
  ];

  // For colors, we'll prefer the SVG files we just created
  const colorWords = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "black",
    "white",
    "brown",
  ];

  // For numbers, we'll prefer the SVG files we just created
  const numberWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];

  // For everyday objects, we'll prefer the SVG files we just created
  const objectWords = [
    "book",
    "pen",
    "pencil",
    "paper",
    "chair",
    "bed",
    "ball",
    "cup",
    "spoon",
    "fork",
    "plate",
    "phone",
    "bag",
    "box",
    "car",
    "bus",
    "door",
    "window",
    "light",
    "clock",
    "toy",
    "brush",
    "key",
    "block",
  ];

  // For nature items, we'll prefer the SVG files we just created
  const natureWords = [
    "sun",
    "moon",
    "star",
    "cloud",
    "rain",
    "snow",
    "tree",
    "leaf",
    "flower",
    "rock",
  ];

  // For family & people, we'll prefer the SVG files we just created
  const familyPeopleWords = [
    "mom",
    "dad",
    "baby",
    "girl",
    "boy",
    "sister",
    "brother",
    "grandma",
    "grandpa",
    "friend",
  ];

  // For actions, we'll prefer the SVG files we just created
  const actionWords = [
    "run",
    "jump",
    "walk",
    "eat",
    "drink",
    "play",
    "sleep",
    "talk",
    "sing",
    "read",
    "write",
    "sit",
    "stand",
    "look",
    "help",
  ];

  if (animalWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (bodyPartWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (clothingWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (colorWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (numberWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (objectWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (natureWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (familyPeopleWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  if (actionWords.includes(wordLower)) {
    return `/images/${wordLower}.svg`;
  }

  // Default: use word as filename with .svg extension
  return `/images/${wordLower}.svg`;
};

// Utility function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility function to get random items from array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
};

// Generate questions from vocabulary data
const generateQuestions = (): Question[] => {
  const questions: Question[] = [];
  let questionId = 1;

  // Process each category but limit to create a manageable game
  Object.entries(vocabularyData).forEach(([category, words]) => {
    // Take only 2 words from each category to create a focused learning experience
    const selectedWords = getRandomItems(words, Math.min(2, words.length));

    selectedWords.forEach((word) => {
      // Create wrong options by mixing words from the same category first, then others
      const sameCategory = words.filter((w) => w !== word);
      const otherCategoryWords = Object.values(vocabularyData)
        .flat()
        .filter((w) => w !== word && !words.includes(w));

      // Prefer words from same category for more challenging but relevant options
      const availableWrongOptions = [...sameCategory, ...otherCategoryWords];
      const wrongOptions = getRandomItems(availableWrongOptions, 3);
      const allOptions = shuffleArray([word, ...wrongOptions]);

      // Get the correct image path for this word
      const imageUrl = getImagePath(word);

      questions.push({
        id: questionId++,
        word: "What is this?",
        correctAnswer: word,
        options: allOptions,
        imageUrl: imageUrl,
        category: category,
      });
    });
  });

  // Shuffle and limit to 15 questions for a good learning session
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.slice(0, 10);
};

export const questions: Question[] = generateQuestions();
