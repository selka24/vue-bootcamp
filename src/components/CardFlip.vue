<script setup>
import { onMounted, onUnmounted } from "vue";

defineProps({
  flipped: Boolean,
});

const emit = defineEmits(["flip"]);

function keyboardShortcuts(e) {
  if (e.key === "Escape") {
    e.preventDefault();
    emit("flip", { flipped: false });
  }
  if (e.key === "e" && e.metaKey) {
    e.preventDefault();
    emit("flip", { flipped: true });
  }
}

onMounted(() => {
  window.addEventListener("keydown", keyboardShortcuts);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keyboardShortcuts);
});
</script>
<template>
  <Transition>
    <slot></slot>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease;
  transform-style: preserve-3d;
}

.v-enter-active {
  transition: all 0.25s ease 0.25s;
  transform-style: preserve-3d;
}

.v-enter-from,
.v-leave-to {
  /* opacity: 0; */
  transform: rotateY(90deg);
  backface-visibility: hidden;
  position: absolute;
}
</style>
