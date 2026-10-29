<script setup lang="ts">
// The error's id is `${id}-error`, for the control's aria-describedby.
defineProps<{ id: string; label: string; error?: string }>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="type-label-xs text-e2e-text-faint">{{ label }}</label>
    <slot />
    <p v-if="error" :id="`${id}-error`" class="type-caption text-e2e-accent-orange">{{ error }}</p>
  </div>
</template>
