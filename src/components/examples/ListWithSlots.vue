<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <!-- ListWithSlots.vue -->
  <ul class="list-disc list-inside">
    <li v-for="(item, index) in items" :key="item.toString()">
      <slot name="item" :item="item" :index="index">{{ item }}</slot>
    </li>
  </ul>
</template>
