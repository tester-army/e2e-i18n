<script setup lang="ts">
const { id, error = "" } = defineProps<{ id: string; label: string; error?: string }>();

// What the control binds (v-slot), so it points at its label and its error.
const control = computed(() => ({
  id,
  "aria-invalid": error ? ("true" as const) : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
}));
</script>

<template>
  <div class="flex flex-col gap-e2e-1">
    <label :for="id" class="type-caption text-e2e-neutral-400">{{ label }}</label>
    <slot v-bind="control" />
    <p v-if="error" :id="`${id}-error`" class="type-body-s text-e2e-mint">{{ error }}</p>
  </div>
</template>
