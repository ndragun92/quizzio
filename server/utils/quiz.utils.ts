import type { TQuiz } from "~~/shared/utils/quiz.db";

enum EQuizStatus {
  LOBBY = "LOBBY",
  ROUND_START = "ROUND_START",
  COUNTDOWN = "COUNTDOWN",
  PLAYING = "PLAYING",
  ROUND_END = "ROUND_END",
  FINISHED = "FINISHED",
}

type TQuizPlayer = {
  id: number;
  nickname: string;
  guestDisplayName?: string;
  isHost: boolean;
  score: number;
  isOnline: boolean;
  remainingLives: number;
  skipCount: number;
};

type TQuizRoom = {
  quizRoomId: string;
  quiz: TQuiz;
  status: EQuizStatus;
  creator?: Pick<TQuizPlayer, "id" | "nickname" | "guestDisplayName" | "isOnline">;
  players: TQuizPlayer[];
  maxPlayers: number;
  currentRound: number;
  countdown: number;
};

const quizRooms = new Map<TQuizRoom["quizRoomId"], TQuizRoom>();

export function createQuiz({
  quizRoomId,
  quiz,
  playerId,
  nickname,
  guestDisplayName,
}: {
  quizRoomId: TQuizRoom["quizRoomId"];
  quiz: TQuizRoom["quiz"];
  playerId: TQuizPlayer["id"];
  nickname: TQuizPlayer["nickname"];
  guestDisplayName?: TQuizPlayer["guestDisplayName"];
}) {
  if (!quizRooms.has(quizRoomId)) {
    quizRooms.set(quizRoomId, {
      quizRoomId,
      quiz,
      status: EQuizStatus.LOBBY,
      players: [
        {
          id: playerId,
          nickname,
          guestDisplayName,
          isHost: true,
          score: 0,
          isOnline: true,
          remainingLives: 3,
          skipCount: 0,
        },
      ],
      maxPlayers: 8,
      currentRound: 1,
      countdown: 10,
    });
  } else {
    throw new Error("Quiz room already exists");
  }
}

export function joinQuiz({
  quizRoomId,
  playerId,
  nickname,
  guestDisplayName,
}: {
  quizRoomId: TQuizRoom["quizRoomId"];
  playerId: TQuizPlayer["id"];
  nickname: TQuizPlayer["nickname"];
  guestDisplayName?: TQuizPlayer["guestDisplayName"];
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

  if (quizRoom.players.some((p) => p.id === playerId)) {
    return "Player already in quiz";
  }

  if (quizRoom.quiz.creatorId === playerId) {
    quizRoom.creator = {
      id: playerId,
      nickname,
      guestDisplayName,
      isOnline: true,
    };
  } else {
    quizRoom.players.push({
      id: playerId,
      nickname,
      guestDisplayName,
      isHost: false,
      score: 0,
      isOnline: true,
      remainingLives: 3,
      skipCount: 0,
    });
  }

  return { room: quizRoom, playerId };
}

export function leaveQuiz({
  quizRoomId,
  playerId,
}: {
  quizRoomId: TQuizRoom["quizRoomId"];
  playerId: TQuizPlayer["id"];
}) {
  if (!quizRooms.has(quizRoomId)) {
    return "Quiz not found";
  }

  const quizData = quizRooms.get(quizRoomId)!;

  if (!quizData.players.some((p) => p.id === playerId)) {
    return "Player not in quiz";
  }

  const updatedPlayers = quizData.players.filter((p) => p.id !== playerId);

  if (updatedPlayers.length === 0) {
    quizRooms.delete(quizRoomId);
    return { roomId: quizRoomId };
  }

  // If the leaving player is the host, assign a new host
  if (quizData.players.find((p) => p.id === playerId)?.isHost) {
    updatedPlayers[0]!.isHost = true;
  }

  if (quizData.creator?.id === playerId) {
    quizData.creator = undefined;
  }

  quizData.players = updatedPlayers;

  return { roomId: quizRoomId };
}
