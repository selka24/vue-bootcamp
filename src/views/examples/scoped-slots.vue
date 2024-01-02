<script setup>
import ListWithSlots from "@/components/examples/ListWithSlots.vue";
</script>
<template>
  <ListWithSlots :items="['Vue', 'React', 'Svelte']">
    <template #item="{ item, index }"> {{ item }} ({{ index }}) </template>
  </ListWithSlots>
</template>
