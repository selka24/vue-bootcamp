<script setup lang="ts">
import { ref } from "vue";
const show = ref(false);
</script>

<template>
  <div class="wrapper">
    <div class="!mb-64">
      <button @click="show = !show">Toggle</button>
    </div>

    <div>
      <Transition name="fade">
        <div v-if="show">Fade In</div>
      </Transition>
    </div>

    <div>
      <Transition name="from-to-top">
        <div v-if="show">In From Top and Out To Top</div>
      </Transition>
    </div>

    <div>
      <Transition name="from-top-to-bottom">
        <div v-if="show">In From Top and Out to Bottom</div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.from-to-top-enter-active,
.from-to-top-leave-active {
  transition: all 0.5s;
}

.from-to-top-enter-from,
.from-to-top-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.wrapper {
  font-size: 20px;
  padding: 50px;
}

.from-top-to-bottom-enter-active,
.from-top-to-bottom-leave-active {
  transition: all 0.5s;
}

.from-top-to-bottom-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}

.from-top-to-bottom-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>
