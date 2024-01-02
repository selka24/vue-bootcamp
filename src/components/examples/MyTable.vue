<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="JSON.stringify(item)">
        <td v-for="column in columns" :key="column.key">
          <slot :name="`item-${column.key}`" :item="item">
            {{ item[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
