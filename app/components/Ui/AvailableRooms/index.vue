<template>
  <div class="spacing--default">
    <div v-if="Array.isArray(rooms)" class="bg-slate-800 rounded-lg shadow-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-700 border-b border-slate-600">
              <th class="px-4 py-2 text-left text-sm font-bold text-gray-300">Name</th>
              <th class="px-4 py-2 text-left text-sm font-bold text-gray-300">Status</th>
              <th class="px-4 py-2 text-left text-sm font-bold text-gray-300">Type</th>
              <th class="px-4 py-2 text-center text-sm font-bold text-gray-300">Spots</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="room in rooms"
              :key="room.id"
              class="relative border-b border-slate-700 hover:bg-slate-700/50 transition text-xs focus:bg-cyan-500/50 focus:outline-none"
              :class="{
                'pointer-events-none': room.playersCount >= room.maxPlayers,
              }"
              tabindex="0"
              @keydown.enter="$router.push({ name: 'game-rooms-id', params: { id: room.id } })"
              @click="
                $router.push({
                  name: 'game-rooms-id',
                  params: { id: room.id },
                })
              "
            >
              <td class="px-4 py-2">
                <div>
                  <p class="font-bold text-white">{{ room.name }}</p>
                </div>
                <div
                  class="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/75"
                  v-if="room.playersCount >= room.maxPlayers"
                >
                  <p class="text-sm text-red-500 font-bold">Room is full.</p>
                </div>
              </td>
              <td class="px-4 py-2">
                <div>
                  <p class="font-bold text-white">{{ room.status }}</p>
                </div>
              </td>
              <td class="px-4 py-2">
                <div>
                  <p class="font-bold text-white capitalize">{{ room.wordPack }}</p>
                </div>
              </td>
              <td class="px-4 py-2 text-center">
                <span class="font-bold text-yellow-400"
                  >{{ room.playersCount }} of {{ room.maxPlayers }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!rooms.length" class="text-center py-12">
        <p class="text-gray-400">No available rooms.</p>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button type="button" class="button--secondary flex-1" @click="emit('reset')">Back</button>
      <button type="submit" class="button--default flex-2" @click="onJoinRandomRoom">
        <span>Join random room</span>
        <Icon name="mdi:arrow-right" size="18" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: rooms } = useNuxtData("rooms");

const emit = defineEmits(["reset"]);

const onJoinRandomRoom = () => {
  const randomRoom = rooms.value[Math.floor(Math.random() * rooms.value.length)];
  if (randomRoom) {
    navigateTo({ name: "game-rooms-id", params: { id: randomRoom.id } });
  }
};
</script>
