<script setup lang="ts">
import { onMounted, ref } from "vue";
const el = ref<HTMLElement>();

onMounted(() => {
  if (!el.value) return;
  console.log(el.value.innerText);
});
</script>
<template>
  <div>
    <p ref="el">Hello World</p>
  </div>
</template>
