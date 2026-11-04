<script setup lang="ts">
const E2E_DOCS_URL = "https://e2e.tester.army/docs";
</script>

<template>
  <header class="border-b border-e2e-neutral-800">
    <div class="mx-auto flex h-e2e-8 w-full max-w-312 items-center justify-between px-e2e-3 md:px-e2e-6">
      <NuxtLink
        to="/"
        :aria-label="$t('header.home')"
        class="flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-e2e-green"
      >
        <E2eLogo label="" class="h-e2e-3 w-auto" />
      </NuxtLink>
      <a
        :href="E2E_DOCS_URL"
        target="_blank"
        rel="noreferrer"
        :aria-label="$t('header.docs')"
        class="type-caption text-e2e-off-white hover:text-e2e-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-e2e-green"
      >
        [ {{ $t("header.docs") }} ]
      </a>
    </div>
  </header>
</template>
