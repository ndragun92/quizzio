import { getGuestLeaderboard, type GuestLeaderboard } from "~~/server/utils/leaderboards.utils";

export default defineEventHandler((_event): GuestLeaderboard[] => {
  return getGuestLeaderboard();
});
