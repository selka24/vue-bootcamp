<script setup>
import { ref, onUnmounted } from "vue";

const numOfSlides = 10;
const activeSlide = ref(1);

function rotateSlide() {
  if (activeSlide.value === numOfSlides) {
    activeSlide.value = 1;
  } else {
    activeSlide.value++;
  }
}

const interval = setInterval(rotateSlide, 3000);

onUnmounted(() => {
  clearInterval(interval);
});

const imgHeight = ref(0);
</script>
<template>
  <div class="flex items-center justify-center h-screen px-5">
    <div
      class="slides-wrapper"
      :style="{ height: imgHeight ? `${imgHeight}px` : 'auto' }"
    >
      <Transition>
        <img
          :key="activeSlide"
          :src="`https://i.pravatar.cc/1200?img=${activeSlide}`"
          class="slide"
          @load="imgHeight = $event.target.clientHeight"
        />
      </Transition>
    </div>
  </div>

  <!-- Preload the next image so it's ready to display -->
  <div v-if="activeSlide + 1 < 10" class="hidden cursor-none">
    <img :src="`https://i.pravatar.cc/1200?img=${activeSlide + 1}`" />
  </div>
</template>

<style scoped>
.slide {
  @apply object-cover w-full transition-all duration-700 block;
}
.slides-wrapper {
  @apply flex overflow-hidden rounded w-[850px] max-w-full relative;
}
.v-enter-active,
.v-leave-active {
  @apply transition-transform duration-700 absolute top-0 left-0 right-0 bottom-0;
}
.v-enter-from {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
}
</style>
