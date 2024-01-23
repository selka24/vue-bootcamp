<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { ref, computed, watch } from "vue";
import { refAutoReset } from "@vueuse/core";
import type { McqAnswer } from "@/types";

defineEmits<{
  submit: [payload: McqAnswer];
}>();

const props = withDefaults(
  defineProps<{
    content: string;
    btnText?: string;
    showCorrectAnswer?: boolean;
    disabled?: boolean;
    message?: string;
    messageIcon?: string;
    messageIconClass?: string;
    btnIcon?: string;
    value?: string | null;
    number: number;
    isExample?: boolean;
  }>(),
  {
    btnText: "Submit",
  },
);

const content = computed(() => props.content.split("\n#").map((x) => x.trim()));

const question = computed(() => content.value[0]);
const correctAnswer = computed((): "a" | "b" | "c" | "d" => {
  return ({ 1: "a", 2: "b", 3: "c", 4: "d" }[
    content.value.findIndex((x) => x.startsWith("Correct"))
  ] || "a") as "a" | "b" | "c" | "d";
});

const answerChoices = computed(() => {
  const choices = content.value.slice(1, 5);
  const asObject = {
    a: choices[0].replace(/^Correct/, "").trim(),
    b: choices[1].replace(/^Correct/, "").trim(),
  } as Record<"a" | "b" | "c" | "d", string>;

  if (choices[2]) {
    asObject.c = choices[2].replace(/^Correct/, "").trim();
  }

  if (choices[3]) {
    asObject.d = choices[3].replace(/^Correct/, "").trim();
  }

  return asObject;
});

const options = {
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return "";
  },
};

const selected = ref<string | undefined | null>(props.value);

watch(
  () => props.content,
  () => {
    selected.value = null;
  },
);

const animateMessage = refAutoReset(false, 1000);
watch(
  () => props.message,
  () => {
    animateMessage.value = true;
  },
);

const preventingDoubleClick = refAutoReset(false, 1000);
</script>

<template>
  <div class="relative mb-24">
    <h1 class="text-2xl font-bold">
      <span v-if="isExample">Example</span>
      Question # {{ number }}
    </h1>
    <article class="prose lg:prose-2xl">
      <vue-markdown :source="question" :options="options" />
    </article>
    <ul>
      <li
        v-for="(choice, key) in answerChoices"
        :key="key"
        class="p-5 mb-3 bg-gray-200 rounded dark:bg-gray-800"
        :class="{
          'border border-primary': showCorrectAnswer && key === correctAnswer,
          'opacity-30':
            showCorrectAnswer && key !== correctAnswer && selected !== key,
        }"
      >
        <label class="flex items-center gap-4">
          <Icon
            v-if="showCorrectAnswer && key === correctAnswer"
            icon="fa:check-circle"
            class="text-primary"
          ></Icon>
          <Icon
            v-else-if="
              showCorrectAnswer && selected === key && key !== correctAnswer
            "
            icon="fa:times-circle"
            class="text-red-600"
          ></Icon>
          <input
            v-else
            type="radio"
            v-model="selected"
            :value="key"
            id="answer"
            name="answer"
            :disabled="disabled"
          />
          <vue-markdown :source="choice" :options="options" />
        </label>
      </li>
    </ul>
    <div class="flex items-center justify-between gap-3">
      <div
        class="flex items-center w-1/2 gap-2 px-2 py-3 text-gray-900 bg-gray-200 rounded dark:bg-gray-500 blink selection:bg-transparent marker:bg-transparent"
        :class="{
          invisible: !message && !$slots.message,
          active: animateMessage,
        }"
      >
        <slot name="message">
          <Icon
            :icon="messageIcon || 'fa:lightbulb-o'"
            :class="messageIconClass"
          ></Icon>
          {{ message }}
        </slot>
      </div>
      <button
        class="w-1/2 btn btn-primary"
        :class="{
          'pointer-events-none': preventingDoubleClick,
        }"
        @click="
          $emit('submit', {
            answer: selected,
            isCorrect: selected === correctAnswer,
            questionId: number,
          });
          preventingDoubleClick = true;
        "
        :disabled="disabled"
      >
        <Icon v-if="props.btnIcon" :icon="props.btnIcon" />
        {{ props.btnText }}
      </button>
    </div>
  </div>
</template>

<style>
.prose {
  max-width: 100%;
}

.blink.active {
  animation: blink 0.5s cubic-bezier(0.7, 0, 0.7, 1.5);
}

@keyframes blink {
  0% {
    transform: scale(1);
  }

  33% {
    transform: scale(1.05);
  }
  66% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>
