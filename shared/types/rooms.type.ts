import type { TGameState, TPlayer } from "#shared/types/game.type";

export type TRoom = {
  id: string;
  name: string;
  status: TGameState;
  players: TPlayer[];
  maxPlayers: number;
  password?: string;
  wordPack: "normal" | "funny" | "quotes" | "code" | "education" | "music" | "movies" | "long";
  isPrivate: boolean;
  currentRound: number;
  currentSentence: string;
  countdown: number;
  sentences?: string[];
};
