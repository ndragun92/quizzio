<template>
  <main id="main" class="bg-primary-950">
    <header id="header" class="bg-primary-900/75 border-b border-primary-800/75">
      <div class="flex px-8 items-center justify-between gap-4 py-4 lg:py-0 lg:h-16">
        <div class="relative">
          <div>
            <Icon
              name="lucide:search"
              size="20"
              class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <input type="text" class="input--text pl-10!" placeholder="Search..." />
        </div>
        <div class="flex items-center gap-4 justify-end col-span-2 lg:col-span-1">
          <NuxtLink
            :to="{ name: 'auth-register' }"
            class="button--default-outline border-primary-700! w-auto! px-4!"
          >
            <Icon name="lucide:plus" size="20" class="inline-block mr-1" />
            <span>Create Quiz</span></NuxtLink
          >
        </div>
      </div>
    </header>
    <aside id="aside" class="bg-primary-900/50 p-4 border-r border-primary-800/50 space-y-6">
      <div>
        <h1 class="text--gradient font-semibold text-2xl">Quizzio</h1>
      </div>
      <div class="relative">
        <div>
          <Icon
            name="lucide:search"
            size="20"
            class="text-primary-500 absolute left-3 top-1/2 -translate-y-1/2"
          />
        </div>
        <input type="text" class="input--text pl-10!" placeholder="Search..." />
      </div>
      <ul>
        <li>
          <NuxtLink class="flex items-center gap-3 text-primary-300">
            <Icon name="lucide:home" size="20" />
            <span>Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="flex items-center gap-3 text-primary-300">
            <Icon name="lucide:book-open" size="20" />
            <span>Quizzes</span>
          </NuxtLink>
        </li>
      </ul>
    </aside>
    <div id="content" class="bg-primary-950 p-8 relative">
      <NuxtImg
        src="/images/homepage_hero_eclipse_left.png"
        class="absolute left-0 top-0 opacity-75 pointer-events-none"
        alt="Eclipse left"
      />
      <NuxtImg
        src="/images/homepage_hero_eclipse_right.png"
        class="absolute right-0 top-0 opacity-75 pointer-events-none"
        alt="Eclipse right"
      />
      <slot />
    </div>
  </main>
</template>

<style scoped>
#main {
  display: grid;
  grid-template-areas:
    "aside header"
    "aside content";
  grid-template-columns: 320px minmax(0, 1fr);
  grid-template-rows: auto 1fr;
  height: 100dvh;
}
#header {
  grid-area: header;
}
#aside {
  grid-area: aside;
}
#content {
  grid-area: content;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  min-height: 0px;
}
</style>
