export type TQuestion = {
  id: number;
  text: string;
  type:
    | "multiple-choice" // Standard multiple-choice question with one correct answer
    | "true-false" // Standard true/false question
    | "short-answer" // Open-ended question where players type their answer
    | "fill-in-the-blank" // Question with a blank to fill in, e.g. "The capital of France is ___"
    | "matching" // Players match items from two lists, e.g. "Match the country with its capital"
    | "ordering" // Players arrange items in the correct order, e.g. "Arrange the historical events in chronological order"
    | "image-based" // Question that requires players to identify something in an image
    | "audio-based" // Question that requires players to identify something in an audio clip
    | "video-based" // Question that requires players to identify something in a video clip
    | "code-snippet" // Question that requires players to analyze a code snippet and answer a question about it
    | "drag-and-drop" // Question that requires players to drag and drop answers into the correct positions
    | "guess-the-number" // Question that requires players to guess a number within a certain range
    | "memorize-the-order" // Question that requires players to memorize the order of items and recall them
    | "reveal-in-order" // Question that requires players to reveal the answers in a specific order to solve a puzzle
    | "multiple-choice-shared-answers"; // Answer locked once selected, shared among multiple questions
  options?: string[]; // Only for multiple-choice questions
  correctAnswer: string | boolean; // String for multiple-choice, short-answer, and fill-in-the-blank, boolean for true-false
  points: number;
  doublePoints?: boolean; // If true, points for this question are doubled if answered correctly and reduce by double if answered incorrectly
};

export type TQuiz = {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  category:
    | "general"
    | "science"
    | "history"
    | "entertainment"
    | "sports"
    | "geography"
    | "literature"
    | "technology"
    | "art"
    | "music"
    | "movies"
    | "tv-shows"
    | "video-games"
    | "food-and-drink"
    | "animals"
    | "nature"
    | "space"
    | "math"
    | "language"
    | "miscellaneous"
    | "coding";
  difficulty: "easy" | "medium" | "hard" | "expert";
  // Game modes:
  // - classic: standard quiz format with a fixed number of questions and no time limit
  // - timed: players have a limited amount of time to answer each question
  // - survival: players continue until they answer incorrectly, with a limited number of lives
  gameMode: "classic" | "timed" | "survival";
  settings: {
    timeLimitPerRound: number; // in seconds
    passingScorePercentage: number; // percentage required to pass
    shuffleQuestions: boolean;
    immediateResults: boolean;
    lives: number; // maximum attempts allowed
  };
  questions: TQuestion[];
  createdAt: string;
  updatedAt: string;
};

export const dbQuiz: TQuiz[] = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    description: "Test your general knowledge with this fun quiz!",
    creatorId: 123,
    category: "general",
    difficulty: "medium",
    gameMode: "classic",
    settings: {
      timeLimitPerRound: 60,
      passingScorePercentage: 70,
      shuffleQuestions: true,
      immediateResults: false,
      lives: 3,
    },
    questions: [
      {
        id: 1,
        text: "What is the capital of France?",
        type: "multiple-choice",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
        points: 10,
        doublePoints: true,
      },
      {
        id: 2,
        text: "The Earth is flat.",
        type: "true-false",
        correctAnswer: false,
        points: 5,
      },
      {
        id: 3,
        text: "Who wrote 'To Kill a Mockingbird'?",
        type: "short-answer",
        correctAnswer: "Harper Lee",
        points: 15,
      },
      {
        id: 4,
        text: "The chemical symbol for water is ___.",
        type: "fill-in-the-blank",
        correctAnswer: "H2O",
        points: 10,
      },
      {
        id: 5,
        text: "Match the following countries with their capitals.",
        type: "matching",
        options: ["France - Paris", "Germany - Berlin", "Spain - Madrid", "Italy - Rome"],
        correctAnswer: "France - Paris, Germany - Berlin, Spain - Madrid, Italy - Rome",
        points: 20,
      },
      {
        id: 6,
        text: "Arrange the following historical events in chronological order.",
        type: "ordering",
        options: ["World War I", "American Revolution", "French Revolution", "World War II"],
        correctAnswer: "American Revolution, French Revolution, World War I, World War II",
        points: 20,
      },
      {
        id: 7,
        text: "Identify the object in the image.",
        type: "image-based",
        options: ["Eiffel Tower", "Statue of Liberty", "Big Ben", "Colosseum"],
        correctAnswer: "Eiffel Tower",
        points: 15,
      },
      {
        id: 8,
        text: "Listen to the audio and identify the song.",
        type: "audio-based",
        options: ["Song A", "Song B", "Song C", "Song D"],
        correctAnswer: "Song A",
        points: 15,
      },
      {
        id: 9,
        text: "Watch the video and answer the question.",
        type: "video-based",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: "Option 2",
        points: 15,
      },
      {
        id: 10,
        text: "What does the following code snippet output?",
        type: "code-snippet",
        options: ["Output A", "Output B", "Output C", "Output D"],
        correctAnswer: "Output C",
        points: 20,
      },
      {
        id: 11,
        text: "Drag and drop the correct answers into the boxes.",
        type: "drag-and-drop",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A, Option C",
        points: 20,
      },
      {
        id: 12,
        text: "Guess the number between 1 and 100.",
        type: "guess-the-number",
        correctAnswer: "42",
        points: 25,
      },
      {
        id: 13,
        text: "Memorize the order of the following items and recall them.",
        type: "memorize-the-order",
        options: ["Item A", "Item B", "Item C", "Item D"],
        correctAnswer: "Item B, Item D, Item A, Item C",
        points: 20,
      },
      {
        id: 14,
        text: "Reveal the answers in the correct order to solve the puzzle.",
        type: "reveal-in-order",
        options: ["Answer A", "Answer B", "Answer C", "Answer D"],
        correctAnswer: "Answer C, Answer A, Answer D, Answer B",
        points: 20,
      },
      {
        id: 15,
        text: "Select the correct answer that is shared among multiple questions.",
        type: "multiple-choice-shared-answers",
        options: ["Shared Answer A", "Shared Answer B", "Shared Answer C", "Shared Answer D"],
        correctAnswer: "Shared Answer B",
        points: 15,
      },
    ],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-02T12:00:00Z",
  },
];
