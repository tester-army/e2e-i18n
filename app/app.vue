<script setup lang="ts">
const { t, localeProperties } = useI18n();

useHead(() => ({
  // Not useLocaleHead: it warns on every request without a baseUrl.
  htmlAttrs: { lang: localeProperties.value.language },
  bodyAttrs: { class: "e2e flex min-h-dvh flex-col" },
  title: t("meta.title"),
  meta: [{ name: "description", content: t("meta.description") }],
}));
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <NuxtPage />
</template>
