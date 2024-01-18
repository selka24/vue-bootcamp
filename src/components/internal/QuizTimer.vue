<script setup lang="ts">
import type { TStatus } from "@/types";
import { useNow, refAutoReset } from "@vueuse/core";

import { toRefs, computed, watch, ref } from "vue";

const props = withDefaults(
  defineProps<{
    status: TStatus;
    seconds?: number;
    beginAt?: Date | null;
  }>(),
  {
    seconds: 10,
  },
);

const emit = defineEmits(["timeup"]);

const now = useNow();

const timeLeft = computed(() => {
  if (!props.beginAt || !props.beginAt.getTime) return 0;
  return (
    (props.beginAt.getTime() + props.seconds * 1000 - now.value.getTime()) /
    1000
  );
});

const show = computed(() => timeLeft.value > 0);

const stopped = ref(true);
watch(timeLeft, (tl) => {
  if (tl <= 0 && !stopped.value) {
    emit("timeup");
    stopped.value = true;
  }
});

const { status, seconds } = toRefs(props);
watch(status, (value) => {
  if (value === "Answering") {
    stopped.value = false;
  } else {
    stopped.value = true;
  }
});

const convertSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
</script>
<template>
  <div
    :class="{
      invisible: status !== 'Answering' || !show,
    }"
    class="mb-2"
  >
    <div class="relative h-2 bg-gray-300 rounded dark:bg-gray-700">
      <div
        class="absolute top-0 left-0 h-2 rounded bg-primary"
        :style="{
          width: `${(timeLeft / seconds) * 100}%`,
        }"
      ></div>
    </div>
    <span class="flex items-center gap-2 mt-2 text-sm">
      <Icon icon="fa:clock-o"></Icon>
      {{ convertSecondsToMinutes(Math.ceil(timeLeft)) }} minutes left</span
    >
  </div>
</template>
