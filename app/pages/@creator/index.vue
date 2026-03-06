<template>
  <div class="space-y-6 relative">
    <UiHeading>
      <template #title>
        Dashboard
      </template>
      <template #description>
        Welcome back, <strong class="text-white">{{ nickname }}</strong>! Here's what's happening with your quizzes today.
      </template>
      <template #actions>
        <button class="button--default">
          <Icon
            name="lucide:plus"
            size="20"
          />
          <span>Create New Quiz</span>
        </button>
      </template>
    </UiHeading>
    <UiDashboardStats />
    <section class="grid grid-cols-3 gap-5">
      <UiDashboardRecentEvents />
      <UiDashboardTopPlayers />
    </section>
    <UiDashboardRecentQuizzes />
  </div>
</template>

<script lang="ts" setup>
const { nickname } = useUser()
</script>
