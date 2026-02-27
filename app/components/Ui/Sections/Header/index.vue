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
</template>
