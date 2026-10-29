<script setup lang="ts">
const TOPICS = ["question", "billing", "bug"] as const;
const REQUIRED = ["name", "email", "message"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const blankForm = () => ({ name: "", email: "", topic: "question" as (typeof TOPICS)[number], message: "" });
const form = reactive(blankForm());
const showErrors = ref(false);
const sent = ref<{ name: string; email: string } | null>(null);
// Send is off until hydration, so an early click can't submit the form natively.
const hydrated = ref(false);
onMounted(() => (hydrated.value = true));

const inputs = {
  name: useTemplateRef<HTMLInputElement>("nameInput"),
  email: useTemplateRef<HTMLInputElement>("emailInput"),
  message: useTemplateRef<HTMLTextAreaElement>("messageInput"),
};
const sentHeading = useTemplateRef<HTMLHeadingElement>("sentHeading");

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

// Focus moves after the DOM updates, so a screen reader hears the field as invalid, then the thank-you heading.
async function submit() {
  showErrors.value = true;
  const invalid = REQUIRED.find((field) => errors.value[field]);
  if (invalid) {
    await nextTick();
    inputs[invalid].value?.focus();
    return;
  }
  sent.value = { name: form.name.trim(), email: form.email.trim() };
  await nextTick();
  sentHeading.value?.focus();
}

async function writeAnother() {
  Object.assign(form, blankForm());
  showErrors.value = false;
  sent.value = null;
  await nextTick();
  inputs.name.value?.focus();
}
</script>

<template>
  <div class="border border-e2e-hairline-strong bg-e2e-panel">
    <div v-if="sent" data-testid="sent" class="flex flex-col items-start gap-4 p-6 sm:p-8">
      <h2 ref="sentHeading" tabindex="-1" class="type-h3-display text-e2e-text-bright outline-hidden">
        {{ $t("sent.title") }}
      </h2>
      <p class="type-body text-e2e-text-secondary">{{ $t("sent.body", sent) }}</p>
      <OutlineButton class="mt-2 sm:w-auto" @click="writeAnother">{{ $t("sent.again") }}</OutlineButton>
    </div>

    <form v-else data-testid="contact-form" novalidate @submit.prevent="submit">
      <div class="grid gap-5 p-6 sm:p-8 md:grid-cols-3">
        <FormField id="name" v-slot="control" :label="$t('form.name')" :error="errorFor('name')">
          <input
            v-bind="control"
            ref="nameInput"
            v-model="form.name"
            type="text"
            autocomplete="name"
            required
            :placeholder="$t('form.namePlaceholder')"
            :class="[FIELD, 'h-11']"
          />
        </FormField>

        <FormField id="email" v-slot="control" :label="$t('form.email')" :error="errorFor('email')">
          <input
            v-bind="control"
            ref="emailInput"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            :placeholder="$t('form.emailPlaceholder')"
            :class="[FIELD, 'h-11']"
          />
        </FormField>

        <FormField id="topic" v-slot="control" :label="$t('form.topic')">
          <div class="relative">
            <select v-bind="control" v-model="form.topic" :class="[FIELD, 'h-11 appearance-none pe-10']">
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
          <FormField id="message" v-slot="control" :label="$t('form.message')" :error="errorFor('message')">
            <textarea
              v-bind="control"
              ref="messageInput"
              v-model="form.message"
              rows="3"
              required
              :placeholder="$t('form.messagePlaceholder')"
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
