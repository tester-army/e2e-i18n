<script setup lang="ts">
const E2E_DOCS_URL = "https://e2e.tester.army/docs";
</script>

<template>
  <header class="px-6 pt-6 sm:px-10">
    <div class="mx-auto flex h-9 max-w-300 items-center justify-between">
      <NuxtLink to="/" aria-label="Home" class="flex items-center gap-2.5 sm:gap-3">
        <img src="/e2e/logo-white.png" alt="" width="168" height="168" class="size-8 object-contain" />
        <span aria-hidden="true" class="type-brand-slash text-e2e-text-primary">/</span>
        <span class="type-brand text-e2e-text-primary">e2e</span>
      </NuxtLink>
      <a
        :href="E2E_DOCS_URL"
        target="_blank"
        rel="noreferrer"
        class="type-nav text-e2e-text-soft transition-colors hover:text-e2e-text-bright motion-reduce:transition-none"
      >
        {{ $t("header.docs") }}
      </a>
    </div>
  </header>
</template>
