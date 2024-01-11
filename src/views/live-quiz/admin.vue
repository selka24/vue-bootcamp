<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { useSupabase } from "@/composables/useSupabase";
import QuizQuestion from "@/components/internal/QuizQuestion.vue";
import type { TStatus, Question } from "@/types";
import QuizTimer from "@/components/internal/QuizTimer.vue";

const supabase = useSupabase();
const status = ref<TStatus>("NotStarted");
const beginAt = ref<Date | null>();

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
      beginAt.value = new Date();
      status.value = "Answering";
    },
    Answering: () => {
      status.value = "TimesUp";
    },
    TimesUp: () => {
      console.log("times up");
      status.value = "ShowingAnswer";
    },
    ShowingAnswer: () => {
      status.value = "BeingRead";
      currentQuestionId.value++;
      answers.value = [];
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
  console.log("wather fire");
  const begin_at =
    status.value === "Answering" ? new Date().toISOString() : null;

  await supabase
    .from("activeQuestion")
    .update({
      status: status.value,
      question: currentQuestionId.value,
      begin_at,
    })
    .eq("id", 1);
});

addEventListener("beforeunload", async (event) => {
  await supabase
    .from("activeQuestion")
    .update({
      status: "NotStarted",
      question: 1,
    })
    .eq("id", 1);
});

// handle answers

const answers = ref<any[]>([]);
const rightAnswers = computed(() => {
  return answers.value.filter((x) => x.isCorrect);
});

const wrongAnswers = computed(() => {
  return answers.value.filter((x) => !x.isCorrect);
});

supabase
  .channel("answers")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "answers" },
    (payload) => {
      answers.value = [...answers.value, payload.new];
    },
  )
  .subscribe();

const message = computed(() => {
  if (status.value === "Answering" || status.value === "TimesUp") {
    return ` ${rightAnswers.value.length} right, ${wrongAnswers.value.length} wrong anwers `;
  }
  return "";
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
      <div>
        <QuizTimer
          :beginAt="beginAt"
          :status="status"
          @timeup="status = 'TimesUp'"
        />

        <!-- Quiz Question -->
        <QuizQuestion
          v-if="currentQuestion?.content"
          :content="currentQuestion?.content"
          :btn-text="buttonText"
          @submit="handleSubmit"
          :show-correct-answer="status === 'ShowingAnswer'"
          :message="message"
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
