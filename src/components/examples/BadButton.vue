<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "fa fa-star",
  },
  boldFirstWord: {
    type: Boolean,
    default: false,
  },
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

const _label = computed(() => {
  if (props.boldFirstWord) {
    const words = props.label.split(" ");

    return `<strong>${words[0]}</strong> ${words.slice(1).join(" ")}`;
  }

  return props.label;
});
</script>
<template>
  <button class="btn" :class="classes">
    <Icon :icon="icon"></Icon>
    <span v-html="_label"></span>
  </button>
</template>
