import type { TApiUser } from "~~/shared/types/user.type";
import type { TQuestion, TQuiz } from "~~/shared/utils/quiz.db";
import { getAllPeers, getSocketInfo } from "./ws.utils";

export const localStorageSessionKey = "user:room:session";

const quizRooms = new Map<TQuizRoom["quizRoomId"], TQuizRoom>();

export const getQuizRooms = (): TQuizRoom[] => Array.from(quizRooms.values());
export const getQuizRoom = (id: string): TQuizRoom | undefined => quizRooms.get(id);

enum EQuizStatus {
  LOBBY = "LOBBY",
  ROUND_START = "ROUND_START",
  COUNTDOWN = "COUNTDOWN",
  PLAYING = "PLAYING",
  ROUND_END = "ROUND_END",
  FINISHED = "FINISHED",
}

export type TQuizPlayer = {
  id: TApiUser["id"];
  nickname: TApiUser["nickname"];
  isHost: boolean;
  score: number;
  isOnline: boolean;
  remainingLives: number;
  skipCount: number;
  answers: {
    skipped: TQuestion["id"][];
    correct: TQuestion["id"][];
    incorrect: TQuestion["id"][];
  };
};

export type TQuizRoom = {
  quizRoomId: string;
  quizRoomName: string;
  quiz: TQuiz;
  status: EQuizStatus;
  creator?: Pick<TQuizPlayer, "id" | "nickname" | "isOnline">;
  players: TQuizPlayer[];
  maxPlayers: number;
  currentRound: number;
  countdown: number;
};

export function createQuiz({
  quizRoomId,
  quizRoomName,
  quiz,
  userId,
  nickname,
}: {
  quizRoomId: TQuizRoom["quizRoomId"];
  quizRoomName: TQuizRoom["quizRoomName"];
  quiz: TQuizRoom["quiz"];
  userId: TApiUser["id"];
  nickname: TApiUser["nickname"];
}) {
  if (!quizRooms.has(quizRoomId)) {
    quizRooms.set(quizRoomId, {
      quizRoomId,
      quizRoomName,
      quiz,
      status: EQuizStatus.LOBBY,
      players: [
        {
          id: userId,
          nickname,
          isHost: true,
          score: 0,
          isOnline: true,
          remainingLives: 3,
          skipCount: 0,
          answers: {
            skipped: [],
            correct: [],
            incorrect: [],
          },
        },
      ],
      maxPlayers: 8,
      currentRound: 1,
      countdown: 10,
    });

    return { quizRoomId, quiz };
  } else {
    return "Quiz room already exists";
  }
}

export function joinQuiz({
  quizRoomId,
  userId,
  nickname,
}: {
  quizRoomId: TQuizRoom["quizRoomId"];
  userId: TApiUser["id"];
  nickname: TApiUser["nickname"];
}) {
  if (!quizRooms.has(quizRoomId)) {
    return "Quiz not found";
  }

  const quizRoom = quizRooms.get(quizRoomId)!;

  if (quizRoom.status !== EQuizStatus.LOBBY) {
    return "Quiz already started";
  }

  if (quizRoom.players.length >= quizRoom.maxPlayers) {
    return "Quiz room is full";
  }

  if (quizRoom.players.some((p) => p.id === userId)) {
    return "Player already in quiz";
  }

  if (quizRoom.quiz.creatorId === userId) {
    quizRoom.creator = {
      id: userId,
      nickname,
      isOnline: true,
    };
  } else {
    quizRoom.players.push({
      id: userId,
      nickname,
      isHost: false,
      score: 0,
      isOnline: true,
      remainingLives: 3,
      skipCount: 0,
      answers: {
        skipped: [],
        correct: [],
        incorrect: [],
      },
    });
  }

  return { quizRoom, userId };
}

export function leaveQuiz({
  quizRoomId,
  userId,
}: {
  quizRoomId: TQuizRoom["quizRoomId"];
  userId: TQuizPlayer["id"];
}) {
  if (!quizRooms.has(quizRoomId)) {
    return "Quiz not found";
  }

  const quizData = quizRooms.get(quizRoomId)!;

  if (!quizData.players.some((p) => p.id === userId)) {
    return "Player not in quiz";
  }

  const updatedPlayers = quizData.players.filter((p) => p.id !== userId);

  if (updatedPlayers.length === 0) {
    quizRooms.delete(quizRoomId);
    return { roomId: quizRoomId };
  }

  // If the leaving player is the host, assign a new host
  if (quizData.players.find((p) => p.id === userId)?.isHost) {
    updatedPlayers[0]!.isHost = true;
  }

  if (quizData.creator?.id === userId) {
    quizData.creator = undefined;
  }

  quizData.players = updatedPlayers;

  return { roomId: quizRoomId };
}

const broadcastToPeers = (quizRoomId: TQuizRoom["quizRoomId"], message: string) => {
  for (const [peerId, peer] of getAllPeers()) {
    const info = getSocketInfo(peerId);
    if (info && info.quizRoomId === quizRoomId) {
      peer.send(message);
    }
  }
};

export const broadcastQuizRoomUpdate = (quizRoomId: TQuizRoom["quizRoomId"]) => {
  const room = getQuizRoom(quizRoomId);
  if (!room) return;

  const message = JSON.stringify({ type: "update", data: room });
  broadcastToPeers(quizRoomId, message);
};

export const broadcastToAllPeers = (message: string) => {
  for (const [_, peer] of getAllPeers()) {
    peer.send(message);
  }
};
