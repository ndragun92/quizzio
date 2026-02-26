export enum TGameState {
  LOBBY = "LOBBY",
  COUNTDOWN = "COUNTDOWN",
  PLAYING = "PLAYING",
  ROUND_END = "ROUND_END",
  FINISHED = "FINISHED",
}

export interface TPlayer {
  id: string;
  nickname: string;
  guestDisplayName?: string;
  isHost: boolean;
  isEliminated: boolean;
  isOnline: boolean;
  score: number;
  roundScore: number;
  wpm: number;
  accuracy: number;
  progress: number; // 0 to 100
  isFinished: boolean;
  lastResult?: TRoundResult;
}

export interface TRoundResult {
  timeTaken: number;
  errors: number;
  wpm: number;
  accuracy: number;
  rank: number;
  eliminated: boolean;
}
