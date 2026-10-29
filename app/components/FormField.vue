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
  <div class="flex flex-col gap-2">
    <label :for="id" class="type-label-xs text-e2e-text-faint">{{ label }}</label>
    <slot v-bind="control" />
    <p v-if="error" :id="`${id}-error`" class="type-caption text-e2e-accent-orange">{{ error }}</p>
  </div>
</template>
