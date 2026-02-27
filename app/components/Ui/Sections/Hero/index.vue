<template>
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
</template>
