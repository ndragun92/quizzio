<template>
  <NuxtLayout>
    <Html lang="en" :data-route-path="$route?.path">
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="language" content="en" />
        <Meta property="og:title" :content="title" />
        <Meta name="twitter:title" :content="title" />
        <Meta name="description" :content="description" />
        <Meta property="og:description" :content="description" />
        <Meta name="twitter:description" :content="description" />
        <Meta property="og:image" content="/og_image.jpg" />
        <Meta name="twitter:image" content="/og_image.jpg" />
        <Meta property="og:site_name" :content="title" />
        <Meta name="twitter:site" :content="title" />
        <Meta name="url" :content="`${nuxtApp?.$app_origin}${$route?.path}`" />
        <Meta property="og:url" :content="`${nuxtApp?.$app_origin}${$route?.path}`" />
        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
        <Link rel="apple-touch-startup-image" href="/favicon.png" />
      </Head>
    </Html>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
  <LazyUiToast />
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp();

const title = "Quizzio";
const description = "Join Quizzio today and unlock a world of fun, learning, and rewards.";
</script>
