<script setup lang="ts">
import type { TStatus } from "@/types";
import { useNow } from "@vueuse/core";

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

const stopped = ref(false);
watch(timeLeft, (tl) => {
  if (tl <= 0 && !stopped.value) {
    emit("timeup");
    stopped.value = true;
  }
});

const { status, seconds, beginAt } = toRefs(props);
watch(status, (value) => {
  if (value === "NotStarted") stopped.value = false;
});
watch(beginAt, (value) => {
  if (value) stopped.value = false;
});
</script>
<template>
  <div class="w-[800px]">
    <div
      :class="{
        hidden: status !== 'Answering' || !show,
      }"
    >
      <div
        class="h-2 transition-all duration-1000 ease-linear rounded bg-primary"
        :style="{
          width: `${(timeLeft / seconds) * 100 - seconds / 10}%`,
        }"
      ></div>
      <span class="text-sm">{{ Math.ceil(timeLeft) }} seconds left</span>
    </div>
  </div>
</template>
