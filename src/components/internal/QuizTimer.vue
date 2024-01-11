<script setup lang="ts">
import type { TStatus } from "@/types";
import { toRefs, ref, onUnmounted, watch } from "vue";
const props = withDefaults(
  defineProps<{
    status: TStatus;
    seconds?: number;
  }>(),
  {
    seconds: 20,
  },
);

const emit = defineEmits(["timeup"]);

const { status, seconds } = toRefs(props);

const timer = ref(seconds.value);

let interval: any;
function startTimer() {
  interval = setInterval(() => {
    timer.value--;
    if (timer.value === 0) {
      clearInterval(interval);
      emit("timeup");
    }
  }, 1000);
}

onUnmounted(() => {
  clearInterval(interval);
});

watch(
  () => props.status,
  () => {
    timer.value = seconds.value;
    if (props.status === "Answering") {
      startTimer();
    }
  },
);
</script>
<template>
  <div class="w-[960px]">
    <div
      :class="{
        hidden: status !== 'Answering',
      }"
    >
      <div
        class="h-2 transition-all duration-1000 ease-linear rounded bg-primary"
        :style="{
          width: `${(timer / seconds) * 100}%`,
        }"
      ></div>
      <span class="text-sm">{{ timer }} seconds left</span>
    </div>
  </div>
</template>
