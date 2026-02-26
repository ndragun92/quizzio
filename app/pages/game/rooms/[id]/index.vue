<template>
  <template v-if="room">
    <UiDebug>
      <!--      <div-->
      <!--        :style="{-->
      <!--          zIndex: 999999,-->
      <!--        }"-->
      <!--        class="bg-red-500 fixed top-0 left-0"-->
      <!--      >-->
      <!--        {{ room?.status }}-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="h-96 overflow-auto bg-slate-800/50 rounded-lg p-4 whitespace-pre-wrap text-sm text-slate-300"-->
      <!--      >-->
      <!--        <pre>-->
      <!--          {{ returnWinner }}-->
      <!--        </pre>-->
      <!--        <pre>-->
      <!--            {{ room }}-->
      <!--          </pre-->
      <!--        >-->
      <!--      </div>-->
    </UiDebug>
    <div
      v-if="room.status === TGameState.LOBBY"
      class="flex-1 flex items-center justify-center h-full p-4"
    >
      <div class="card--main w-full max-w-lg">
        <div v-if="room" class="spacing--default">
          <div class="text-center spacing--small">
            <p class="text--secondary flex items-center gap-2 justify-center">
              <Icon v-if="room.isPrivate" name="mdi:lock" size="18" class="mb-1 text-red-500" />
              <Icon v-else name="mdi:globe" size="18" class="mb-1 text-emerald-500" />
              <span>{{ room.isPrivate ? "Private Room" : "Public Room" }}</span>
            </p>
            <h1 class="h1">{{ room.name }}</h1>
          </div>
          <div class="spacing--default">
            <div class="input--box text-center">
              <label for="roomCode" class="input--label"> Room Code </label>
              <div class="relative">
                <input
                  id="roomCode"
                  type="text"
                  class="input--text text-emerald-500! font-bold!"
                  :value="roomId"
                  :disabled="true"
                  :readonly="true"
                />
                <div class="absolute top-0 right-0 bottom-0 flex items-center">
                  <button
                    type="button"
                    class="flex items-center justify-center size-8 mr-2 hover:text-cyan-500"
                    aria-label="Copy link to clipboard"
                    @click="onCopyToClipboard()"
                  >
                    <Icon name="material-symbols:copy-all-outline" size="24" />
                  </button>
                </div>
              </div>
              <p class="text--secondary">Click to copy invite link</p>
            </div>
            <div class="mt-4">
              <div class="flex items-center gap-2 text--secondary justify-center">
                <Icon name="mynaui:users-group" size="24" class="mb-0.5" />
                <span>{{ room.players.length }} / {{ room.maxPlayers }} players</span>
              </div>
            </div>
            <UiPlayerList
              :room="room"
              :show-remove-button="true"
              :i-am-host="iAmHost"
              :hide-score="true"
            />
            <div class="mt-4">
              <div class="flex items-center gap-2 text--secondary justify-center">
                <Icon name="solar:settings-outline" size="18" class="mb-0.5" />
                <span>Word Pack: {{ room.wordPack }}</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <NuxtLink
                :to="{
                  name: 'game-rooms',
                }"
                class="button--secondary flex-1"
                >Leave</NuxtLink
              >
              <button
                v-if="iAmHost"
                :disabled="room.players.length < 2"
                type="submit"
                class="button--default flex-2"
                @click="onStartGame"
              >
                <span>Start Game</span>
                <Icon name="material-symbols:play-arrow-outline-rounded" size="24" />
              </button>
              <div v-else class="flex-2 text-sm text-center text-yellow-500">
                Waiting for host to start the game.
              </div>
            </div>
            <p v-if="room.players.length < 2" class="text--secondary text-center">
              Need at least 2 players to start the game.
            </p>
          </div>
        </div>
        <div v-else class="py-8">
          <div class="flex items-center gap-2 justify-center py-4">
            <Icon name="svg-spinners:90-ring-with-bg" size="24" />
            <span class="font-bold">Loading... Please wait...</span>
          </div>
        </div>
        <!--      <div-->
        <!--        class="h-48 overflow-auto bg-slate-800/50 rounded-lg mt-4 p-4 whitespace-pre-wrap text-sm text-slate-300"-->
        <!--      >-->
        <!--        <pre>-->
        <!--        {{ room }}-->
        <!--      </pre-->
        <!--        >-->
        <!--      </div>-->
      </div>
    </div>
    <div v-if="room.status === TGameState.PLAYING" class="p-4 w-full max-w-7xl mx-auto">
      <div class="spacing--small">
        <h2 class="h2">
          <UiRenderNickname
            :nickname="nickname || 'Unknown'"
            :guest-display-name="id ? '' : guestDisplayName"
          />
        </h2>
        <ul class="text-sm text-muted-foreground-2">
          <li
            class="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-400 before:rounded-full"
          >
            Round {{ room.currentRound }}
          </li>
          <li
            class="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-400 before:rounded-full"
          >
            {{ room.wordPack }}
          </li>
          <li
            class="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-400 before:rounded-full"
          >
            {{ remainingPlayers?.length || 0 }} remaining
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-8 mt-8">
        <div class="flex-2 spacing--default">
          <div
            class="flex items-center justify-between"
            :class="{
              'opacity-25': myPlayerData?.isEliminated,
            }"
          >
            <ul class="flex items-center gap-4">
              <li class="flex items-center gap-2">
                <span>Time:</span>
                <strong>{{ elapsedTime.toFixed(2) }}s</strong>
              </li>
              <li class="flex items-center gap-2">
                <span>WPM:</span>
                <strong>{{ returnWPM }}</strong>
              </li>
              <li class="flex items-center gap-2">
                <span>Errors:</span>
                <strong>{{ returnErrorCount }}</strong>
              </li>
            </ul>
            <div>{{ text.length }} / {{ room?.currentSentence?.length }}</div>
          </div>
          <div
            class="relative overflow-hidden card--main border-2 border-cyan-500 p-4 text-lg font-semibold tracking-wider"
            :class="{
              'border-red-500': myPlayerData?.isEliminated,
            }"
          >
            <span
              v-for="(letter, index) in room.currentSentence?.split('')"
              :key="`${letter}--${index}`"
              :class="[
                {
                  'text-emerald-500!': returnText[index] === letter,
                  'ring ring-gray-500': returnLastWordIndex === index - 1,
                },
                returnLastWordIndex < index && returnText[index] !== letter
                  ? 'text-gray-500!'
                  : 'text-red-500',
              ]"
            >
              {{ letter }}
            </span>
            <div
              v-if="myPlayerData?.isEliminated"
              class="absolute inset-0 bg-slate-900/90 flex items-center justify-center text-center text-sm"
            >
              You are eliminated. Waiting for other players to finish...
            </div>
            <div
              v-if="myPlayerData?.isFinished"
              class="absolute inset-0 bg-slate-900/90 flex items-center justify-center text-center text-sm"
            >
              You are finished. Waiting for other players to finish...
            </div>
          </div>
          <p class="text--secondary text-center flex items-center gap-2 justify-center">
            <span v-if="myPlayerData?.isEliminated">Spectating other players</span>
            <template v-else>
              <Icon name="bi:keyboard" size="24" class="mb-0.5" />
              <span>Start typing to begin. Click here if not focused.</span>
            </template>
          </p>
          <ul class="spacing--default">
            <li v-for="player in room?.players || []" :key="player.id" class="spacing--small">
              <div class="flex items-center justify-between gap-2">
                <h4
                  class="font-bold text-sm"
                  :class="{
                    'line-through text-red-500': player.isEliminated,
                  }"
                >
                  <UiRenderNickname
                    :nickname="player.nickname"
                    :guest-display-name="player.guestDisplayName"
                  />
                  <span v-if="playerId === player.id" class="text-emerald-500">&nbsp;(you)</span>
                </h4>
                <span v-if="!player.isEliminated" class="text-sm">{{
                  `${player.progress.toFixed(0)}%`
                }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="flex w-full h-3 bg-slate-700 rounded-full overflow-hidden flex-1"
                  :class="{
                    'opacity-25': player.isEliminated,
                  }"
                  role="progressbar"
                  :aria-valuenow="player.progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    class="flex flex-col justify-center rounded-full overflow-hidden bg-cyan-400 text-xs text-black text-center whitespace-nowrap transition duration-500"
                    :style="{ width: `${player.progress}%` }"
                    :class="{ 'bg-emerald-500!': player.isFinished }"
                  >
                    <span class="sr-only">{{ `${player.progress.toFixed(0)}%` }}</span>
                  </div>
                </div>
                <Icon
                  v-if="player.isEliminated"
                  name="fa7-solid:skull-crossbones"
                  size="18"
                  class="text-red-500"
                />
                <Icon
                  v-else-if="player.isFinished"
                  name="nrk:media-completed"
                  size="18"
                  class="text-emerald-500"
                />
                <Icon v-else name="eos-icons:three-dots-loading" size="18" class="text-cyan-500" />
              </div>
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <div class="card--main spacing--default">
            <h2 class="h2 flex items-center gap-2">
              <Icon name="noto-v1:trophy" size="24" />
              <span>Leaderboard</span>
            </h2>
            <UiPlayerList :room="room" :i-am-host="iAmHost" :sort-by-score="true" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="room.status === TGameState.ROUND_END"
      class="px-4 py-12 w-full max-w-7xl mx-auto text-center spacing--default"
    >
      <h3 class="text-3xl font-black text-center italic">ROUND RESULTS</h3>
      <p class="text-lg text-center text--secondary">
        Next round will start in {{ 10 - roundCountdown }} seconds. Get ready!
      </p>
      <div class="grid gap-4">
        <div
          v-for="p in room.players"
          :key="p.id"
          :class="[
            'p-4 rounded-xl border flex justify-between items-center',
            p.isEliminated ? 'bg-red-500/10 border-red-500/50' : 'bg-slate-800 border-slate-700',
          ]"
        >
          <div class="flex items-center gap-4">
            <div class="font-bold">
              <UiRenderNickname :nickname="p.nickname" :guest-display-name="p.guestDisplayName" />
            </div>
            <Icon v-if="p.isHost" name="mdi:crown" class="text-yellow-500" size="18" />
            <span v-if="playerId === p.id" class="text-xs text-cyan-500">(you)</span>
            <div
              v-if="p.isEliminated"
              class="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-black uppercase"
            >
              Eliminated
            </div>
          </div>
          <div class="flex gap-8 text-sm">
            <div class="flex items-center gap-2">
              <span class="opacity-50">WPM:</span> <span class="font-bold">{{ p.wpm }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="opacity-50">Round Score:</span>
              <span class="font-bold">{{ p.roundScore }} pts</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="opacity-50">Accuracy:</span>
              <span class="font-bold">{{ p.accuracy }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="room.status === TGameState.FINISHED"
      class="px-4 py-12 w-full max-w-7xl mx-auto text-center spacing--default"
    >
      <h2 class="text-5xl font-black italic text-indigo-500">
        {{ returnWinner?.id === playerId ? "Congratulations" : "Game Over" }}
      </h2>
      <div class="text-2xl font-bold">
        Winner:
        <UiRenderNickname
          :nickname="returnWinner?.nickname || 'None'"
          :guest-display-name="returnWinner?.guestDisplayName"
        />
      </div>
      <p
        v-if="onlinePlayers ? onlinePlayers?.length <= 1 : false"
        class="text-center text-yellow-500"
      >
        There is only one player left. Please leave and find new opponents to play again.
      </p>
      <button
        v-else-if="iAmHost"
        class="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105"
        @click="onRestart"
      >
        PLAY AGAIN
      </button>
      <p v-else class="text-center text-yellow-500">Waiting for host to start the game.</p>
      <div>
        <div class="card--main spacing--default">
          <h2 class="h2 flex items-center gap-2">
            <Icon name="noto-v1:trophy" size="24" />
            <span>Leaderboard</span>
          </h2>
          <ul class="spacing--small">
            <li
              v-for="(player, rank) in room.players.sort((a, b) => b.score - a.score) || []"
              :key="player.id"
              class="border border-slate-700 rounded-lg bg-slate-700/50 py-2 px-4 flex items-center justify-between gap-2"
              :class="{
                'border-cyan-500!': !iAmHost && player.id === playerId,
                'border-yellow-500!': iAmHost && player.id === playerId,
              }"
            >
              <div class="mr-2">
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
                <span class="font-medium text-xs text-left">
                  <UiRenderNickname
                    :nickname="player.nickname"
                    :guest-display-name="player.guestDisplayName"
                  />
                </span>
                <Icon v-if="player.isHost" name="mdi:crown" class="text-yellow-500" size="18" />
                <span v-if="playerId === player.id" class="text-xs text-cyan-500">(you)</span>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-center">
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
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  <div v-else="error" class="w-screen flex items-center justify-center h-[calc(100vh-3rem)]">
    <div class="space-y-4">
      <div class="flex items-center gap-2 justify-center py-4">
        <Icon name="mdi:alert-circle" size="48" class="text-red-500" />
        <span class="font-bold text-warning-500 text-5xl">{{ error }}</span>
      </div>
      <div>
        <button
          type="button"
          class="button--secondary"
          @click="
            $router.push({
              name: 'game-rooms',
            })
          "
        >
          Go back
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="room && room.status === TGameState.COUNTDOWN"
    class="fixed inset-0 z-20 bg-slate-900 flex items-center justify-center"
  >
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      appear
    >
      <div :key="room.countdown" class="text-8xl font-black">
        {{ room.countdown > 0 ? room.countdown : "Prepare!" }}
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute<"game-rooms-id">();

const roomId = computed(() => route.params.id);
const password = computed(() => (route.query.password as string) || undefined);

const { onJoinRoom, onLeaveRoom, onStartGame, onSubmitProgress, onSubmitResult, room } = useRoom();
const { id, nickname, guestDisplayName, playerId } = useUser();

const socketStore = useSocketStore();

const isConnected = computed(() => socketStore.isConnected);
const error = computed(() => socketStore.error);
const joinedRoom = ref(false);

watch(
  isConnected,
  (connected) => {
    if (connected) {
      console.info("WebSocket connected, joining room...");
      if (!joinedRoom.value) {
        onJoinRoom({
          nickname: nickname.value,
          guestDisplayName: guestDisplayName.value,
          roomId: roomId.value,
          password: password.value,
        });
        joinedRoom.value = true;
      } else {
        console.warn("Already joined room, not sending joinRoom message again.");
      }
    } else {
      console.warn("WebSocket disconnected.");
    }
  },
  {
    immediate: true,
  }
);

onMounted(async () => {
  await nextTick();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
  onLeaveRoom(roomId.value, playerId.value);
});

const handleKeydown = (e: KeyboardEvent) => {
  if (myPlayerData.value?.isFinished) {
    console.info("Player has already finished, ignoring key input.");
    return;
  }
  if (myPlayerData.value?.isEliminated) {
    console.info("Player is eliminated, ignoring key input.");
    return;
  }
  if (room.value?.status !== TGameState.PLAYING)
    // Only handle key events during the PLAYING state
    return;

  // Ignore control combinations (Ctrl+C, Cmd+V, etc.)
  if (e.ctrlKey || e.metaKey) return;

  // Start the timer on the first keystroke
  if (text.value.length === 0 && e.key.length === 1) {
    onStartTimer();
  }

  // Accept printable characters
  if (e.key.length === 1) {
    if (room.value && text.value.length < returnCurrentSentence.value.length) {
      text.value += e.key;
      onSubmitProgress(returnCurrentProgress.value);
    }
  }

  // Check if the sentence is completed
  if (room.value && text.value.length === returnCurrentSentence.value.length) {
    onStopTimer();
    onSubmitResult({
      text: text.value,
      timeTaken: completionTime.value ?? 0,
      errors: returnErrorCount.value,
    });
  }

  // Handle Backspace manually
  if (e.key === "Backspace") {
    text.value = text.value.slice(0, -1);
    onSubmitProgress(returnCurrentProgress.value);
  }
};

const host = computed(() => room.value?.players.find((player) => player.isHost));

const iAmHost = computed(() => host.value?.id === playerId.value);

const remainingPlayers = computed(() =>
  room.value?.players.filter((player) => !player.isEliminated && player.isOnline)
);

const onlinePlayers = computed(() => room.value?.players.filter((player) => player.isOnline));

const myPlayerData = computed(() =>
  room.value?.players.find((player) => player.id === playerId.value)
);

const onCopyToClipboard = () => {
  let inviteLink = `${window.location.origin}/game/rooms/${roomId.value}?invitedBy=${encodeURIComponent(nickname.value)}`;
  if (room.value?.isPrivate && room.value.password) {
    inviteLink += `&password=${encodeURIComponent(room.value.password)}`;
  }
  inviteLink += `&time=${Date.now()}`;
  navigator.clipboard.writeText(inviteLink);
  alert("Copied to clipboard! Share this link with your friends to join the game.");
};

const text = ref("");
const returnCurrentSentence = computed(() => room.value?.currentSentence || "");
const returnText = computed(() => text.value.split(""));
const returnLastWordIndex = computed(() => returnText.value.length - 1);
const returnWinner = computed(() => {
  const sortedPlayers = toRaw(room.value)?.players.sort((a, b) => b.score - a.score);
  return sortedPlayers?.find((player) => !player.isEliminated);
});

// Timing and WPM calculation
const startTime = ref<number | null>(null);
const elapsedTime = ref(0);
const timerInterval = ref<NodeJS.Timeout | null>(null);
const completionTime = ref<number | null>(null);

const onStartTimer = () => {
  if (startTime.value === null) {
    startTime.value = Date.now();
    timerInterval.value = setInterval(() => {
      if (startTime.value) {
        elapsedTime.value = (Date.now() - startTime.value) / 1000;
      }
    }, 50);
  }
};

const onStopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    completionTime.value = elapsedTime.value;
  }
};

const returnWPM = computed(() => {
  if (elapsedTime.value <= 0 || text.value.length === 0) return 0;
  // WPM = (characters typed / 5) / (time in minutes)
  const words = text.value.length / 5;
  const minutes = elapsedTime.value / 60;
  return Math.round(words / minutes);
});

const returnErrorCount = computed(() => {
  let errors = 0;

  const original = returnCurrentSentence.value;
  const typed = text.value;

  const length = Math.min(original.length, typed.length);

  for (let i = 0; i < length; i++) {
    if (typed[i] !== original[i]) {
      errors++;
    }
  }

  return errors;
});

const returnCurrentProgress = computed(() =>
  Math.min(100, (text.value.length / returnCurrentSentence.value.length) * 100)
);

const returnRoomStatus = computed(() => room.value?.status);

const endEffectsPlayed = ref(false);

const playTone = (frequency: number, durationMs: number) => {
  if (!import.meta.client) return;
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + durationMs / 1000
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + durationMs / 1000 + 0.05);

    oscillator.onended = () => {
      audioContext.close();
    };
  } catch (err) {
    console.warn("AudioContext not available", err);
  }
};

const playWinSound = () => {
  playTone(880, 180);
  setTimeout(() => playTone(1175, 220), 120);
};

const playLoseSound = () => {
  playTone(392, 220);
  setTimeout(() => playTone(261, 260), 140);
};

const triggerConfetti = async () => {
  if (!import.meta.client) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { default: confetti } = await import("canvas-confetti");
  confetti({
    particleCount: 140,
    spread: 70,
    origin: { y: 0.6 },
  });
  confetti({
    particleCount: 80,
    spread: 120,
    origin: { y: 0.7 },
    scalar: 0.9,
  });
};

const countdownEffectsPlayedFor = ref<number | null>(null);
const countdownStartPlayed = ref(false);

const playCountdownBeep = (value: number) => {
  if (value <= 0) {
    playTone(1047, 220);
    return;
  }
  playTone(523, 140);
};

const {
  counter: roundCountdown,
  reset,
  resume,
  pause,
} = useInterval(1_000, {
  controls: true,
  immediate: false,
});

watch(
  () => [returnRoomStatus.value, returnWinner.value?.id],
  ([status]) => {
    switch (status) {
      case TGameState.ROUND_END:
        reset();
        resume();
        text.value = "";
        onStopTimer();
        startTime.value = null;
        completionTime.value = null;
        elapsedTime.value = 0;
        endEffectsPlayed.value = false;
        break;
      case TGameState.FINISHED: {
        text.value = "";
        onStopTimer();
        startTime.value = null;
        completionTime.value = null;
        elapsedTime.value = 0;

        if (!endEffectsPlayed.value && returnWinner.value?.id) {
          if (returnWinner.value.id === playerId.value) {
            playWinSound();
            triggerConfetti();
          } else {
            playLoseSound();
          }
          endEffectsPlayed.value = true;
        }
        pause();
        break;
      }
      default:
        endEffectsPlayed.value = false;
        pause();
        break;
    }
  }
);

watch(
  () => [room.value?.status, room.value?.countdown],
  ([status, countdown]) => {
    if (status !== TGameState.COUNTDOWN) {
      countdownEffectsPlayedFor.value = null;
      countdownStartPlayed.value = false;
      return;
    }

    if (typeof countdown === "number" && countdownEffectsPlayedFor.value !== countdown) {
      playCountdownBeep(countdown);
      countdownEffectsPlayedFor.value = countdown;
    }

    if (typeof countdown === "number" && countdown <= 0 && !countdownStartPlayed.value) {
      playTone(1319, 260);
      countdownStartPlayed.value = true;
    }
  }
);

const onRestart = () => {
  onStartGame();
};
</script>
