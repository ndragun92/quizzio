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
  answeredBy?: {
    [playerId: number]: {
      answer: TQuestion["correctAnswer"];
      skipped: boolean;
    };
  };
};

export enum ECategory {
  GENERAL = "general",
  SCIENCE = "science",
  HISTORY = "history",
  ENTERTAINMENT = "entertainment",
  SPORTS = "sports",
  GEOGRAPHY = "geography",
  LITERATURE = "literature",
  TECHNOLOGY = "technology",
  ART = "art",
  MUSIC = "music",
  MOVIES = "movies",
  TV_SHOWS = "tv-shows",
  VIDEO_GAMES = "video-games",
  FOOD_AND_DRINK = "food-and-drink",
  ANIMALS = "animals",
  NATURE = "nature",
  SPACE = "space",
  MATH = "math",
  LANGUAGE = "language",
  MISCELLANEOUS = "miscellaneous",
  CODING = "coding",
}

export enum EStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum EDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  EXPERT = "expert",
}

export enum EGameMode {
  CLASSIC = "classic",
  TIMED = "timed",
  SURVIVAL = "survival",
}

export type TQuiz = {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  status?: EStatus;
  category: ECategory;
  difficulty: EDifficulty;
  // Game modes:
  // - classic: standard quiz format with a fixed number of questions and no time limit
  // - timed: players have a limited amount of time to answer each question
  // - survival: players continue until they answer incorrectly, with a limited number of lives
  gameMode: EGameMode;
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
    status: EStatus.PUBLISHED,
    category: ECategory.GENERAL,
    difficulty: EDifficulty.MEDIUM,
    gameMode: EGameMode.CLASSIC,
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
  {
    id: 2,
    title: "Science Fundamentals",
    description: "Test your basic science knowledge with this beginner-friendly quiz!",
    creatorId: 456,
    status: EStatus.PUBLISHED,
    category: ECategory.SCIENCE,
    difficulty: EDifficulty.EASY,
    gameMode: EGameMode.CLASSIC,
    settings: {
      timeLimitPerRound: 45,
      passingScorePercentage: 60,
      shuffleQuestions: true,
      immediateResults: true,
      lives: 5,
    },
    questions: [
      {
        id: 1,
        text: "What planet is known as the Red Planet?",
        type: "multiple-choice",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
        points: 10,
      },
      {
        id: 2,
        text: "Water boils at 100°C at sea level.",
        type: "true-false",
        correctAnswer: true,
        points: 5,
      },
      {
        id: 3,
        text: "The center of an atom is called the ___.",
        type: "fill-in-the-blank",
        correctAnswer: "nucleus",
        points: 10,
      },
      {
        id: 4,
        text: "How many bones are in the adult human body?",
        type: "multiple-choice",
        options: ["206", "208", "195", "212"],
        correctAnswer: "206",
        points: 15,
      },
    ],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 3,
    title: "World War II History",
    description: "Explore the key events and figures of World War II",
    creatorId: 789,
    status: EStatus.PUBLISHED,
    category: ECategory.HISTORY,
    difficulty: EDifficulty.MEDIUM,
    gameMode: EGameMode.TIMED,
    settings: {
      timeLimitPerRound: 30,
      passingScorePercentage: 70,
      shuffleQuestions: false,
      immediateResults: false,
      lives: 3,
    },
    questions: [
      {
        id: 1,
        text: "In what year did World War II begin?",
        type: "multiple-choice",
        options: ["1939", "1940", "1938", "1941"],
        correctAnswer: "1939",
        points: 10,
      },
      {
        id: 2,
        text: "Arrange these WWII events in chronological order.",
        type: "ordering",
        options: [
          "Pearl Harbor Attack",
          "D-Day Invasion",
          "Battle of Stalingrad",
          "Hiroshima Bombing",
        ],
        correctAnswer:
          "Pearl Harbor Attack, Battle of Stalingrad, D-Day Invasion, Hiroshima Bombing",
        points: 25,
        doublePoints: true,
      },
      {
        id: 3,
        text: "Who was the Prime Minister of Britain during most of WWII?",
        type: "short-answer",
        correctAnswer: "Winston Churchill",
        points: 15,
      },
      {
        id: 4,
        text: "The Battle of Midway was fought in the Pacific Ocean.",
        type: "true-false",
        correctAnswer: true,
        points: 10,
      },
      {
        id: 5,
        text: "Match the code names with their operations.",
        type: "matching",
        options: [
          "Operation Overlord - D-Day",
          "Operation Barbarossa - Invasion of USSR",
          "Operation Market Garden - Netherlands",
          "Operation Torch - North Africa",
        ],
        correctAnswer:
          "Operation Overlord - D-Day, Operation Barbarossa - Invasion of USSR, Operation Market Garden - Netherlands, Operation Torch - North Africa",
        points: 30,
      },
    ],
    createdAt: "2024-02-01T14:20:00Z",
    updatedAt: "2024-02-05T09:15:00Z",
  },
  {
    id: 4,
    title: "Advanced JavaScript Concepts",
    description: "Challenge yourself with advanced JavaScript patterns and concepts",
    creatorId: 123,
    status: EStatus.DRAFT,
    category: ECategory.TECHNOLOGY,
    difficulty: EDifficulty.HARD,
    gameMode: EGameMode.SURVIVAL,
    settings: {
      timeLimitPerRound: 90,
      passingScorePercentage: 80,
      shuffleQuestions: true,
      immediateResults: true,
      lives: 2,
    },
    questions: [
      {
        id: 1,
        text: "What does the following code snippet output? console.log(typeof null);",
        type: "code-snippet",
        options: ["object", "null", "undefined", "error"],
        correctAnswer: "object",
        points: 20,
        doublePoints: true,
      },
      {
        id: 2,
        text: "Event delegation works by utilizing event bubbling.",
        type: "true-false",
        correctAnswer: true,
        points: 15,
      },
      {
        id: 3,
        text: "What keyword is used to create a constant reference in JavaScript?",
        type: "fill-in-the-blank",
        correctAnswer: "const",
        points: 10,
      },
    ],
    createdAt: "2024-02-10T16:45:00Z",
    updatedAt: "2024-02-10T16:45:00Z",
  },
  {
    id: 5,
    title: "Classic Movie Trivia",
    description: "How well do you know the greatest films of all time?",
    creatorId: 456,
    status: EStatus.PUBLISHED,
    category: ECategory.MOVIES,
    difficulty: EDifficulty.MEDIUM,
    gameMode: EGameMode.CLASSIC,
    settings: {
      timeLimitPerRound: 60,
      passingScorePercentage: 65,
      shuffleQuestions: true,
      immediateResults: true,
      lives: 4,
    },
    questions: [
      {
        id: 1,
        text: "Which movie won the Academy Award for Best Picture in 1994?",
        type: "multiple-choice",
        options: ["Forrest Gump", "The Shawshank Redemption", "Pulp Fiction", "The Lion King"],
        correctAnswer: "Forrest Gump",
        points: 15,
      },
      {
        id: 2,
        text: "Identify the movie from this iconic scene.",
        type: "image-based",
        options: ["The Godfather", "Scarface", "Goodfellas", "Casino"],
        correctAnswer: "The Godfather",
        points: 20,
      },
      {
        id: 3,
        text: "Match the movies with their directors.",
        type: "matching",
        options: [
          "Inception - Christopher Nolan",
          "The Grand Budapest Hotel - Wes Anderson",
          "Parasite - Bong Joon-ho",
          "Get Out - Jordan Peele",
        ],
        correctAnswer:
          "Inception - Christopher Nolan, The Grand Budapest Hotel - Wes Anderson, Parasite - Bong Joon-ho, Get Out - Jordan Peele",
        points: 25,
      },
      {
        id: 4,
        text: "Steven Spielberg directed Jurassic Park.",
        type: "true-false",
        correctAnswer: true,
        points: 10,
      },
      {
        id: 5,
        text: "Who played Jack Dawson in Titanic?",
        type: "short-answer",
        correctAnswer: "Leonardo DiCaprio",
        points: 15,
      },
    ],
    createdAt: "2024-02-20T11:00:00Z",
    updatedAt: "2024-02-20T11:00:00Z",
  },
  {
    id: 6,
    title: "Python Programming Mastery",
    description: "Expert-level Python programming challenges for seasoned developers",
    creatorId: 789,
    status: EStatus.PUBLISHED,
    category: ECategory.CODING,
    difficulty: EDifficulty.EXPERT,
    gameMode: EGameMode.SURVIVAL,
    settings: {
      timeLimitPerRound: 120,
      passingScorePercentage: 85,
      shuffleQuestions: false,
      immediateResults: false,
      lives: 2,
    },
    questions: [
      {
        id: 1,
        text: "What does the following code output? print([i for i in range(5) if i % 2 == 0])",
        type: "code-snippet",
        options: ["[0, 2, 4]", "[1, 3]", "[0, 1, 2, 3, 4]", "[2, 4]"],
        correctAnswer: "[0, 2, 4]",
        points: 25,
        doublePoints: true,
      },
      {
        id: 2,
        text: "A decorator in Python is a function that takes another function and extends its behavior.",
        type: "true-false",
        correctAnswer: true,
        points: 20,
      },
      {
        id: 3,
        text: "Arrange these Python concepts from basic to advanced.",
        type: "ordering",
        options: ["Variables", "Functions", "Decorators", "Metaclasses"],
        correctAnswer: "Variables, Functions, Decorators, Metaclasses",
        points: 30,
      },
      {
        id: 4,
        text: "The ___ statement in Python is used to handle exceptions.",
        type: "fill-in-the-blank",
        correctAnswer: "try",
        points: 15,
      },
    ],
    createdAt: "2024-02-25T13:30:00Z",
    updatedAt: "2024-02-28T10:20:00Z",
  },
  {
    id: 7,
    title: "World Geography Basics",
    description: "Test your knowledge of countries, capitals, and continents",
    creatorId: 123,
    status: EStatus.ARCHIVED,
    category: ECategory.GEOGRAPHY,
    difficulty: EDifficulty.EASY,
    gameMode: EGameMode.CLASSIC,
    settings: {
      timeLimitPerRound: 40,
      passingScorePercentage: 60,
      shuffleQuestions: true,
      immediateResults: true,
      lives: 4,
    },
    questions: [
      {
        id: 1,
        text: "What is the largest continent by land area?",
        type: "multiple-choice",
        options: ["Asia", "Africa", "North America", "Europe"],
        correctAnswer: "Asia",
        points: 10,
      },
      {
        id: 2,
        text: "The Nile River is the longest river in the world.",
        type: "true-false",
        correctAnswer: true,
        points: 5,
      },
      {
        id: 3,
        text: "What is the capital of Australia?",
        type: "short-answer",
        correctAnswer: "Canberra",
        points: 15,
      },
      {
        id: 4,
        text: "Match the countries with their continents.",
        type: "matching",
        options: ["Brazil - South America", "Egypt - Africa", "Japan - Asia", "Germany - Europe"],
        correctAnswer: "Brazil - South America, Egypt - Africa, Japan - Asia, Germany - Europe",
        points: 20,
      },
    ],
    createdAt: "2023-12-15T09:00:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: 8,
    title: "Sports Legends Quiz",
    description: "How well do you know the greatest athletes and moments in sports history?",
    creatorId: 456,
    status: EStatus.PUBLISHED,
    category: ECategory.SPORTS,
    difficulty: EDifficulty.MEDIUM,
    gameMode: EGameMode.TIMED,
    settings: {
      timeLimitPerRound: 45,
      passingScorePercentage: 70,
      shuffleQuestions: true,
      immediateResults: false,
      lives: 3,
    },
    questions: [
      {
        id: 1,
        text: "Which athlete has won the most Olympic gold medals?",
        type: "multiple-choice",
        options: ["Michael Phelps", "Usain Bolt", "Simone Biles", "Carl Lewis"],
        correctAnswer: "Michael Phelps",
        points: 15,
      },
      {
        id: 2,
        text: "The FIFA World Cup is held every four years.",
        type: "true-false",
        correctAnswer: true,
        points: 5,
      },
      {
        id: 3,
        text: "Arrange these sports events in the order they were first held.",
        type: "ordering",
        options: ["Modern Olympics", "FIFA World Cup", "Super Bowl", "NBA Finals"],
        correctAnswer: "Modern Olympics, FIFA World Cup, NBA Finals, Super Bowl",
        points: 25,
      },
      {
        id: 4,
        text: "Who is known as 'The GOAT' in basketball?",
        type: "short-answer",
        correctAnswer: "Michael Jordan",
        points: 15,
      },
      {
        id: 5,
        text: "Match the sport with its championship trophy.",
        type: "matching",
        options: [
          "NHL - Stanley Cup",
          "NFL - Lombardi Trophy",
          "NBA - Larry O'Brien Trophy",
          "MLB - Commissioner's Trophy",
        ],
        correctAnswer:
          "NHL - Stanley Cup, NFL - Lombardi Trophy, NBA - Larry O'Brien Trophy, MLB - Commissioner's Trophy",
        points: 20,
      },
    ],
    createdAt: "2024-03-01T08:15:00Z",
    updatedAt: "2024-03-01T08:15:00Z",
  },
  {
    id: 9,
    title: "Music Theory Fundamentals",
    description: "Learn and test your understanding of basic music theory concepts",
    creatorId: 789,
    status: EStatus.DRAFT,
    category: ECategory.MUSIC,
    difficulty: EDifficulty.MEDIUM,
    gameMode: EGameMode.CLASSIC,
    settings: {
      timeLimitPerRound: 50,
      passingScorePercentage: 70,
      shuffleQuestions: false,
      immediateResults: true,
      lives: 3,
    },
    questions: [
      {
        id: 1,
        text: "How many notes are in a major scale?",
        type: "multiple-choice",
        options: ["7", "8", "12", "5"],
        correctAnswer: "7",
        points: 10,
      },
      {
        id: 2,
        text: "A sharp symbol raises a note by one semitone.",
        type: "true-false",
        correctAnswer: true,
        points: 5,
      },
      {
        id: 3,
        text: "Listen to this audio clip and identify the instrument.",
        type: "audio-based",
        options: ["Piano", "Guitar", "Violin", "Flute"],
        correctAnswer: "Piano",
        points: 15,
      },
      {
        id: 4,
        text: "A time signature of 4/4 means there are ___ beats per measure.",
        type: "fill-in-the-blank",
        correctAnswer: "4",
        points: 10,
      },
    ],
    createdAt: "2024-02-28T15:45:00Z",
    updatedAt: "2024-02-28T15:45:00Z",
  },
  {
    id: 10,
    title: "Culinary Arts & Food History",
    description: "Explore the world of food, cooking techniques, and culinary traditions",
    creatorId: 123,
    status: EStatus.ARCHIVED,
    category: ECategory.FOOD_AND_DRINK,
    difficulty: EDifficulty.EASY,
    gameMode: EGameMode.CLASSIC,
    settings: {
      timeLimitPerRound: 45,
      passingScorePercentage: 60,
      shuffleQuestions: true,
      immediateResults: true,
      lives: 4,
    },
    questions: [
      {
        id: 1,
        text: "What is the main ingredient in guacamole?",
        type: "multiple-choice",
        options: ["Avocado", "Tomato", "Pepper", "Onion"],
        correctAnswer: "Avocado",
        points: 5,
      },
      {
        id: 2,
        text: "Sushi originated in Japan.",
        type: "true-false",
        correctAnswer: true,
        points: 5,
      },
      {
        id: 3,
        text: "Match the dishes with their countries of origin.",
        type: "matching",
        options: ["Paella - Spain", "Pho - Vietnam", "Tacos - Mexico", "Pasta - Italy"],
        correctAnswer: "Paella - Spain, Pho - Vietnam, Tacos - Mexico, Pasta - Italy",
        points: 20,
      },
      {
        id: 4,
        text: "What cooking method involves submerging food in hot oil?",
        type: "short-answer",
        correctAnswer: "deep frying",
        points: 10,
      },
    ],
    createdAt: "2023-11-20T12:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },
  {
    id: 11,
    title: "Video Game Legends",
    description: "Test your knowledge of iconic games, characters, and gaming history",
    creatorId: 456,
    status: EStatus.PUBLISHED,
    category: ECategory.VIDEO_GAMES,
    difficulty: EDifficulty.HARD,
    gameMode: EGameMode.TIMED,
    settings: {
      timeLimitPerRound: 35,
      passingScorePercentage: 75,
      shuffleQuestions: true,
      immediateResults: false,
      lives: 2,
    },
    questions: [
      {
        id: 1,
        text: "What year was the first Legend of Zelda game released?",
        type: "multiple-choice",
        options: ["1986", "1985", "1987", "1984"],
        correctAnswer: "1986",
        points: 15,
      },
      {
        id: 2,
        text: "Watch this video clip and identify the game.",
        type: "video-based",
        options: ["Dark Souls", "Elden Ring", "Bloodborne", "Sekiro"],
        correctAnswer: "Dark Souls",
        points: 20,
        doublePoints: true,
      },
      {
        id: 3,
        text: "Arrange these gaming consoles in order of release.",
        type: "ordering",
        options: ["Nintendo Entertainment System", "PlayStation", "Xbox", "Nintendo Switch"],
        correctAnswer: "Nintendo Entertainment System, PlayStation, Xbox, Nintendo Switch",
        points: 25,
      },
      {
        id: 4,
        text: "The protagonist of Half-Life is named Gordon ___.",
        type: "fill-in-the-blank",
        correctAnswer: "Freeman",
        points: 15,
      },
      {
        id: 5,
        text: "Mario first appeared in Donkey Kong.",
        type: "true-false",
        correctAnswer: true,
        points: 10,
      },
      {
        id: 6,
        text: "Match the game series with their developers.",
        type: "matching",
        options: [
          "The Witcher - CD Projekt Red",
          "Halo - Bungie",
          "God of War - Santa Monica Studio",
          "Uncharted - Naughty Dog",
        ],
        correctAnswer:
          "The Witcher - CD Projekt Red, Halo - Bungie, God of War - Santa Monica Studio, Uncharted - Naughty Dog",
        points: 30,
      },
    ],
    createdAt: "2024-03-02T17:20:00Z",
    updatedAt: "2024-03-02T17:20:00Z",
  },
];
