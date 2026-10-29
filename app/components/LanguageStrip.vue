<script setup lang="ts">
// Not a switcher: it shows the language the browser asked for.
const { locale, locales } = useI18n();
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
    <p id="languages-label" class="type-label-xs text-e2e-text-faint">{{ $t("languages.label") }}</p>
    <ul aria-labelledby="languages-label" class="flex gap-1">
      <li
        v-for="language in locales"
        :key="language.code"
        :data-testid="`language-${language.code}`"
        :aria-current="language.code === locale ? 'true' : undefined"
        :title="language.name"
        class="px-2.5 py-0.5 type-chip text-e2e-text-faint inset-ring-[0.5px] inset-ring-e2e-hairline-strong aria-[current=true]:bg-e2e-button-fill-solid aria-[current=true]:text-e2e-text-on-light aria-[current=true]:inset-ring-0"
      >
        {{ language.code.toUpperCase() }}
      </li>
    </ul>
  </div>
</template>
