import type { TRoom } from "#shared/types/rooms.type";

export const useRoomStore = defineStore("room", () => {
  const room = ref<TRoom | null>(null);
  const playerId = ref<string | null>(null);

  const onSetRoom = (payload: TRoom): void => {
    room.value = payload;
  };

  const onSetPlayerId = (payload: string): void => {
    playerId.value = payload;
  };

  return { room, playerId, onSetRoom, onSetPlayerId };
});
