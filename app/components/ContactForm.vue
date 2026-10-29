<script setup lang="ts">
const TOPICS = ["question", "billing", "bug"] as const;
const REQUIRED = ["name", "email", "message"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = reactive({ name: "", email: "", topic: "question", message: "" });
const showErrors = ref(false);
const sent = ref<{ name: string; email: string } | null>(null);
// Send is off until hydration, so an early click can't submit the form natively.
const hydrated = ref(false);
onMounted(() => (hydrated.value = true));

// Keys, not text, so the errors follow the page's language.
const errors = computed(() => ({
  name: form.name.trim() ? undefined : "errors.name",
  email: EMAIL.test(form.email.trim()) ? undefined : "errors.email",
  message: form.message.trim() ? undefined : "errors.message",
}));
const { t } = useI18n();
function errorFor(field: (typeof REQUIRED)[number]) {
  const key = showErrors.value ? errors.value[field] : undefined;
  return key && t(key);
}

function submit() {
  showErrors.value = true;
  const invalid = REQUIRED.find((field) => errors.value[field]);
  if (invalid) {
    document.getElementById(invalid)?.focus();
    return;
  }
  sent.value = { name: form.name.trim(), email: form.email.trim() };
}

async function writeAnother() {
  Object.assign(form, { name: "", email: "", topic: "question", message: "" });
  showErrors.value = false;
  sent.value = null;
  await nextTick();
  document.getElementById("name")?.focus();
}
</script>

<template>
  <div aria-live="polite" class="border border-e2e-hairline-strong bg-e2e-panel">
    <div v-if="sent" data-testid="sent" class="flex flex-col items-start gap-4 p-6 sm:p-8">
      <h2 class="type-h3-display text-e2e-text-bright">{{ $t("sent.title") }}</h2>
      <p class="type-body text-e2e-text-secondary">{{ $t("sent.body", sent) }}</p>
      <OutlineButton class="mt-2 sm:w-auto" @click="writeAnother">{{ $t("sent.again") }}</OutlineButton>
    </div>

    <form v-else data-testid="contact-form" novalidate @submit.prevent="submit">
      <div class="grid gap-5 p-6 sm:p-8 md:grid-cols-3">
        <FormField id="name" :label="$t('form.name')" :error="errorFor('name')">
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            :placeholder="$t('form.namePlaceholder')"
            :aria-invalid="errorFor('name') ? 'true' : undefined"
            :aria-describedby="errorFor('name') ? 'name-error' : undefined"
            :class="[FIELD, 'h-11']"
          />
        </FormField>

        <FormField id="email" :label="$t('form.email')" :error="errorFor('email')">
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            :placeholder="$t('form.emailPlaceholder')"
            :aria-invalid="errorFor('email') ? 'true' : undefined"
            :aria-describedby="errorFor('email') ? 'email-error' : undefined"
            :class="[FIELD, 'h-11']"
          />
        </FormField>

        <FormField id="topic" :label="$t('form.topic')">
          <div class="relative">
            <select id="topic" v-model="form.topic" :class="[FIELD, 'h-11 appearance-none pe-10']">
              <option v-for="topic in TOPICS" :key="topic" :value="topic">{{ $t(`form.topics.${topic}`) }}</option>
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              class="pointer-events-none absolute inset-e-4 top-1/2 size-3.5 -translate-y-1/2 text-e2e-text-faint"
            >
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>
        </FormField>

        <div class="md:col-span-2">
          <FormField id="message" :label="$t('form.message')" :error="errorFor('message')">
            <textarea
              id="message"
              v-model="form.message"
              rows="3"
              :placeholder="$t('form.messagePlaceholder')"
              :aria-invalid="errorFor('message') ? 'true' : undefined"
              :aria-describedby="errorFor('message') ? 'message-error' : undefined"
              :class="[FIELD, 'min-h-24 resize-y py-3']"
            />
          </FormField>
        </div>

        <div class="flex flex-col justify-end gap-4 md:pb-px">
          <p class="type-caption text-e2e-text-faint">{{ $t("form.note") }}</p>
          <LightButton type="submit" data-testid="send" :disabled="!hydrated">{{ $t("form.send") }}</LightButton>
        </div>
      </div>
    </form>
  </div>
</template>
