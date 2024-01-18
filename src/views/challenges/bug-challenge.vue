<script setup lang="ts">
import CodingChallenge from "@/components/internal/CodingChallenge.vue";

const openFiles = "src/components/NoteModal.vue";

const instructions = `
# Note App Code Challenge

# Challenge Description

This is a simple Note App that allows you to add, edit, and remove notes. However, there are currently some issues.

Your task is to figure out why the issues exist and fix them!

## Requirements

- Fix the bug in the application causing the page to reload when adding or editing notes

- Fix the bug in the application causing the title and content in the Note Modal to remain unchanged whenever the component's info prop changes.

> 💡 HINT: The info prop is changed whenever you save a new note. Opening the Note Modal after saving a new note should have the title and content values cleared. Likewise, clicking edit on any existing note should show it's title and content in the Note Modal.

- Do NOT rename any existing variables

> 💡 HINT: Both bugs exist in \`NoteModal.vue\`

![Screenshot of the solution](/bug-challenge-screenshot.gif)

## Other Considerations

- If you see the \`data-test\` attribute in the boilerplate don't remove it. If you remove it, your code may be invalid for the certificate.
`;

const checklist = [
  "When opening the add/edit note modal, the title and content display the correct values",
  "When notes are added and updated, the page doesn't reload",
];
</script>
<template>
  <CodingChallenge
    repo="Vuejs-Certification/bootcamp-level-1-bug-challenge"
    :instructions="instructions"
    :openFiles="openFiles"
    :checklist="checklist"
    @next="$router.push('/challenges/in-person-challenges-end')"
  >
    <template #after-checklist>
      <p class="mt-4 text-sm">
        (Wait for the instructor to go over the solution live before pressing
        the "Complete" button below and moving to the next challenge. This way
        you can compare your solution to the instructor's solution)
      </p>
    </template>
  </CodingChallenge>
</template>
