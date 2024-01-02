<script setup>
import { ref } from "vue";
import SiteLayout from "@/components/examples/SiteLayout.vue";

const headerSlotName = ref("header");
const footerSlotName = ref("footer");
</script>
<template>
  <!-- Parent.vue-->
  <SiteLayout>
    <template v-slot:[headerSlotName]> Hello Header </template>

    <template #default>Hello default</template>

    <template #[footerSlotName]> Hello Footer </template>
  </SiteLayout>
</template>
