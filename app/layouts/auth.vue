<template>
  <div class="w-full min-h-dvh grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_768px]">
    <div class="items-center text-center justify-center relative hidden lg:flex">
      <NuxtImg
        src="/images/homepage_hero_pattern_top.png"
        class="w-full absolute top-0 left-0 right-0 h-96"
        alt="Homepage hero pattern top"
      />
      <NuxtImg
        src="/images/homepage_hero_pattern_bottom.png"
        class="w-full absolute bottom-0 left-0 right-0 h-96"
        alt="Homepage hero pattern bottom"
      />
      <h1 class="text-6xl font-semibold text--gradient">Quizzio</h1>
    </div>
    <div class="bg-white text-primary-950 flex justify-center items-center py-12 px-6">
      <slot />
    </div>
  </div>
</template>
