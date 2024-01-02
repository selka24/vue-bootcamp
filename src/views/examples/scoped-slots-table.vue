<script setup lang="ts">
import MyTable from "@/components/examples/MyTable.vue";
import { ref } from "vue";

const tableData = ref({
  columns: [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
  ],
  items: [
    { name: "John", age: 20 },
    { name: "Jane", age: 24 },
    { name: "Susan", age: 16 },
    { name: "Chris", age: 55 },
    { name: "Dan", age: 40 },
  ],
});
</script>
<template>
  <MyTable :items="tableData.items" :columns="tableData.columns">
    <template #item-name="{ item }">
      <strong>{{ item.name }}</strong>
    </template>
  </MyTable>
</template>
