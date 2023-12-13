<script setup>
import { ref } from "vue";
const msg = ref("Hello Bootcampers!");
</script>
<template>
  <div class="p-10">
    <input class="input" type="text" v-model="msg" />
    <div class="text-4xl">{{ msg }}</div>
  </div>
</template>
