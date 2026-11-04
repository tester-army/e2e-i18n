<script setup lang="ts">
// Grids from the e2e design system's dotted icons: each X is a 2px dot on a 3px pitch. Never resize one with CSS.
const ICONS = {
  "chevron-down": [".......", ".......", "X.....X", ".X...X.", "..X.X..", "...X...", "......."],
} as const;

const { name } = defineProps<{ name: keyof typeof ICONS }>();
const rows = computed(() => ICONS[name]);
const size = computed(() => rows.value.length * 3 - 1);
const path = computed(() =>
  rows.value
    .flatMap((row, y) => [...row].map((cell, x) => (cell === "X" ? `M${x * 3} ${y * 3}h2v2h-2z` : "")))
    .join(""),
);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    fill="currentColor"
    shape-rendering="crispEdges"
    aria-hidden="true"
    class="shrink-0"
  >
    <path :d="path" />
  </svg>
</template>
