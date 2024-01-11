<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import QuizQuestion from "@/components/internal/QuizQuestion.vue";
import { useUser } from "@/composables/useUser";
import { useSupabase } from "@/composables/useSupabase";
import QuizTimer from "@/components/internal/QuizTimer.vue";
import type { Question, ActiveQuestion } from "@/types";
const supabase = useSupabase();
const { session } = useUser();

const submitted = ref(false);
const activeQuestion = ref<ActiveQuestion>();
const questions = ref<Question[]>();
const currentQuestion = computed(() => {
  return (questions.value || []).find(
    (x) => x.id === activeQuestion?.value?.question,
  );
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

async function getActiveQuestion() {
  const { data, error } = await supabase
    .from("activeQuestion")
    .select("*")
    .single();
  if (error) {
    alert(error.message);
  } else {
    activeQuestion.value = {
      ...data,
      begin_at: new Date(data.begin_at),
    };
  }
}
getActiveQuestion();

// Listen to inserts
supabase
  .channel("activeQuestion")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "activeQuestion" },
    (payload) => {
      activeQuestion.value = {
        ...payload.new,
        begin_at: new Date(payload.new.begin_at),
      } as ActiveQuestion;
    },
  )
  .subscribe();

watch(
  () => activeQuestion.value?.question,
  () => {
    submitted.value = false;
  },
);

async function handleSubmit(answer: {
  answer: "a" | "b" | "c" | "d";
  isCorrect: boolean;
}) {
  const { data, error } = await supabase
    .from("answers")
    .insert([
      {
        question: activeQuestion.value?.question,
        answer: answer.answer,
        user_id: session.value.user.id,
        isCorrect: answer.isCorrect,
      },
    ])
    .select();

  if (error) {
    alert(error.message);
  } else {
    submitted.value = true;
    nextTick(() => {
      alert("Submitted!");
    });
  }
}

const message = computed(() => {
  return {
    NotStarted: "",
    BeingRead: "Listen to the question from the instructor",
    Answering: "Select your answer and submit",
    TimesUp: "Wait for instructor to reveal the answer",
    ShowingAnswer: "",
    Finished: "",
  }[activeQuestion.value?.status || "NotStarted"];
});
</script>

<template>
  <div class="viewport-center">
    <h1 v-if="activeQuestion?.status === 'NotStarted'">
      Waiting for Quiz to Start
    </h1>
    <div v-else-if="currentQuestion?.content">
      <QuizTimer
        :status="activeQuestion?.status || 'NotStarted'"
        :beginAt="activeQuestion?.begin_at"
      />
      <QuizQuestion
        :content="currentQuestion?.content"
        @submit="handleSubmit"
        :show-correct-answer="activeQuestion?.status === 'ShowingAnswer'"
        :disabled="activeQuestion?.status !== 'Answering' || submitted"
        :message="message"
      />
    </div>
  </div>
</template>
