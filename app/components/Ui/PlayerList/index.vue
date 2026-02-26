<template>
  <ul v-if="props.room" class="spacing--small">
    <li
      v-for="(player, rank) in returnPlayers"
      :key="player.id"
      class="border border-slate-700 rounded-lg bg-slate-700/50 py-2 px-4 flex items-center justify-between gap-2"
      :class="{
        'border-cyan-500!': !props.iAmHost && player.id === playerId,
        'border-yellow-500!': props.iAmHost && player.id === playerId,
      }"
    >
      <div v-if="props.sortByScore" class="mr-2">
        <div
          class="size-8 rounded-full border border-slate-700 bg-slate-800 text-sm font-bold flex items-center justify-center text-center"
          :class="{
            'bg-yellow-600! border-yellow-500!': rank === 0,
            'bg-gray-600! border-gray-500!': rank === 1,
          }"
        >
          {{ rank + 1 }}
        </div>
      </div>
      <div class="flex items-center gap-2 flex-1">
        <UiRenderNickname
          :nickname="player.nickname"
          :guest-display-name="player.guestDisplayName"
        />
        <Icon v-if="player.isHost" name="mdi:crown" class="text-yellow-500 mb-1" size="18" />
        <span v-if="playerId === player.id" class="text-xs text-cyan-500 mb-0.5">(you)</span>
      </div>
      <div class="flex items-center gap-4">
        <div
          :class="{
            'opacity-0': props.hideScore,
          }"
          class="text-center"
        >
          <div class="font-bold text-sm">{{ player.score }}</div>
          <div class="text--secondary text-xs!">pts</div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center">
            <Icon
              name="mdi:wifi"
              :class="{
                'text-emerald-500': player.isOnline,
                'text-red-500': !player.isOnline,
              }"
              size="18"
            />
          </div>
          <UiDebug>
            <button
              v-if="props.showRemoveButton && props.iAmHost && playerId !== player.id"
              type="button"
              class="flex items-center justify-center size-6"
            >
              <Icon name="mdi:remove" class="text-red-500" size="18" />
            </button>
          </UiDebug>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { playerId } = useUser();

type Props = {
  room: TRoom | null;
  iAmHost: boolean;
  hideScore?: boolean;
  sortByScore?: boolean;
  showRemoveButton?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  hideScore: false,
  sortByScore: false,
  showRemoveButton: false,
});

const returnPlayers = computed(() => {
  const players = toRaw(props.room?.players || []);
  if (props.sortByScore) return players.sort((a, b) => b.score - a.score);
  return players;
});
</script>
