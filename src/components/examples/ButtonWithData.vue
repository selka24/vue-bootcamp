<!-- MyButton.vue-->
<script setup>
import { ref } from "vue";
const buttonData = ref("some random data");
</script>

<template>
  <button class="btn">
    <slot :data="buttonData" otherData="other data"></slot>
  </button>
</template>
