<template>
  <header
    class="bg-linear-to-t from-primary-950 to-primary-900 border-b border-primary-800 sticky top-0 z-50"
  >
    <div
      class="grid grid-cols-2 lg:grid-cols-[250px_minmax(0,1fr)_250px] gap-4 py-4 lg:py-0 lg:h-16 items-center container px-14 mx-auto"
    >
      <div>
        <h1 class="text--gradient font-semibold text-2xl">Quizzio</h1>
      </div>
      <nav class="flex justify-end lg:justify-center">
        <ul class="flex items-center gap-6">
          <li>
            <a href="#" class="link--default">Home</a>
          </li>
          <li>
            <a href="#" class="link--default">Quizzes</a>
          </li>
          <li>
            <a href="#" class="link--default">About</a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-4 justify-end col-span-2 lg:col-span-1">
        <NuxtLink :to="{ name: 'auth-login' }" class="button--secondary w-auto!">Sign In</NuxtLink>
        <NuxtLink :to="{ name: 'auth-register' }" class="button--default w-auto!"
          >Register</NuxtLink
        >
      </div>
    </div>
  </header>
  <section class="relative overflow-hidden">
    <NuxtImg
      src="/images/homepage_hero_pattern_top.png"
      class="w-full absolute top-0 left-0 right-0 2xl:hidden"
      alt="Homepage hero pattern top"
    />
    <NuxtImg
      src="/images/homepage_hero_eclipse_left.png"
      class="absolute left-0 top-0 opacity-75"
      alt="Homepage hero eclipse left"
    />
    <NuxtImg
      src="/images/homepage_hero_pattern_bottom.png"
      class="w-full absolute bottom-0 left-0 right-0 2xl:hidden"
      alt="Homepage hero pattern bottom"
    />
    <NuxtImg
      src="/images/homepage_hero_eclipse_right.png"
      class="absolute right-0 top-0 opacity-75"
      alt="Homepage hero eclipse right"
    />
    <div class="absolute inset-0 bg-primary-950 opacity-25" />
    <div class="py-40 px-12 max-w-4xl mx-auto relative">
      <div class="text-center space-y-8">
        <UiPill icon="mingcute:ai-line">The ultimate quiz experience</UiPill>
        <h2 class="text-6xl font-bold">
          Learn, Quiz, <span class="text--gradient">Earn Rewards</span>
        </h2>
        <p class="text-xl max-w-xl mx-auto">
          Join Quizzio today and unlock a world of fun, learning, and rewards. Test your knowledge,
        </p>
        <div class="inline-flex items-center justify-center gap-4">
          <button class="button--default w-auto">Get Started</button>
          <button class="button--secondary whitespace-nowrap">Explore Quizzes</button>
        </div>
        <div class="flex justify-center gap-4">
          <div class="flex">
            <div
              v-for="n in 4"
              :key="n"
              class="size-10 bg-primary-800 -ml-3 first:ml-0 rounded-full border border-primary-900"
            />
          </div>
          <div class="flex items-center gap-1 text-sm">
            <span class="text-ascend-purple-dark">5000+</span>
            <p>players joined this week</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container px-14 mx-auto py-10 space-y-8">
    <div class="text-center">
      <UiPill icon="lucide:book-open">Categories</UiPill>
    </div>
    <div class="text-center max-w-2xl mx-auto space-y-6">
      <h2 class="text-5xl font-bold">
        Explore <span class="text--gradient">Quiz Categories</span>
      </h2>
      <p>Discover quizzes across various subjects to test and expand your knowledge</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="category in categories"
        :key="category.name"
        class="bg-primary-800 flex gap-4 border-t-3 rounded-lg overflow-hidden py-7 px-6"
        :class="category.color"
      >
        <div>
          <div
            class="size-12 rounded-full flex items-center justify-center"
            :class="category.icon.color"
          >
            <Icon :name="category.icon.name" size="24" />
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">{{ category.name }}</h3>
          <p class="text--secondary">{{ category.description }}</p>
          <button class="link--default">Explore Quizzes</button>
        </div>
      </div>
    </div>
  </section>
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
  <section class="bg-primary-950">
    <div class="container px-14 mx-auto py-10 space-y-8">
      <div
        class="bg-linear-to-r flex flex-col lg:flex-row gap-4 from-violet-800 to-orange-600 rounded-2xl p-12"
      >
        <div class="space-y-8">
          <h4 class="font-bold text-4xl max-w-sm">Ready to Start Your Quiz Journey?</h4>
          <p class="max-w-lg text-lg text-primary-300">
            Join Quizzio today and unlock a world of fun, learning, and rewards.
          </p>
          <div class="flex items-center gap-4">
            <button class="button--secondary w-auto!">Create Account</button>
            <button class="button--default-outline w-auto!">Explore Quizzes</button>
          </div>
        </div>
        <div class="flex-1 flex items-center justify-end">
          <div class="w-full h-full max-w-lg rounded-2xl bg-white overflow-hidden" />
        </div>
      </div>
    </div>
  </section>
  <footer class="bg-linear-to-b from-primary-950/50 to-primary-900 border-t border-primary-800">
    <div class="container px-14 mx-auto pt-12 lg:pt-30 space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="space-y-4">
          <h3 class="text-2xl font-semibold text--gradient mt-7">Quizzio</h3>
          <p>Join Quizzio today and unlock a world of fun, learning, and rewards.</p>
        </div>
        <div class="space-y-12">
          <h4 class="text-lg font-semibold">Quick Links</h4>
          <ul class="space-y-4 text-primary-300">
            <li>
              <a href="#" class="hover:text-primary-50 transition">About Us</a>
            </li>
            <li>
              <a href="#" class="hover:text-primary-50 transition">Careers</a>
            </li>
            <li>
              <a href="#" class="hover:text-primary-50 transition">Contact</a>
            </li>
          </ul>
        </div>
        <div class="space-y-12">
          <h4 class="text-lg font-semibold">Resources</h4>
          <ul class="space-y-4 text-primary-300">
            <li>
              <a href="#" class="hover:text-primary-50 transition">Help Center</a>
            </li>
            <li>
              <a href="#" class="hover:text-primary-50 transition">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:text-primary-50 transition">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div class="space-y-12">
          <h4 class="text-lg font-semibold">Follow Us</h4>
          <div class="flex items-center gap-4 mt-4">
            <a href="#" class="text-primary-300 hover:text-primary-50 transition">
              <Icon name="lucide:facebook" size="20" />
            </a>
            <a href="#" class="text-primary-300 hover:text-primary-50 transition">
              <Icon name="lucide:twitter" size="20" />
            </a>
            <a href="#" class="text-primary-300 hover:text-primary-50 transition">
              <Icon name="lucide:instagram" size="20" />
            </a>
            <a href="#" class="text-primary-300 hover:text-primary-50 transition">
              <Icon name="lucide:linkedin" size="20" />
            </a>
          </div>
        </div>
      </div>
      <div class="border-t border-primary-800 mt-24">
        <p class="text-center text-sm text-primary-300 py-6">
          &copy; 2026 Quizzio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const categories = [
  {
    name: "Science & Tech",
    description: "Test your knowledge in science & tech with our challenging quizzes.",
    to: {
      name: "index",
    },
    color: "border-blue-500",
    icon: {
      name: "lucide:cpu",
      color: "bg-blue-500",
    },
  },
  {
    name: "Mathematics",
    description: "Challenge yourself with quizzes covering algebra, geometry, and more.",
    to: {
      name: "index",
    },
    color: "border-green-500",
    icon: {
      name: "tabler:math",
      color: "bg-green-500",
    },
  },
  {
    name: "Chemistry",
    description: "Explore the world of atoms and molecules with our chemistry quizzes.",
    to: {
      name: "index",
    },
    color: "border-violet-500",
    icon: {
      name: "game-icons:potion-ball",
      color: "bg-violet-500",
    },
  },
  {
    name: "Biology",
    description:
      "Dive into the study of life with quizzes on biology topics. Test your knowledge of cells, genetics, and more!",
    to: {
      name: "index",
    },
    color: "border-pink-500",
    icon: {
      name: "lucide:dna",
      color: "bg-pink-500",
    },
  },
  {
    name: "General Knowledge",
    description: "Test your general knowledge with quizzes on a wide range of topics.",
    to: {
      name: "index",
    },
    color: "border-yellow-500",
    icon: {
      name: "lucide:globe",
      color: "bg-yellow-500",
    },
  },
  {
    name: "Entertainment",
    description:
      "Have fun with quizzes on movies, music, and pop culture. Show off your entertainment knowledge!",
    to: {
      name: "index",
    },
    color: "border-red-500",
    icon: {
      name: "simple-icons:dcentertainment",
      color: "bg-red-500",
    },
  },
];

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
