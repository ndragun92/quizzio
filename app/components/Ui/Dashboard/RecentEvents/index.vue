<template>
  <UiCard class="space-y-3 col-span-2">
    <div class="space-y-2">
      <h3 class="font-bold text-2xl">Recent Events</h3>
      <p class="text--secondary">Manage your recent events and activities here.</p>
    </div>
    <div class="space-y-4">
      <UiCard
        v-for="event in recentEvents"
        :key="event.title"
        class="flex items-center justify-between gap-4"
        :level="2"
      >
        <div class="text-sm flex items-center gap-2">
          <div>
            <div :class="`bg-green-500/25 size-9 rounded-full flex items-center justify-center`">
              <Icon name="lucide:calendar" size="20" class="text-green-400" />
            </div>
          </div>
          <div class="space-y-1">
            <h4 class="font-semibold">{{ event.title }}</h4>
            <div class="flex items-center gap-2 text--secondary">
              <div class="flex items-center gap-2">
                <Icon name="lucide:clock" size="16" />
                <span>{{ event.status }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:users" size="16" />
                <span>{{ event.participants }} Participants</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" class="button--default py-2! px-6!">View Live</button>
        </div>
      </UiCard>
    </div>
  </UiCard>
</template>

<script lang="ts" setup>
const recentEvents = [
  {
    title: "Science Mid-term Quiz",
    status: "Published",
    date: "2024-06-15",
    participants: 120,
  },
  {
    title: "History Final Quiz",
    status: "Draft",
    date: "2024-06-20",
    participants: 0,
  },
  {
    title: "Math Weekly Quiz",
    status: "Published",
    date: "2024-06-18",
    participants: 85,
  },
];
</script>
