<script setup>
import BadButton from "@/components/examples/BadButton.vue";
import GoodButton from "@/components/examples/GoodButton.vue";
</script>
<template>
  <div class="p-10">
    <br /><br />
    <BadButton label="Click Me" bold-first-word icon="mdi:home"></BadButton>

    <br /><br />

    <GoodButton>
      <Icon icon="mdi:home"></Icon>
      <span><strong>Click</strong> Me</span>
    </GoodButton>
  </div>
</template>
