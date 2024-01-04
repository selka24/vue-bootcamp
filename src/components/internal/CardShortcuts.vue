<script setup lang="ts">
const cmdButton = () => {
  if (navigator.platform.indexOf("Win") !== -1) return "⊞";
  if (navigator.platform.indexOf("Mac") !== -1) return "⌘";
  return "meta";
};
</script>
<template>
  <div class="shortcuts">
    <div><kbd class="kbd">esc</kbd> - Cancel</div>

    <div>
      <kbd class="kbd">{{ cmdButton() }}</kbd>
      +
      <kbd class="kbd">e</kbd> - Edit
    </div>
  </div>
</template>
<style scoped>
.shortcuts {
  @apply absolute bottom-0 flex gap-3 items-center pb-4;
}

.shortcuts > div {
  @apply bg-gray-200 dark:bg-gray-700 dark:text-white px-2 py-1 rounded;
}
</style>
