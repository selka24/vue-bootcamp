<script setup lang="ts">
import { defineExpose, ref } from "vue";
const active = ref(false);

function toggleActive() {
  active.value = !active.value;
}
defineExpose({
  toggleActive,
});
</script>
<template>
  <div>{{ active }}</div>
</template>
