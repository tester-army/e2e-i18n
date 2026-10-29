<script setup lang="ts">
const { t, localeProperties } = useI18n();

useHead(() => ({
  // Not useLocaleHead: it warns on every request without a baseUrl.
  htmlAttrs: { lang: localeProperties.value.language },
  bodyAttrs: { class: "e2e" },
}));
useSeoMeta({ title: () => t("meta.title"), description: () => t("meta.description") });
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <NuxtPage />
</template>
