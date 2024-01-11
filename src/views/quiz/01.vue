<script setup lang="ts">
import { ref } from "vue";
import QuizQuestion from "@/components/internal/QuizQuestion.vue";
import { useSupabase } from "@/composables/useSupabase";
const supabase = useSupabase();

const rawContent = ref("");
const awaitingNextQuestion = ref(true);

// Listen to inserts
supabase
  .channel("questions")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "questions" },
    (payload) => {
      console.log(payload);
      if (payload.new.active) {
        rawContent.value = payload.new.content;
        awaitingNextQuestion.value = false;
      }
    },
  )
  .subscribe();
</script>

<template>
  <div class="viewport-center">
    <h1 v-if="awaitingNextQuestion">Awaiting next question...</h1>
    <QuizQuestion v-else :content="rawContent" />
  </div>
</template>
