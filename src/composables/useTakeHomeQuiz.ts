import { useLocalStorage } from "@vueuse/core";
import type { McqAnswer } from "@/types";
import { computed } from "vue";

const mcqAnswers = useLocalStorage<McqAnswer[]>(
  "take-home-exam-mcqs-answers",
  [],
);
const status = useLocalStorage<
  | "NotStarted"
  | "DoingMcqs"
  | "DoingBugChallenge"
  | "DoingFeatureChallenge"
  | "Complete"
>("take-home-exam-status", "NotStarted");

export const useTakeHomeQuiz = () => {
  function recordAnswer(answer: McqAnswer) {
    const existing = mcqAnswers.value.find(
      (a) => a.questionId === answer.questionId,
    );
    if (existing) {
      existing.answer = answer.answer;
      existing.isCorrect = answer.isCorrect;
    } else {
      mcqAnswers.value.push(answer);
    }
  }

  const correctAnswerCount = computed(() => {
    return mcqAnswers.value.filter((a) => a.isCorrect).length;
  });
  return {
    status,
    recordAnswer,
    correctAnswerCount,
    mcqAnswers,
  };
};
