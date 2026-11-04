<script setup lang="ts">
const { variant = "primary", type = "button" } = defineProps<{
  variant?: "primary" | "outline" | "light";
  type?: "button" | "submit" | "reset";
}>();
</script>

<template>
  <button :type="type" :class="['e2e-button', `e2e-button-${variant}`]">
    <slot />
  </button>
</template>
