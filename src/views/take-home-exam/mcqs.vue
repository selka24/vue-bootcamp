<script setup lang="ts">
import { ref, computed } from "vue";
import QuizQuestion from "@/components/internal/QuizQuestion.vue";
import quizQuestions from "@/assets/take-home-quiz/mcqs.md?raw";
import { useTakeHomeQuiz } from "@/composables/useTakeHomeQuiz";
import { useRouter } from "vue-router";
import type { McqAnswer } from "@/types";

const router = useRouter();

const { status, recordAnswer } = useTakeHomeQuiz();
status.value = "DoingMcqs";

const asArray = quizQuestions
  .split("---")
  .map((q) => q.trim())
  .filter((q) => q);

const currentIndex = ref(0);
const currentQuestion = computed(() => {
  return asArray.at(currentIndex.value);
});

function handleQuestionSubmit(answer: McqAnswer) {
  currentIndex.value++;
  recordAnswer(answer);
  if (currentIndex.value === asArray.length) {
    finishMcqs();
  }
}

function finishMcqs() {
  status.value = "DoingFeatureChallenge";
  router.push("/take-home-exam/feature-challenge");
}
</script>

<template>
  <div class="mt-[60px] p-10 max-w-7xl m-auto relative">
    <QuizQuestion
      v-if="currentQuestion"
      :content="currentQuestion"
      :number="currentIndex + 1"
      @submit="handleQuestionSubmit($event)"
      :btnText="currentIndex === asArray.length - 1 ? 'Submit' : 'Next'"
    >
      <template #message v-if="currentIndex > 0">
        <button
          class="flex items-center justify-center w-full gap-2 text-sm font-bold"
          @click="currentIndex--"
        >
          Previous Question
        </button>
      </template>
    </QuizQuestion>
  </div>
</template>
