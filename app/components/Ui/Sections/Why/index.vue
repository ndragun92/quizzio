<template>
  <section class="bg-primary-950">
    <div class="container px-14 mx-auto py-10 space-y-8">
      <div class="text-center">
        <UiPill icon="lucide:star">Features</UiPill>
      </div>
      <div class="text-center max-w-2xl mx-auto space-y-6">
        <h2 class="text-5xl font-bold">Why <span class="text--gradient">Quizzio</span></h2>
        <p>Discover quizzes across various subjects to test and expand your knowledge</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="feature in features"
          :key="feature.name"
          class="bg-primary-900 flex flex-col gap-4 border border-primary-800 rounded-lg overflow-hidden py-7 px-6"
        >
          <div>
            <div
              class="size-12 rounded-full flex items-center justify-center"
              :class="feature.icon.bgColor"
            >
              <Icon :name="feature.icon.name" size="24" :class="feature.icon.color" />
            </div>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">{{ feature.name }}</h3>
            <p class="text--secondary">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const features = [
  {
    name: "Personalized Learning",
    description:
      "Quizzio adapts to your learning style, providing personalized quizzes and feedback to help you improve.",
    icon: {
      name: "lucide:sliders",
      color: "text-purple-400",
      bgColor: "bg-purple-500/25",
    },
  },
  {
    name: "Reward System",
    description:
      "Earn points, badges, and rewards as you play and learn. Compete with friends and climb the leaderboards!",
    icon: {
      name: "lucide:trophy",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/25",
    },
  },
  {
    name: "Host Dashboard",
    description:
      "Create and manage your own quizzes with our intuitive host dashboard. Track player performance and engagement with detailed analytics.",
    icon: {
      name: "material-symbols-light:dashboard-outline-rounded",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/25",
    },
  },
  {
    name: "Progress Tracking",
    description:
      "Track your progress over time with detailed statistics and insights. See how you improve and identify areas for growth.",
    icon: {
      name: "lucide:trending-up",
      color: "text-green-400",
      bgColor: "bg-green-500/25",
    },
  },
  {
    name: "Competitive Leaderboards",
    description:
      "Compete with friends and players worldwide on our competitive leaderboards. See how you rank and strive to reach the top!",
    icon: {
      name: "lucide:users",
      color: "text-blue-400",
      bgColor: "bg-blue-500/25",
    },
  },
  {
    name: "Mobile Friendly",
    description:
      "Play and learn on the go with our mobile-friendly design. Access quizzes anytime, anywhere, on any device.",
    icon: {
      name: "lucide:smartphone",
      color: "text-red-400",
      bgColor: "bg-red-500/25",
    },
  },
];
</script>
