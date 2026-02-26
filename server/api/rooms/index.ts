import type { TRoomListItem } from "#shared/types/api.type";

export default defineEventHandler((_event): TRoomListItem[] => {
  return getRooms()
    .filter((r) => !r.isPrivate)
    .map((r): TRoomListItem => {
      return {
        id: r.id,
        name: r.name,
        playersCount: r.players.length,
        maxPlayers: r.maxPlayers,
        status: r.status,
        wordPack: r.wordPack,
      };
    });
});
