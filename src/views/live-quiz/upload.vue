<script setup lang="ts">
import quizQuestions from "@/assets/live-quiz-questions/questions.md?raw";
import { useSupabase } from "@/composables/useSupabase";
import { useUser } from "@/composables/useUser";
import { useRouter } from "vue-router";
import { watch } from "vue";

const { isAdmin, session } = useUser();
const router = useRouter();
watch(session, () => {
  if (!isAdmin.value) {
    alert("Sorry you're not allowed to upload questions");
    router.replace("/live-quiz/quiz");
  }
});

const supabase = useSupabase();

const asArray = quizQuestions
  .split("---")
  .map((q) => q.trim())
  .filter((q) => q);
const asRow = asArray.map((q, index) => {
  return {
    content: q,
    id: index + 1,
  };
});

async function truncateQuestions() {
  const { error } = await supabase.from("questions").delete().gte("id", 1);
  if (error) {
    alert("Sorry you're not allowed to upload new questions");
  }
}

async function uploadQuestions() {
  const { error } = await supabase.from("questions").insert(asRow);
  if (error) {
    alert("Sorry you're not allowed to upload new questions");
  }
}

async function setActiveQuestion() {
  const { error } = await supabase.from("activeQuestion").insert({
    id: 1,
    question: 1,
    status: "NotStarted",
  });

  if (error) {
    alert("Issue setting active question, please try again. " + error.message);
  }
}

async function handleUpload() {
  await truncateQuestions();
  await uploadQuestions();
  await setActiveQuestion();
  alert("Questions uploaded successfully");
}
</script>

<template>
  <div class="viewport-center">
    <button class="btn btn-primary" @click="handleUpload">
      Upload Questions
    </button>
  </div>
</template>
