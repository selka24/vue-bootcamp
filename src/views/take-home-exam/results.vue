<script setup lang="ts">
import { useTakeHomeQuiz } from "@/composables/useTakeHomeQuiz";
import { useRouter } from "vue-router";

const router = useRouter();
const { status, correctAnswerCount } = useTakeHomeQuiz();

if (status.value !== "Complete") {
  router.replace("/take-home-exam");
}
</script>
<template>
  <div class="text-center viewport-center">
    <div class="max-w-md">
      <h1 class="text-6xl">How did you do?</h1>
      <br />
      <h2 class="text-3xl">
        Multiple Choice Result: {{ correctAnswerCount }} / 30
      </h2>
      <br />

      <h2 class="mb-2 text-3xl">Coding Challenge Results:</h2>
      <p class="mb-2 text-left">
        If you were able to truthfully check off all items in the checklist for
        each coding challenge you would have passed this portion of the exam.
      </p>
      <p class="text-left">
        (During the actual test, we run both automated and manual checks to
        ensure accuracy)
      </p>
    </div>
  </div>
</template>
