<template>
  <main class="w-screen h-dvh bg-primary-950 flex flex-col">
    <NuxtImg
      src="/images/homepage_hero_eclipse_left.png"
      class="absolute left-0 top-0 opacity-75 pointer-events-none"
      alt="Homepage hero eclipse left"
    />
    <NuxtImg
      src="/images/homepage_hero_eclipse_right.png"
      class="absolute right-0 bottom-0 opacity-75 pointer-events-none"
      alt="Homepage hero eclipse right"
    />
    <header class="h-16 border-b border-primary-800">
      <div
        class="container mx-auto grid grid-cols-[150px_minmax(0,1fr)_150px] items-center gap-4 px-15 h-16"
      >
        <div>
          <button type="button" class="button--primary button--icon size-10!">
            <Icon name="mdi:chevron-left" size="24" />
          </button>
        </div>
        <div>
          <h1 class="text-center font-semibold text-lg">Science & Technology Quiz</h1>
        </div>
        <div />
      </div>
    </header>
    <div class="flex-1 flex items-center justify-center">
      <div class="container mx-auto px-15 grid grid-cols-[minmax(0,1fr)_320px] gap-15">
        <div class="space-y-6">
          <div class="space-y-1.5">
            <div class="text--secondary font-medium flex items-center justify-between">
              <span>Question 1 of 10</span>
              <span>10% Complete</span>
            </div>
            <div>
              <div class="w-full h-2 bg-primary-900 rounded-full overflow-hidden">
                <div class="h-full bg-ascend-purple-dark rounded-full" style="width: 10%" />
              </div>
            </div>
          </div>
          <UiCard class="space-y-6">
            <div class="grid grid-cols-[150px_minmax(0,1fr)_150px] items-center">
              <div>
                <span class="bg-ascend-purple-dark py-1.5 px-3 text-xs rounded-full"
                  >100 points</span
                >
              </div>
              <div class="text-center">
                <div class="flex items-center gap-2 justify-center text-red-500">
                  <Icon name="mdi:stopwatch-outline" size="24" />
                  <span class="font-semibold text-base">00:00</span>
                </div>
              </div>
              <div class="flex justify-end">
                <span class="bg-primary-800 py-1.5 px-3 text-xs rounded-full">Medium</span>
              </div>
            </div>
            <h2 class="font-semibold text-2xl/7">
              Which of the following energy sources cannot be replenished naturally on a human
              timescale, making it an example of a non-renewable resource?
            </h2>
          </UiCard>
          <UiQuizRound />
          <div class="flex items-center gap-8 justify-between">
            <button type="button" class="button--primary w-auto!">
              <Icon name="mdi:flag-outline" size="24" />
              <span>Skip</span>
            </button>
            <button type="button" class="button--default w-auto!">
              <span>Next Question</span>
              <Icon name="mdi:chevron-right" size="24" />
            </button>
          </div>
        </div>
        <div>
          <UiCard class="space-y-3">
            <h4 class="text-lg font-semibold">Quiz Stats</h4>
            <div class="space-y-4">
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Score</h5>
                <div class="text-ascend-purple-dark font-semibold">0</div>
              </UiCard>
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Lives</h5>
                <div class="text-red-500 space-x-2">
                  <Icon name="mdi:heart" size="24" />
                  <Icon name="mdi:heart" size="24" />
                  <Icon name="mdi:heart" size="24" />
                </div>
              </UiCard>
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Progress</h5>
                <div class="text-white font-semibold">1 of 10</div>
              </UiCard>
              <UiCard class="text-center py-2! space-y-0.5" :level="2">
                <h5 class="text--secondary">Position</h5>
                <div class="text-ascend-purple-dark font-semibold">2nd</div>
              </UiCard>
            </div>
          </UiCard>
        </div>
      </div>
    </div>
  </main>
</template>
