<script setup lang="ts">
import QuizQuestion from "@/components/internal/QuizQuestion.vue";

const question =
  "The below Vue code snippet is valid" +
  "\n```html" +
  `
<template>
	<div>
		<TodoItem v-for="todo in todos" v-if="todo.shown" :todo="todo"/>
	</div>
</template>
` +
  "```";

const answerChoices = {
  a: "True",
  b: "False",
};
const correctAnswer = "b";
const explanation = "This is right because...";

const qq = {
  question,
  answerChoices,
  correctAnswer,
  explanation,
};
</script>

<template>
  <div class="viewport-center">
    <QuizQuestion v-bind="qq" :correct-answer="correctAnswer" />
  </div>
</template>
