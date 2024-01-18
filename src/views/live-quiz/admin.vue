<script setup lang="ts">
import { ref, computed, watch, onUnmounted, onMounted } from "vue";
import { useSupabase } from "@/composables/useSupabase";
import QuizQuestion from "@/components/internal/QuizQuestion.vue";
import type { TStatus, Question } from "@/types";
import QuizTimer from "@/components/internal/QuizTimer.vue";
import { v4 as uuid } from "uuid";
import AppModal from "@/components/internal/AppModal.vue";
import { useUser } from "@/composables/useUser";
import { useRouter } from "vue-router";
import { config } from "@/assets/live-quiz-questions/config";

const { isAdmin, session } = useUser();
const router = useRouter();
watch(session, () => {
  if (!isAdmin.value) {
    alert("Sorry you're not allowed to manage the live quiz");
    router.replace("/live-quiz/quiz");
  }
});

const supabase = useSupabase();
const status = ref<TStatus>("NotStarted");
const beginAt = ref<Date | null>();
const quizId = ref("");
const timeLimitSeconds = ref(120);

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
      quizId.value = uuid();
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
    ShowingAnswer:
      currentQuestionId.value === questions.value?.length
        ? "Finish Quiz"
        : "Next Question",
    Finished: "Finished",
  }[status.value];
});

const buttonIcon = computed(() => {
  return {
    NotStarted: "",
    BeingRead: "fa:clock-o",
    Answering: "fa:stop-circle-o",
    TimesUp: "mdi:wand",
    ShowingAnswer:
      currentQuestionId.value === questions.value?.length
        ? "fa6-solid:flag-checkered"
        : "lucide:chevron-right",
    Finished: "Finished",
  }[status.value];
});

watch([status, timeLimitSeconds], async () => {
  const begin_at =
    status.value === "Answering" ? new Date().toISOString() : null;

  await supabase
    .from("activeQuestion")
    .update({
      status: status.value,
      question: status.value === "Finished" ? 1 : currentQuestionId.value,
      begin_at,
      quiz_id: quizId.value,
      time_limit_seconds: timeLimitSeconds.value,
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

const answersChannel = supabase.channel("answers");
answersChannel
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "answers" },
    (payload) => {
      answers.value = [...answers.value, payload.new];
    },
  )
  .subscribe();

onUnmounted(() => {
  answersChannel.unsubscribe();
});

const message = computed(() => {
  if (status.value === "Answering" || status.value === "TimesUp") {
    return ` ${rightAnswers.value.length} right, ${wrongAnswers.value.length} wrong anwers `;
  }
  return "";
});

const showEdit = ref(false);

let editKeyboardShortcutEvent: (event: KeyboardEvent) => void;
onMounted(() => {
  editKeyboardShortcutEvent = (event) => {
    if (event.key === "e" && event.metaKey) {
      showEdit.value = true;
    }
  };
  window.addEventListener("keydown", editKeyboardShortcutEvent);
});

onUnmounted(() => {
  window.removeEventListener("keydown", editKeyboardShortcutEvent);
});

const editForm = ref({
  timeLimit: timeLimitSeconds.value,
});
</script>
<template>
  <div class="mt-[60px] p-10 max-w-7xl m-auto relative">
    <div
      v-if="status === 'NotStarted'"
      class="text-center viewport-center mt-[-100px]"
    >
      <div>
        <h1 class="mb-10 text-9xl">Live Quiz</h1>
        <button class="w-72 btn btn-primary btn-lg" @click="handleSubmit">
          Start
        </button>
      </div>
    </div>
    <div v-if="status !== 'Finished' && status !== 'NotStarted'">
      <div>
        <QuizTimer
          :beginAt="beginAt"
          :status="status"
          :seconds="timeLimitSeconds"
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
          :btn-icon="buttonIcon"
          :is-example="currentQuestion.id <= config.numberOfExampleQuestions"
          :number="
            currentQuestion?.id <= config.numberOfExampleQuestions
              ? currentQuestion?.id
              : currentQuestion?.id - config.numberOfExampleQuestions
          "
        />
      </div>
    </div>

    <!-- Finished -->
    <div
      v-if="status === 'Finished'"
      class="text-center viewport-center mt-[-100px]"
    >
      <div>
        <h1 class="mb-2 text-9xl">Finished!</h1>
        <h2 class="mb-10 text-4xl">How'd you do?</h2>
        <button class="w-72 btn btn-primary btn-lg" @click="handleSubmit">
          Restart
        </button>
      </div>
    </div>
  </div>

  <AppModal :open="showEdit" @close="showEdit = false">
    <form
      @submit.prevent="
        timeLimitSeconds = editForm.timeLimit;
        showEdit = false;
      "
    >
      <label class="w-full max-w-xs mb-2 form-control">
        <div class="label">
          <span class="label-text">Time Limit</span>
        </div>
        <input
          type="text"
          class="w-full max-w-xs input input-bordered"
          name="timeLimit"
          v-model="editForm.timeLimit"
          autofocus
        />
      </label>
      <button class="btn btn-primary">Save</button>
    </form>
  </AppModal>
</template>
