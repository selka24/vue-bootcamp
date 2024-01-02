<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
});

const classes = computed(() => {
  return {
    "btn-primary": props.type === "primary",
    "btn-secondary": props.type === "secondary",
    "btn-success": props.type === "success",
    "btn-danger": props.type === "danger",
    "btn-warning": props.type === "warning",
    "btn-info": props.type === "info",
  };
});
</script>
<template>
  <button class="btn" :class="classes">
    <slot></slot>
  </button>
</template>
