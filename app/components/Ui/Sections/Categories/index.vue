<template>
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
</script>
