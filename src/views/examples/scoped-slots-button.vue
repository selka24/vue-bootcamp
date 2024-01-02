<script setup>
import ButtonWithData from "@/components/examples/ButtonWithData.vue";
</script>
<template>
  <ButtonWithData #="{ data, otherData }">
    <span>{{ data }}</span>
    <span>{{ otherData }}</span>
  </ButtonWithData>
</template>
