<template>
  <section class="grid grid-cols-4 gap-5">
    <UiCard v-for="stat in stats" :key="stat.name" class="flex gap-4">
      <div class="flex-1">
        <div class="space-y-2">
          <h3 class="text--secondary text-sm font-semibold">{{ stat.name }}</h3>
          <div>
            <span class="text-3xl font-bold">{{ stat.value }}</span>
            <span class="text-sm text-green-500 ml-2">{{ stat.change }}</span>
          </div>
        </div>
      </div>
      <div>
        <div :class="`${stat.icon.bgColor} size-9 rounded-full flex items-center justify-center`">
          <Icon :name="stat.icon.name" size="20" :class="stat.icon.color" />
        </div>
      </div>
    </UiCard>
  </section>
</template>

<script lang="ts" setup>
const stats = [
  {
    name: "Total Quizzes",
    value: "2,543",
    change: "+12.5%",
    icon: {
      name: "lucide:book-open",
      color: "text-purple-400",
      bgColor: "bg-purple-500/25",
    },
  },
  {
    name: "Total Players",
    value: "15,230",
    change: "+8.3%",
    icon: {
      name: "lucide:users",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/25",
    },
  },
  {
    name: "Average Score",
    value: "85%",
    change: "+5.2%",
    icon: {
      name: "lucide:bar-chart-2",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/25",
    },
  },
  {
    name: "Active Quizzes",
    value: "120",
    change: "+20%",
    icon: {
      name: "lucide:activity",
      color: "text-green-400",
      bgColor: "bg-green-500/25",
    },
  },
];
</script>
