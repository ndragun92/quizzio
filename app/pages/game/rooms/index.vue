<template>
  <div class="flex-1 flex items-center justify-center h-full px-4">
    <div class="w-full spacing--default max-w-xl">
      <div class="grid grid-cols-3 gap-4">
        <div class="card--main p-2! text-center">
          <div class="text-sm font-bold">Online users</div>
          <div>{{ status?.total?.users || 0 }}</div>
        </div>
        <div class="card--main p-2! text-center">
          <div class="text-sm font-bold">Active rooms</div>
          <div>{{ status?.total?.rooms || 0 }}</div>
        </div>
        <div class="card--main p-2! text-center">
          <div class="text-sm font-bold">Public rooms</div>
          <div>{{ publicRooms?.length || 0 }}</div>
        </div>
      </div>
      <div class="card--main">
        <div v-if="!roomType" class="spacing--default">
          <button
            type="button"
            class="button--default from-orange-500! to-orange-600! hover:from-orange-600! hover:to-orange-700! focus:ring-orange-500!"
            @click="roomType = 'public'"
          >
            <Icon name="mdi-users" size="24" />
            <span>Available Rooms</span>
          </button>
          <button type="button" class="button--default" @click="roomType = 'create'">
            <Icon name="mdi-plus" size="24" />
            <span>Create Room</span>
          </button>
          <button type="button" class="button--secondary" @click="roomType = 'private'">
            <Icon name="mdi-lock" size="24" />
            <span>By Room Code</span>
          </button>
          <NuxtLink
            :to="{
              name: 'game-leaderboard',
            }"
            class="button--secondary from-yellow-500! to-yellow-600! hover:from-yellow-600! hover:to-yellow-700!"
          >
            <Icon name="mdi-trophy" size="24" />
            <span>Leaderboards</span>
          </NuxtLink>
        </div>
        <UiAvailableRooms v-else-if="roomType === 'public'" @reset="roomType = null" />
        <UiRoomCreate v-else-if="roomType === 'create'" @reset="roomType = null" />
        <UiRoomPrivate v-else-if="roomType === 'private'" @reset="roomType = null" />
      </div>
      <div>
        <ul class="grid grid-cols-3 gap-4">
          <li
            v-for="item in [
              {
                name: 'Real-time',
                icon: 'fxemoji:bolt',
              },
              {
                name: 'Competitive',
                icon: 'noto:trophy',
              },
              {
                name: 'Multiplayer',
                icon: 'streamline-color:group-meeting-call-flat',
              },
            ]"
            :key="item.name"
            class="card--main"
          >
            <div class="text-center spacing--small">
              <div>
                <Icon :name="item.icon" size="24" />
              </div>
              <div class="text--secondary">{{ item.name }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const roomType = ref<"public" | "private" | "create" | null>(null);

const { data: status } = useNuxtData("status");
const { data: publicRooms } = useNuxtData("rooms");
</script>
