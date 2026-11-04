<template>
  <main class="pt-e2e-6 pb-e2e-4 md:pt-e2e-8">
    <div class="mx-auto flex w-full max-w-312 flex-col gap-e2e-3 px-e2e-3 md:px-e2e-6">
      <div class="flex flex-col">
        <div class="flex flex-wrap items-center justify-between gap-x-e2e-3 gap-y-e2e-1">
          <p class="type-caption text-e2e-mint">{{ $t("intro.eyebrow") }}</p>
          <LanguageStrip />
        </div>
        <h1 class="mt-e2e-2 type-h1 text-balance text-e2e-off-white">{{ $t("intro.heading") }}</h1>
        <p class="mt-e2e-3 type-body-l text-e2e-neutral-400">{{ $t("intro.body") }}</p>
      </div>
      <ContactForm />
      <!-- Passed in, not translated: vue-i18n reads "@" as a linked message. -->
      <p class="type-body-s text-e2e-neutral-500">{{ $t("footnote", { stack: "Nuxt + @nuxtjs/i18n" }) }}</p>
    </div>
  </main>
</template>
