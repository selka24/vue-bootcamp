<script setup lang="ts">
import { ref, computed } from "vue";
import QuizQuestion from "@/components/internal/QuizQuestion.vue";
import { useSupabase } from "@/composables/useSupabase";
import QuizTimer from "@/components/internal/QuizTimer.vue";
const supabase = useSupabase();

type TStatus =
  | "NotStarted"
  | "BeingRead"
  | "Answering"
  | "TimesUp"
  | "ShowingAnswer"
  | "Finished";

const status = ref<TStatus>("NotStarted");

interface Question {
  id: number;
  content: string;
  active: boolean;
}

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

// Listen to inserts
supabase
  .channel("activeQuestion")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "activeQuestion" },
    (payload) => {
      status.value = payload.new.status;
      currentQuestionId.value = payload.new.question;
    },
  )
  .subscribe();

function handleSubmit() {
  // submit answer to supabase
}
</script>

<template>
  <div class="viewport-center">
    <h1 v-if="status === 'NotStarted'">Waiting for Quiz to Start</h1>
    <div v-else-if="currentQuestion?.content">
      <QuizTimer :status="status" />
      <QuizQuestion
        :content="currentQuestion?.content"
        @submit="handleSubmit"
        :show-correct-answer="status === 'ShowingAnswer'"
        :disabled="status !== 'Answering'"
      />
    </div>
  </div>
</template>
