<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { ref, computed, watch } from "vue";

const emit = defineEmits(["submit"]);

const props = withDefaults(
  defineProps<{
    content: string;
    btnText?: string;
    showCorrectAnswer?: boolean;
    disabled?: boolean;
    message?: string;
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
  return {
    a: choices[0].replace(/^Correct/, "").trim(),
    b: choices[1].replace(/^Correct/, "").trim(),
    c: choices[2].replace(/^Correct/, "").trim(),
    d: choices[3].replace(/^Correct/, "").trim(),
  };
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

const selected = ref();

watch(
  () => props.content,
  () => {
    selected.value = null;
  },
);
</script>

<template>
  <div class="relative z-50 mt-16">
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
          />
          <vue-markdown :source="choice" :options="options" />
        </label>
      </li>
    </ul>
    <div class="flex items-center justify-between">
      <div>{{ message }}</div>
      <button
        class="w-1/2 btn btn-primary"
        @click="
          emit('submit', {
            answer: selected,
            isCorrect: selected === correctAnswer,
          })
        "
        :disabled="disabled"
      >
        {{ props.btnText }}
      </button>
    </div>
  </div>
</template>

<style>
.prose {
  max-width: 100%;
}
</style>
