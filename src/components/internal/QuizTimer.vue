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

const { status, seconds, beginAt } = toRefs(props);
watch(status, (value) => {
  if (value === "Answering") {
    stopped.value = false;
  } else {
    stopped.value = true;
  }
});

const outOfTimeMessage = refAutoReset(false, 3000);
watch(stopped, () => {
  if (stopped.value) {
    outOfTimeMessage.value = true;
  }
});
</script>
<template>
  <div class="relative">
    <div
      :class="{
        invisible: status !== 'Answering' || !show,
      }"
    >
      <div
        class="h-2 rounded bg-primary"
        :style="{
          width: `${(timeLeft / seconds) * 100 - seconds / 10}%`,
        }"
      ></div>
      <span class="text-sm">{{ Math.ceil(timeLeft) }} seconds left</span>
    </div>
    <div
      v-if="outOfTimeMessage"
      class="absolute top-0 flex items-center gap-2 text-red-500"
    >
      <Icon icon="fa:clock-o" />
      Out of Time!
    </div>
  </div>
</template>
