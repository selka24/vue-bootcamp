<script setup>
import { ref } from "vue";
const msg = ref("Hello Bootcampers!");
</script>
<template>
  <div class="viewport-center">
    <div>
      <input class="input" type="text" v-model="msg" />
      <div class="text-4xl">{{ msg }}</div>
    </div>
  </div>
</template>
