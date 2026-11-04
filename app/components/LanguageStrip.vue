<script setup lang="ts">
// Not a switcher: it shows the language the browser asked for.
const { locale, locales } = useI18n();
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-e2e-2 gap-y-e2e-1">
    <p id="languages-label" class="type-caption text-e2e-neutral-500">{{ $t("languages.label") }}</p>
    <ul aria-labelledby="languages-label" class="flex gap-e2e-half">
      <li
        v-for="language in locales"
        :key="language.code"
        :data-testid="`language-${language.code}`"
        :aria-current="language.code === locale ? 'true' : undefined"
        :title="language.name"
        class="e2e-tag border border-e2e-neutral-700 text-e2e-neutral-400 aria-[current=true]:border-e2e-off-white aria-[current=true]:bg-e2e-off-white aria-[current=true]:text-e2e-neutral-800"
      >
        {{ language.code }}
      </li>
    </ul>
  </div>
</template>
