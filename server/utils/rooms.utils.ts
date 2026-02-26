// In-memory store for rooms
import type { TRoom } from "#shared/types/rooms.type";
import type { TPlayer } from "#shared/types/game.type";
import { TGameState } from "#shared/types/game.type";
import { updateGuestLeaderboard } from "./leaderboards.utils";

export const localStorageSessionKey = "user:room:session";

const rooms = new Map<string, TRoom>();

export const getRooms = (): TRoom[] => Array.from(rooms.values());
export const getRoom = (id: string): TRoom | undefined => rooms.get(id);

// Parameter types for room operations
export interface TCreateRoomParams {
  playerId: string;
  name: string;
  nickname: string;
  guestDisplayName?: string;
  isPrivate: boolean;
  wordPack: TRoom["wordPack"];
  password?: string;
}

export interface TCreateRoomResult {
  room: TRoom;
  playerId: string;
}

export const createRoom = ({
  playerId,
  nickname,
  guestDisplayName,
  name,
  isPrivate,
  wordPack,
  password,
}: TCreateRoomParams): TCreateRoomResult => {
  const roomId = crypto.randomUUID();

  const host: TPlayer = {
    id: playerId,
    nickname,
    guestDisplayName,
    isHost: true,
    isEliminated: false,
    isOnline: true,
    score: 0,
    roundScore: 0,
    wpm: 0,
    accuracy: 100,
    progress: 0,
    isFinished: false,
  };

  const room: TRoom = {
    id: roomId,
    name,
    status: TGameState.LOBBY,
    players: [host],
    maxPlayers: parseInt(process.env.MAX_PLAYERS || "10"),
    wordPack,
    isPrivate,
    password,
    currentRound: 1,
    currentSentence: "",
    countdown: 0,
  };

  rooms.set(roomId, room);
  return { room, playerId };
};

export interface TJoinRoomParams {
  playerId: string;
  nickname: string;
  guestDisplayName?: string;
  roomId: string;
  password?: string;
}

export type TJoinRoomResult = TCreateRoomResult | string;

export const joinRoom = ({
  playerId,
  nickname,
  guestDisplayName,
  roomId,
  password,
}: TJoinRoomParams): TJoinRoomResult => {
  const room = rooms.get(roomId);
  if (!room) return "Room not found";
  if (room.isPrivate && room.password !== password) return "Invalid password";
  if (room.players.length >= room.maxPlayers) return "Room full";
  if (room.status !== TGameState.LOBBY) return "Game already started";

  const player: TPlayer = {
    id: playerId,
    nickname,
    guestDisplayName,
    isHost: false,
    isEliminated: false,
    isOnline: true,
    score: 0,
    roundScore: 0,
    wpm: 0,
    accuracy: 100,
    progress: 0,
    isFinished: false,
  };

  const isAlreadyInRoom = room.players.some((p) => p.id === playerId);
  if (!isAlreadyInRoom) {
    room.players.push(player);
  }

  return { room, playerId };
};

export interface TLeaveRoomParams {
  roomId: string;
  playerId: string;
}

export const leaveRoom = ({ roomId, playerId }: TLeaveRoomParams): void => {
  const room = rooms.get(roomId);
  if (!room) return;

  // TODO: Check if this is needed since we dont want to remove player from room in case he laves, we want to set user as offline
  // room.players = room.players.filter((p) => p.id !== playerId);
  // Set player as offline on room leave
  room.players = room.players.map((p) => {
    if (p.id === playerId) p.isOnline = false;
    return p;
  });
  const roomPlayers = room.players.filter((p) => p.id !== playerId);

  if (!roomPlayers.length) {
    rooms.delete(roomId);
    return;
  }

  // Update the room players list after the player left the room

  if (room.status === TGameState.LOBBY) {
    room.players = roomPlayers;
  }

  // If the host left, assign a new host
  const wasHost = room.players.every((p) => !p.isHost);
  if (wasHost && room.players.length) {
    room.players[0]!.isHost = true;
  }

  if (![TGameState.LOBBY, TGameState.FINISHED].includes(room.status)) {
    const activePlayers = roomPlayers.filter((p) => !p.isEliminated && p.isOnline);
    if (activePlayers.length <= 1) {
      room.status = TGameState.FINISHED;
      const message = JSON.stringify({ type: "roomUpdate", data: room });
      broadcastToPeers(roomId, message);
    }
  }

  // If the game is finished and all players have left, delete the room
  if (room.status === TGameState.FINISHED) {
    const onlineRoomPlayers = room.players.filter((p) => p.isOnline);
    if (!onlineRoomPlayers.length) {
      rooms.delete(roomId);
      return;
    }
  }
};

export const getNextSentence = (
  round: TRoom["currentRound"],
  wordPack: TRoom["wordPack"],
  roomId: string
): string => {
  const room = rooms.get(roomId);
  if (!room) return "";
  const sentencesByPack: { [key in TRoom["wordPack"]]: string[] } = {
    normal: [
      "The quick brown fox jumps over the lazy dog.",
      "Programming is the art of telling another human what one wants the computer to do.",
      "Nuxt 3 is a powerful framework for building modern web applications with Vue.js.",
      "Type Royale is a competitive elimination typing game where speed and accuracy matter.",
      "To be or not to be, that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
      "A calm mind and steady hands can turn pressure into focus.",
      "Consistency beats intensity when the goal is long-term progress.",
      "Small improvements, repeated daily, compound into big results.",
      "Clear goals make it easier to choose the next right step.",
      "Great teams communicate early and often.",
      "Practice makes patterns, and patterns make speed.",
      "A well-timed pause can prevent a costly mistake.",
      "Simple rules are easier to remember under pressure.",
      "Curiosity turns problems into opportunities to learn.",
      "Quality is a habit, not a one-time event.",
      "The best results come from steady effort and honest feedback.",
      "When in doubt, return to the basics.",
      "A focused minute can be more productive than an unfocused hour.",
      "Good tools amplify good practices.",
      "Clarity of purpose reduces wasted motion.",
      "Every round is a chance to refine your rhythm.",
      "Patience creates space for better decisions.",
      "A clean workspace makes it easier to think clearly.",
      "Short sessions can still build strong momentum.",
      "Progress feels slow until it becomes obvious.",
      "Strong foundations make advanced skills easier to learn.",
      "One step at a time is still a path forward.",
      "Be deliberate with your practice, not just your pace.",
      "Measured breathing helps steady your timing.",
      "Simple plans are easier to execute under stress.",
      "Accuracy first, speed follows.",
      "A steady cadence keeps the mind and hands aligned.",
      "Focus on the next word, not the last mistake.",
      "Adaptation is the quiet partner of progress.",
      "Even small wins deserve recognition.",
      "Reduce noise, increase signal, then keep typing.",
      "Practice with intention and your speed will rise.",
      "Consistency is built in the quiet moments.",
      "A clear screen and clear mind go together.",
      "Let your mistakes guide your next practice.",
      "Confidence grows from repetition done well.",
      "Stay relaxed to stay accurate.",
      "A steady pace outlasts a frantic sprint.",
      "Tiny improvements make the biggest difference over time.",
      "A good routine is a shortcut to momentum.",
      "Focus narrows distractions and sharpens results.",
      "Strong habits are built with simple choices.",
      "Progress is the sum of many small tries.",
      "Keep your posture relaxed and your hands light.",
      "Attention to detail makes speed feel effortless.",
      "Your best practice starts with your first breath.",
      "Stay curious, stay steady, stay consistent.",
      "The simplest path often leads to the best result.",
      "A deliberate start sets the tone for the round.",
      "Precision today becomes speed tomorrow.",
    ],
    funny: [
      "Why don't scientists trust atoms? Because they make up everything!",
      "I told my computer I needed a break, and it said 'No problem, I'll go to sleep.'",
      "Why did the programmer quit his job? Because he didn't get arrays.",
      "Why do Java developers wear glasses? Because they don't see sharp.",
      "I would tell you a joke about UDP, but you might not get it.",
      "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "My keyboard is faster than my brain, so my typos look confident.",
      "I tried to speed type, but my fingers filed a union complaint.",
      "The spellchecker quit after reading my practice log.",
      "I renamed my pet to 'Ctrl' so it would listen when I say 'Ctrl + Z'.",
      "My code runs on coffee and unclear requirements.",
      "I asked for a bug fix, and the bug asked for a feature request.",
      "I taught my cat to type; now it only writes naps in uppercase.",
      "The spacebar and I are in a long-distance relationship.",
      "I tried touch typing, but my fingers insisted on sightseeing.",
      "My autocorrect thinks I live in a fantasy novel.",
      "I typed so fast the letters asked for a seatbelt.",
      "The leaderboard saw my score and filed a restraining order.",
      "I like my jokes like my code: well-typed and slightly unnecessary.",
      "The bug said it wasn't a bug, it was a surprise feature.",
      "I told my IDE a joke, and it highlighted the punchline.",
      "My typing speed is great if you ignore all the characters.",
      "I hit Caps Lock once and wrote a letter to my future self.",
      "I tried to optimize my typing and accidentally optimized my naps.",
      "Why did the developer bring a ladder? To reach higher-level code.",
      "My fingers are in a committed relationship with the backspace key.",
      "The keyboard asked for a vacation after my last speed test.",
      "I told a joke about recursion, but I told a joke about recursion.",
      "I don't always test my code, but when I do, I do it in production.",
      "The server asked me to stop sending puns; it couldn't handle the load.",
      "I spilled coffee on my laptop, now it only runs Java.",
      "I keep hitting Escape because my problems keep following me.",
      "My typing tutor said I was a natural; turns out it meant naturally messy.",
      "I wrote clean code once, then the cat walked across the keyboard.",
      "My favorite key is Enter because it lets me finish my sentences.",
      "The bug report said 'works on my machine' and I felt personally attacked.",
      "My keyboard has more crumbs than my cookie jar.",
      "I tried to delete my mistakes, but my history said no.",
      "The mouse and I are just coworkers; the keyboard is family.",
      "I joined a typing race and immediately took a snack break.",
      "My fingers can type fast, but my brain is on a loading screen.",
      "I told my keyboard a secret; now it keeps repeating it.",
      "I asked the cloud for help, and it started raining typos.",
      "My speed is great if you measure in bananas per minute.",
      "I optimized my workflow by moving the snacks closer to the desk.",
      "The typo fairy left me a note: 'See you tomorrow.'",
      "I named my variable 'final' so I could feel closure.",
      "I hit Tab so much my keyboard thinks I'm in a band.",
      "The bug asked for a hug; I gave it a debugger.",
      "My typing mentor said relax, so I typed in lowercase.",
      "I tried to be productive, but my to-do list laughed.",
      "The code compiled, and I felt like I found a rare Pokémon.",
      "I set my password to 'incorrect' so I can say I forgot it.",
      "My keyboard is multilingual; it speaks typo fluently.",
      "I typed '404' and my sentence went missing.",
      "The spacebar and I finally agreed to stay together.",
    ],
    quotes: [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
      "To be or not to be, that is the question. - William Shakespeare",
      "In the middle of difficulty lies opportunity. - Albert Einstein",
      "The best way to predict the future is to invent it. - Alan Kay",
      "It does not matter how slowly you go as long as you do not stop. - Confucius",
      "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
      "Whether you think you can or you think you can’t, you’re right. - Henry Ford",
      "The future belongs to those who prepare for it today. - Malcolm X",
      "If you can dream it, you can do it. - Walt Disney",
      "Do what you can, with what you have, where you are. - Theodore Roosevelt",
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
      "It always seems impossible until it’s done. - Nelson Mandela",
      "Act as if what you do makes a difference. It does. - William James",
      "The secret of getting ahead is getting started. - Mark Twain",
      "If you want to lift yourself up, lift up someone else. - Booker T. Washington",
      "The journey of a thousand miles begins with one step. - Lao Tzu",
      "Happiness depends upon ourselves. - Aristotle",
      "The purpose of our lives is to be happy. - Dalai Lama",
      "What we think, we become. - Buddha",
      "Stay hungry, stay foolish. - Steve Jobs",
      "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
      "Life is really simple, but we insist on making it complicated. - Confucius",
      "Everything you can imagine is real. - Pablo Picasso",
      "All our dreams can come true, if we have the courage to pursue them. - Walt Disney",
      "Do not wait to strike till the iron is hot; but make it hot by striking. - William Butler Yeats",
      "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
      "Turn your wounds into wisdom. - Oprah Winfrey",
      "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
      "If opportunity doesn’t knock, build a door. - Milton Berle",
      "Do one thing every day that scares you. - Eleanor Roosevelt",
      "The best revenge is massive success. - Frank Sinatra",
      "You miss 100% of the shots you don’t take. - Wayne Gretzky",
      "The only way out is through. - Robert Frost",
      "A person who never made a mistake never tried anything new. - Albert Einstein",
      "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
      "Dream big and dare to fail. - Norman Vaughan",
      "The harder I work, the luckier I get. - Samuel Goldwyn",
      "Don’t count the days, make the days count. - Muhammad Ali",
      "The mind is everything. What you think you become. - Buddha",
      "Do what you feel in your heart to be right — for you’ll be criticized anyway. - Eleanor Roosevelt",
      "The only true wisdom is in knowing you know nothing. - Socrates",
      "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
      "An unexamined life is not worth living. - Socrates",
      "If you’re going through hell, keep going. - Winston Churchill",
      "The best way to find yourself is to lose yourself in the service of others. - Mahatma Gandhi",
      "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
      "What we achieve inwardly will change outer reality. - Plutarch",
      "The only journey is the one within. - Rainer Maria Rilke",
      "Nothing will work unless you do. - Maya Angelou",
      "The power of imagination makes us infinite. - John Muir",
      "Opportunities don’t happen. You create them. - Chris Grosser",
      "It is never too late to be what you might have been. - George Eliot",
      "Be yourself; everyone else is already taken. - Oscar Wilde",
      "Go confidently in the direction of your dreams. Live the life you have imagined. - Henry David Thoreau",
    ],
    code: [
      "const add = (a, b) => a + b;",
      "function greet(name) { return `Hello, ${name}!`; }",
      "for (let i = 0; i < 10; i++) { console.log(i); }",
      "if (user.isLoggedIn) { showDashboard(); } else { showLogin(); }",
      "class Person { constructor(name) { this.name = name; } greet() { return `Hi, I'm ${this.name}`; } }",
      "try { riskyOperation(); } catch (error) { console.error(error); }",
      "const fetchData = async () => { const response = await fetch('/api/data'); return response.json(); };",
      "const sum = numbers.reduce((acc, n) => acc + n, 0);",
      "const isEven = (n) => n % 2 === 0;",
      "const delay = (ms) => new Promise((r) => setTimeout(r, ms));",
      "const unique = (arr) => Array.from(new Set(arr));",
      "const clamp = (val, min, max) => Math.min(max, Math.max(min, val));",
      "const toTitleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());",
      "const range = (n) => Array.from({ length: n }, (_, i) => i);",
      "const last = (arr) => arr[arr.length - 1];",
      "const capitalize = ([f, ...r]) => (f ? f.toUpperCase() + r.join('') : '');",
      "const hasValue = (v) => v !== null && v !== undefined;",
      "const sortBy = (arr, key) => [...arr].sort((a, b) => (a[key] > b[key] ? 1 : -1));",
      "const fetchJson = async (url) => (await fetch(url)).json();",
      "const noop = () => {};",
      "const once = (fn) => { let done = false; return (...args) => { if (!done) { done = true; return fn(...args); } }; };",
      "const memoize = (fn) => { const cache = new Map(); return (x) => cache.has(x) ? cache.get(x) : (cache.set(x, fn(x)), cache.get(x)); };",
      "const uuid = () => crypto.randomUUID();",
      "const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);",
      "const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);",
      "const flatten = (arr) => arr.flat(Infinity);",
      "const chunk = (arr, size) => arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);",
      "const pick = (obj, keys) => keys.reduce((acc, k) => (k in obj ? { ...acc, [k]: obj[k] } : acc), {});",
      "const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));",
      "const sleep = async (ms) => new Promise((r) => setTimeout(r, ms));",
      "const formatDate = (d) => d.toISOString().split('T')[0];",
      "const parseJson = (s, fallback = null) => { try { return JSON.parse(s); } catch { return fallback; } };",
      "const safe = (fn) => (...args) => { try { return fn(...args); } catch { return null; } };",
      "const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;",
      "const by = (key) => (a, b) => (a[key] > b[key] ? 1 : -1);",
      "const groupBy = (arr, key) => arr.reduce((acc, item) => ((acc[item[key]] ??= []).push(item), acc), {});",
      "const onceAsync = (fn) => { let p; return (...args) => (p ??= fn(...args)); };",
      "const debounce = (fn, ms) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; };",
      "const throttle = (fn, ms) => { let last = 0; return (...args) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...args); } }; };",
      "const qs = (obj) => new URLSearchParams(obj).toString();",
      "const deepClone = (obj) => structuredClone(obj);",
      "const inRange = (n, min, max) => n >= min && n <= max;",
      "const padLeft = (s, n, ch = ' ') => s.padStart(n, ch);",
      "const padRight = (s, n, ch = ' ') => s.padEnd(n, ch);",
      "const toKebab = (s) => s.replace(/\s+/g, '-').toLowerCase();",
      "const toSnake = (s) => s.replace(/\s+/g, '_').toLowerCase();",
      "const isEmpty = (v) => v == null || (Array.isArray(v) && v.length === 0) || (typeof v === 'string' && v.trim() === '');",
      "const distinctBy = (arr, key) => Array.from(new Map(arr.map((x) => [x[key], x])).values());",
      "const zip = (a, b) => a.map((x, i) => [x, b[i]]);",
      "const unzip = (pairs) => pairs.reduce((acc, [a, b]) => ([...acc[0], a], [...acc[1], b]), [[], []]);",
      "const xor = (a, b) => (a || b) && !(a && b);",
      "const rotate = (arr, n) => arr.slice(n).concat(arr.slice(0, n));",
      "const sumBy = (arr, key) => arr.reduce((acc, x) => acc + x[key], 0);",
      "const maxBy = (arr, key) => arr.reduce((m, x) => (x[key] > m[key] ? x : m), arr[0]);",
      "const minBy = (arr, key) => arr.reduce((m, x) => (x[key] < m[key] ? x : m), arr[0]);",
      "const toggle = (set, value) => (set.has(value) ? set.delete(value) : set.add(value));",
      "const bytes = (n) => `${n} bytes`;",
    ],
    education: [
      "Learning sticks when you can teach it to someone else.",
      "Short study sessions beat cramming the night before.",
      "A good question is a map to the next lesson.",
      "Feedback is faster than guessing.",
      "Notes are memory on paper.",
      "Practice turns knowledge into skill.",
      "Focus on the process, not the grade.",
      "Mistakes are data, not a verdict.",
      "Reviewing yesterday makes tomorrow easier.",
      "Small goals keep progress visible.",
      "Curiosity keeps the mind awake.",
      "Reading widely builds better thinking.",
      "Explain concepts out loud to check understanding.",
      "Break big problems into smaller steps.",
      "Consistency beats last-minute effort.",
      "Master the basics before the tricks.",
      "Ask for help early, not late.",
      "Use examples to anchor new ideas.",
      "Summaries reveal what you really learned.",
      "Testing yourself is better than rereading.",
      "A quiet space helps the brain focus.",
      "Sleep is part of studying.",
      "Progress is measured in repetitions.",
      "A checklist turns chaos into clarity.",
      "Plan the week, not just the day.",
      "Learning is a skill you can train.",
      "Take breaks to keep attention sharp.",
      "Organize materials before you start.",
      "Deadlines create momentum.",
      "Learning goals should be specific and small.",
      "Understanding beats memorization.",
      "Practice problems build confidence.",
      "Teach back the lesson in one minute.",
      "Write down the key idea in your own words.",
      "Look for patterns across topics.",
      "Projects make knowledge real.",
      "Use mistakes to target review.",
      "Keep a glossary of new terms.",
      "A study group can catch blind spots.",
      "Prioritize the hardest task first.",
      "Distractions are the enemy of retention.",
      "Track what you finish, not just what you start.",
      "Good resources save time.",
      "Celebrate small wins to stay motivated.",
      "Reading with active questions is active learning.",
      "Define success before you begin.",
      "Learn the why, not just the how.",
      "Practice under test-like conditions.",
      "Switch subjects to avoid fatigue.",
      "Highlight less, think more.",
      "Create a summary sheet before exams.",
      "Review errors immediately.",
      "Use diagrams to connect ideas.",
      "Spaced repetition makes memory durable.",
      "A tidy desk supports a tidy mind.",
      "Set a start time and begin.",
      "Effort compounds over the semester.",
    ],
    music: [
      "Warm up slowly before playing fast.",
      "Metronomes keep rhythm honest.",
      "Practice the hard bar, not the whole song.",
      "Tone comes from relaxed hands.",
      "Dynamics tell the story of a melody.",
      "Count out loud to lock the groove.",
      "Slow practice builds clean speed.",
      "Record yourself to hear the truth.",
      "Rhythm is the backbone of music.",
      "Breathing shapes phrasing.",
      "Play with intention, not habit.",
      "Silence is part of the music.",
      "Learn the chord progression, then improvise.",
      "Short sessions beat marathon practice.",
      "Tune before you train.",
      "Posture keeps sound consistent.",
      "A steady pulse beats flashy runs.",
      "Practice with a backing track.",
      "Learn the lyrics to sing the line.",
      "Listen deeply before you play.",
      "Focus on timing, then tone.",
      "Play softer to learn control.",
      "Transcribe a favorite riff by ear.",
      "Scales are maps, not music.",
      "Arpeggios train your fingers for chords.",
      "Clean starts and clean stops matter.",
      "Use a metronome, then turn it off.",
      "Repeat small sections until they feel easy.",
      "Rest resets your hands.",
      "Play the melody like a sentence.",
      "Balance volume across voices.",
      "Good music needs good listening.",
      "Practice every day, even a little.",
      "Tap your foot to feel the beat.",
      "Syncopation adds surprise.",
      "Layer parts to build texture.",
      "Play in tune with yourself.",
      "Keep wrists loose for speed.",
      "Use dynamics to shape emotion.",
      "Tempo is a tool, not a goal.",
      "Count rests, not just notes.",
      "A good groove is steady and simple.",
      "Start slow, end strong.",
      "Let the phrase breathe.",
      "Play scales with different rhythms.",
      "Accents create forward motion.",
      "Repetition makes the chorus stick.",
      "Listen to the bass for the foundation.",
      "Practice transitions between sections.",
      "A clean tone hides no mistakes.",
      "Know when to leave space.",
      "Music is timing, tone, and touch.",
      "Clap rhythms before playing them.",
      "Practice with a timer, not a mood.",
      "Aim for clarity before volume.",
      "Play with others to learn balance.",
      "Enjoy the sound you're making.",
    ],
    movies: [
      "The opening scene set the tone with soft light and a quiet score.",
      "A well-timed cut can turn a simple glance into a surprise twist.",
      "The director used wide shots to make the city feel endless.",
      "Good pacing keeps the story moving without losing the details.",
      "A strong montage can show years of growth in seconds.",
      "The lead actor carried the scene with a single steady breath.",
      "Lighting shifted from warm to cold as the mood changed.",
      "The soundtrack blended with the dialogue instead of fighting it.",
      "A quiet ending can be more powerful than a loud finale.",
      "The villain felt real because their goals made sense.",
      "The camera stayed close to show every small emotion.",
      "A clever callback made the last act feel earned.",
      "The chase scene relied on rhythm, not just speed.",
      "Costumes helped each character stand out without words.",
      "The story trusted the audience to connect the dots.",
      "A single prop became a symbol across the whole film.",
      "The color palette shifted as the hero changed inside.",
      "A slow zoom can feel like time holding its breath.",
      "Great dialogue sounds natural even when it is precise.",
      "The supporting cast elevated every moment they touched.",
      "Practical effects gave the action a sense of weight.",
      "The score returned in the finale to close the circle.",
      "Tension grew because the characters had something to lose.",
      "The film balanced humor with heartbreak without forcing it.",
      "A steady handheld shot made the scene feel immediate.",
      "The climax worked because the conflict was personal.",
      "A clever reveal reframed everything that came before it.",
      "The ending left space for the audience to reflect.",
      "A simple establishing shot can ground a complex story.",
      "The sound design made silence feel loud and meaningful.",
      "A good sequel honors the original while adding a new idea.",
      "The hero’s flaw was the engine of the plot.",
      "A patient buildup made the payoff feel satisfying.",
      "The movie used weather to mirror the character’s mood.",
      "Even a small role can leave a big impression.",
      "The final shot lingered just long enough to land.",
      "The screenplay trusted actions more than explanations.",
      "A tight edit kept the tension from fading.",
      "A heartfelt scene can make the action matter more.",
      "A strong opening question keeps viewers leaning forward.",
    ],
    long: [
      "The hall was quiet except for the soft hum of the lights, and the group settled into their seats with a mix of nerves and excitement. The instructor smiled, placed a stack of papers on the desk, and reminded everyone that steady effort beats a last-minute sprint. As the timer started, the room shifted from anxious to focused, each person finding their own rhythm.",
      "Rain traced thin lines down the window as the train moved through the valley, and the landscape drifted by like a slow film reel. Inside the carriage, a traveler opened a notebook and began to write, letting the steady motion guide the pace of each sentence. By the time the sun broke through the clouds, the page was filled with small, careful progress.",
      "The workshop smelled of wood and oil, and the tools were arranged with a patience that only long practice can teach. The craftsperson measured twice, cut once, and then paused to check the edges with a steady hand. A single project took the whole afternoon, but the result was clean, precise, and quietly satisfying.",
      "At first, the plan looked too big, a list of tasks that felt like a mountain rather than a path. Then the work began in small, deliberate steps: outline the goal, gather the materials, and set a simple schedule. Each completed step reduced the noise, until the project felt not only possible but inevitable.",
      "The studio was warm from the afternoon light, and the musician set a slow tempo to find the heartbeat of the piece. They repeated one tricky passage again and again, listening for balance and breathing between notes. Over time, the melody stopped feeling like a puzzle and started feeling like a story.",
      "The city woke up in layers, first with delivery trucks, then with footsteps, and finally with the steady flow of conversation. A cyclist traced a familiar route, noting the places where the morning light fell just right. By the time the streets were full, the day already felt shaped and intentional.",
      "A long hike begins with a single step, but it continues with attention to water, pacing, and the quiet signals of fatigue. The trail wound upward through trees and open ridges, each turn revealing a new view and a new challenge. At the summit, the silence was a reward that made every mile worthwhile.",
      "The library’s quiet was not empty but full of soft sounds: the turn of a page, the tap of a keyboard, the faint shuffle of a chair. A student reviewed their notes with care, marking questions and circling the main idea. The hours passed quickly, not because the work was easy, but because the focus was steady.",
      "In the kitchen, preparation mattered as much as cooking, and each ingredient was placed within easy reach. The recipe looked complex, but it unfolded one step at a time, from chopping to simmering to tasting. When the meal was done, the effort felt woven into every bite.",
      "The garden had been neglected for months, but the soil was still willing and the seeds were still patient. One row at a time, the ground was cleared, watered, and marked with small labels. Weeks later, the first green shoots appeared, proof that consistency can revive almost anything.",
      "The team meeting started with a clear agenda, and the discussion followed it without wandering. Ideas were captured, tasks were assigned, and each person left with a next step that felt realistic. Clarity turned a crowded room into a coordinated effort.",
      "On a quiet evening, a writer returned to an old draft and read it with kinder eyes. The story was uneven, but the heart of it was still there, waiting to be shaped. By midnight, the rough edges had softened into a version that finally felt true.",
      "A long practice session can feel heavy, so the coach broke it into small drills with short breaks between them. Players focused on accuracy first, then speed, then teamwork, never rushing the fundamentals. By the end, the progress was visible not in flashy moves, but in calm confidence.",
      "The conference room was bright, and the presentation began with a simple question that framed the entire problem. Each slide answered a part of that question, building toward a conclusion that felt earned rather than forced. When questions came, the answers were already waiting in the structure.",
      "The storm passed during the night, leaving the morning clear and crisp. A runner took a slower route along the river, listening to the rhythm of their breath and the steady cadence of footsteps. The long loop ended with tired legs and a calm mind, which felt like the real goal.",
      "Learning a new skill always starts with awkward attempts, and the first week was full of small mistakes. The second week brought tiny improvements, and the third week brought a hint of fluency. By the end of the month, the difference was obvious and quietly motivating.",
      "The workshop class began with the basics, and no one was allowed to skip them. Tools were named, safety was practiced, and the simplest technique was repeated until it felt natural. Only then did the more complex steps feel approachable.",
      "A careful plan turned a chaotic day into a manageable sequence of tasks. The work was still demanding, but the order created space to breathe and adjust. By evening, the list was shorter, and the sense of progress was real.",
      "The evening performance opened with a gentle theme that returned later in the finale. Between those moments, the music grew, layered, and then fell back into silence with purpose. The audience stayed quiet for a beat, letting the last note settle.",
      "The neighborhood cleanup took longer than expected, but every bag filled made the street feel lighter. Volunteers shared tools, swapped jokes, and kept the pace steady. By dusk, the place looked different, and so did the people who worked on it.",
    ],
  };
  const sentences = sentencesByPack[wordPack];
  const randomizedSentences = sentences.sort(() => Math.random() - 0.5);
  room.sentences = !room?.sentences ? randomizedSentences : room.sentences;
  const sentencesForRound = room.sentences;
  const index = Math.max(0, Math.min(round - 1, sentencesForRound.length - 1));
  return sentencesForRound[index]!;
};

const broadcastToPeers = (roomId: TRoom["id"], message: string) => {
  for (const [peerId, peer] of getAllPeers()) {
    const info = getSocketInfo(peerId);
    if (info && info.roomId === roomId) {
      peer.send(message);
    }
  }
};

export const broadcastRoomUpdate = (roomId: TRoom["id"]) => {
  const room = getRoom(roomId);
  if (!room) return;

  const message = JSON.stringify({ type: "roomUpdate", data: room });
  broadcastToPeers(roomId, message);
};

export const broadcastToAllPeers = (message: string) => {
  for (const [_, peer] of getAllPeers()) {
    peer.send(message);
  }
};

export const startMatch = (room: TRoom) => {
  const wasFinished = room.status === TGameState.FINISHED;
  if (wasFinished) {
    room.currentRound = 1;
  }
  room.status = TGameState.COUNTDOWN;
  room.players.forEach((p) => {
    p.progress = 0;
    p.wpm = 0;
    p.accuracy = 100;
    p.isFinished = false;
    // p.isEliminated = false;
    p.isEliminated = wasFinished ? false : p.isEliminated;
    p.score = wasFinished ? 0 : p.score;
    p.roundScore = 0;
    // p.lastResult = undefined; TODO: Not sure if we need this
  });
  broadcastRoomUpdate(room.id);

  let count = 3;
  room.countdown = count;
  const interval = setInterval(() => {
    if (count > 0) {
      room.countdown = count;
      broadcastRoomUpdate(room.id);
      count--;
    } else {
      clearInterval(interval);
      room.status = TGameState.PLAYING;
      room.countdown = 0;
      room.currentSentence = getNextSentence(room.currentRound, room.wordPack, room.id);
      broadcastRoomUpdate(room.id);
    }
  }, 1000);
};

export const handlePlayerSubmission = (
  roomId: TRoom["id"],
  playerId: TPlayer["id"],
  data: { text: string; timeTaken: number; errors: number }
) => {
  const room = getRoom(roomId);
  if (!room || room.status !== TGameState.PLAYING) return;

  const player = room.players.find((p) => p.id === playerId);
  if (!player || player.isEliminated || player.isFinished) return;

  // Server-side validation
  if (data.text.length === room.currentSentence.length) {
    player.progress = 100;
    player.isFinished = true;
    const words = data.text.length / 5;
    const minutes = data.timeTaken / 60;
    player.wpm = Math.round(words / minutes);
    player.accuracy = Math.round(100 - (data.errors / room.currentSentence.length) * 100);
    const speedScore = player.wpm * 2; // Speed weight
    const accuracyMultiplier = player.accuracy / 100;
    const newScore = Math.round(speedScore * accuracyMultiplier);

    player.score += newScore;
    // TODO: Check if we want to use round score for round_end
    player.roundScore = newScore;

    broadcastRoomUpdate(roomId);

    const activePlayers = room.players.filter((p) => !p.isEliminated);
    const finishedPlayers = activePlayers.filter((p) => p.isFinished);

    if (finishedPlayers.length === activePlayers.length) {
      endRound(room);
    }
  }
};

const endRound = (room: TRoom) => {
  room.status = TGameState.ROUND_END;

  // Sort active players by WPM (descending)
  const activePlayers = room.players.filter((p) => !p.isEliminated);
  activePlayers.sort((a, b) => b.score - a.score);

  // Eliminate the slowest player
  if (activePlayers.length > 1) {
    const slowest = activePlayers[activePlayers.length - 1];
    if (slowest) {
      slowest.isEliminated = true;
    }
  }

  broadcastRoomUpdate(room.id);

  const remainingPlayers = room.players.filter((p) => !p.isEliminated);
  const isGameFinished = remainingPlayers.length <= 1;

  if (isGameFinished) {
    room.status = TGameState.FINISHED;
    const allPlayers = room.players;
    for (const player of allPlayers) {
      updateGuestLeaderboard(player);
    }
    broadcastRoomUpdate(room.id);
  } else {
    setTimeout(() => {
      room.currentRound++;
      startMatch(room);
    }, 10_000);
  }
};
