export type GuestLeaderboard = {
  playerId: TPlayer["id"];
  nickname: TPlayer["nickname"];
  guestDisplayName?: TPlayer["guestDisplayName"];
  score: TPlayer["score"];
  roundsPlayed: number;
  wins?: number;
};

const guestLeaderboard = new Map<TPlayer["id"], GuestLeaderboard>();

export const updateGuestLeaderboard = (player: TPlayer) => {
  const existingEntry = guestLeaderboard.get(player.id);

  if (existingEntry) {
    existingEntry.score += player.score;
    existingEntry.roundsPlayed += 1;
    existingEntry.wins =
      player.isFinished && !player.isEliminated ? existingEntry.wins! + 1 : existingEntry.wins;
    return;
  }

  guestLeaderboard.set(player.id, {
    playerId: player.id,
    nickname: player.nickname,
    guestDisplayName: player.guestDisplayName,
    score: player.score,
    roundsPlayed: 1,
    wins: player.isFinished && !player.isEliminated ? 1 : 0,
  });
};

export const getGuestLeaderboard = () => {
  return Array.from(guestLeaderboard.values()).sort((a, b) => b.score - a.score);
};
