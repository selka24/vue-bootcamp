<script setup>
import SiteLayout from "@/components/examples/SiteLayout.vue";
</script>
<template>
  <!-- Parent.vue-->
  <SiteLayout>
    <template v-slot:header> Hello Header </template>

    <template #default>Hello default</template>

    <template #footer> Hello Header </template>
  </SiteLayout>
</template>
