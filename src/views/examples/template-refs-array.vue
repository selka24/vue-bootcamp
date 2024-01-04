<script setup>
import { ref, onMounted } from "vue";
const elements = ref([]);

onMounted(() => {
  elements.value.forEach((el) => {
    console.log(el);
  });
});
</script>

<template>
  <div v-for="n in 10" :key="n" ref="elements">
    {{ n }}
  </div>
</template>
