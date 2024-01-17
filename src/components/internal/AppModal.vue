<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

defineEmits(["close"]);
</script>
<template>
  <div v-if="open">
    <div
      @click="() => $emit('close')"
      class="fixed top-0 bottom-0 left-0 right-0 bg-gray-900 z-[9999999999] opacity-80"
    ></div>
    <div
      class="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-5 bg-base-200 rounded-lg w-1/3 z-[99999999991]"
    >
      <slot></slot>
    </div>
  </div>
</template>
