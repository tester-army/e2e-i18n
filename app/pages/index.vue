<template>
  <main class="px-6 pt-12 pb-8 sm:px-10 sm:pt-24">
    <div class="mx-auto flex w-full max-w-300 flex-col gap-6">
      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p class="type-eyebrow text-e2e-text-faint">{{ $t("intro.eyebrow") }}</p>
          <LanguageStrip />
        </div>
        <h1 class="type-h1 text-balance text-e2e-text-primary">{{ $t("intro.heading") }}</h1>
        <p class="type-body text-e2e-text-secondary">{{ $t("intro.body") }}</p>
      </div>
      <ContactForm />
      <!-- Passed in, not translated: vue-i18n reads "@" as a linked message. -->
      <p class="type-code-s text-e2e-text-faint">{{ $t("footnote", { stack: "Nuxt + @nuxtjs/i18n" }) }}</p>
    </div>
  </main>
</template>
