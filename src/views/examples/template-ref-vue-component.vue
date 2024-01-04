<script setup lang="ts">
import { ref } from "vue";
import ComponentWithExposedMethod from "@/components/examples/ComponentWithExposedMethod.vue";
const component = ref();
</script>
<template>
  <ComponentWithExposedMethod ref="component" />
  <button @click="component.toggleActive()">Toggle Active</button>
</template>
