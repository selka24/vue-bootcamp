<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useSupabase } from "@/composables/useSupabase";
import QuizQuestion from "@/components/internal/QuizQuestion.vue";
import type { TStatus, Question } from "@/types";
import QuizTimer from "@/components/internal/QuizTimer.vue";

const supabase = useSupabase();

const status = ref<TStatus>("NotStarted");

// questions
const currentQuestionId = ref(1);
const questions = ref<Question[]>();
const currentQuestion = computed(() => {
  return (questions.value || []).find((x) => x.id === currentQuestionId.value);
});

function getAllQuestions() {
  supabase
    .from("questions")
    .select("*")
    .select()
    .then(({ data, error }) => {
      if (error) {
        alert(error.message);
      } else {
        questions.value = data;
      }
    });
}

getAllQuestions();

function handleSubmit() {
  const actions = {
    NotStarted: () => {
      status.value = "BeingRead";
    },
    BeingRead: () => {
      status.value = "Answering";
    },
    Answering: () => {
      status.value = "TimesUp";
    },
    TimesUp: () => {
      status.value = "ShowingAnswer";
    },
    ShowingAnswer: () => {
      status.value = "BeingRead";
      currentQuestionId.value++;
      if (currentQuestionId.value > (questions.value || []).length) {
        status.value = "Finished";
      }
    },
    Finished: () => {
      status.value = "NotStarted";
      currentQuestionId.value = 1;
    },
  };
  actions[status.value]();
}

const buttonText = computed(() => {
  return {
    NotStarted: "Start",
    BeingRead: "Start Timer",
    Answering: "Stop Timer",
    TimesUp: "Reveal Answer",
    ShowingAnswer: "Next Question",
    Finished: "Finished",
  }[status.value];
});

watch(status, async () => {
  await supabase
    .from("activeQuestion")
    .update({ status: status.value, question: currentQuestionId.value })
    .eq("id", 1);
});
</script>
<template>
  <div class="viewport-center">
    <div v-if="status === 'NotStarted'" class="text-center">
      <h1 class="mb-10 text-9xl">Live Quiz</h1>
      <button class="w-72 btn btn-primary btn-lg" @click="handleSubmit">
        Start
      </button>
    </div>
    <div v-if="status !== 'Finished' && status !== 'NotStarted'">
      <div class="w-[960px]">
        <QuizTimer :status="status" @timeup="handleSubmit" />

        <!-- Times Up -->
        <div v-if="status === 'TimesUp'">
          <h1 class="text-5xl">Time's Up!</h1>
        </div>

        <!-- The Correct Answer Is -->
        <div v-if="status === 'ShowingAnswer'">
          <h1 class="text-5xl">The Correct Answer Is</h1>
        </div>

        <!-- Quiz Question -->
        <QuizQuestion
          v-if="currentQuestion?.content"
          :content="currentQuestion?.content"
          :btn-text="buttonText"
          @submit="handleSubmit"
          :show-correct-answer="status === 'ShowingAnswer'"
        />
      </div>
    </div>

    <!-- Finished -->
    <div v-if="status === 'Finished'" class="text-center">
      <h1 class="mb-10 text-9xl">Finished!</h1>
      <button class="w-72 btn btn-primary btn-lg" @click="handleSubmit">
        Restart
      </button>
    </div>
  </div>
</template>
