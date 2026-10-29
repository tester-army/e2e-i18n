<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "en" },
  bodyAttrs: { class: "e2e flex min-h-dvh flex-col" },
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <NuxtPage />
</template>
