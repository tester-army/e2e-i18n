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
  <div class="border border-e2e-neutral-800 bg-e2e-neutral-800/40">
    <div v-if="sent" data-testid="sent" class="flex flex-col items-start gap-e2e-2 p-e2e-3 md:p-e2e-4">
      <h2 ref="sentHeading" tabindex="-1" class="type-h3 text-e2e-off-white outline-hidden">
        {{ $t("sent.title") }}
      </h2>
      <p class="type-body-m text-e2e-neutral-300">{{ $t("sent.body", sent) }}</p>
      <E2eButton variant="outline" class="mt-e2e-1" @click="writeAnother">{{ $t("sent.again") }}</E2eButton>
    </div>

    <form v-else data-testid="contact-form" novalidate @submit.prevent="submit">
      <div class="grid gap-e2e-3 p-e2e-3 md:grid-cols-3 md:p-e2e-4">
        <FormField id="name" v-slot="control" :label="$t('form.name')" :error="errorFor('name')">
          <input
            v-bind="control"
            ref="nameInput"
            v-model="form.name"
            type="text"
            autocomplete="name"
            required
            :placeholder="$t('form.namePlaceholder')"
            :class="[FIELD, 'h-e2e-6']"
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
            :class="[FIELD, 'h-e2e-6']"
          />
        </FormField>

        <FormField id="topic" v-slot="control" :label="$t('form.topic')">
          <div class="relative">
            <select
              v-bind="control"
              v-model="form.topic"
              :class="[FIELD, 'h-e2e-6 appearance-none rounded-none pe-e2e-6']"
            >
              <option v-for="topic in TOPICS" :key="topic" :value="topic">{{ $t(`form.topics.${topic}`) }}</option>
            </select>
            <span class="pointer-events-none absolute inset-e-e2e-2 top-1/2 -translate-y-1/2 text-e2e-neutral-300">
              <DottedIcon name="chevron-down" />
            </span>
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
              :class="[FIELD, 'block min-h-24 resize-y py-e2e-1']"
            />
          </FormField>
        </div>

        <div class="flex flex-col justify-end gap-e2e-2">
          <p class="type-body-s text-e2e-neutral-500">{{ $t("form.note") }}</p>
          <E2eButton variant="light" type="submit" data-testid="send" class="w-full" :disabled="!hydrated">
            {{ $t("form.send") }}
          </E2eButton>
        </div>
      </div>
    </form>
  </div>
</template>
