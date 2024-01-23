<script setup lang="ts">
import AppModal from "@/components/internal/AppModal.vue";
import CodingChallenge from "@/components/internal/CodingChallenge.vue";
import { useTakeHomeQuiz } from "@/composables/useTakeHomeQuiz";
import { useRouter } from "vue-router";
import VueMarkdown from "vue-markdown-render";
import { ref } from "vue";
const router = useRouter();
const { status } = useTakeHomeQuiz();

if (status.value !== "DoingFeatureChallenge") {
  router.replace("/take-home-exam");
}

const openFiles = "src/components/FileTree.vue";

const instructions = `
# File Tree Component

In this challenge, you are tasked with creating a \`FileTree\` component.

The challenge will require that you work in \`FileTree.vue\`.

## Requirements

### The FileTree component should:

1. Work with it's current usage in \`App.vue\`
2. Accept the following props:

   - files - an array of objects shaped like those in \`@/src/assets/dataSource.js\`
   - selected - the currently selected file (default is null)
   - path - a string indicating how deep in the file tree the component is (default is '/')

3. Emit the following events:

   - select - emit when a file is clicked on. The payload is the complete file path.

4. Display the provided files in a traditional file tree format

   - Display the \`IconFile\` component to the left of the file name
   - Display the \`IconFolderCollapsed\` component to the left of the folder name for folders that are NOT expanded
   - Display the \`IconFolderExpanded\` component to the left of the folder name for folders that ARE expanded
   - Expand and collapse files when the user clicks on the folder icon
   - Nest each level visually under the parent folder

> 💡 HINT: The FileTree component is already registered globally so you can use it anywhere you want (including in itself)

5. Handle selecting files

   - When a file is clicked, emit the \`select\` event with the complete file path
   - When a file is clicked, add the \`selected\` class to the file to give it a blue color
   - When a file is clicked, remove the \`selected\` class from the previously selected file
   - When implemented correctly the selected file path should display in \`App.vue\` inside the \`code.selected-file\` element

   ![Screenshot of the solution](/bootcamp-level-1-take-home-feature-challenge.gif)

## Other Considerations

- If you see the \`data-test\` attribute in the boilerplate don't remove it. If you remove it, your code may be invalid for the certificate.
`;

const checklist = [
  "Collapsed folders display the `IconFolderCollapsed` on the left side",
  "Expanded folders display the `IconFolderExpanded` on the left side",
  "Files display the `IconFile` on the left side",
  "Files include the `selected` class and display with a blue text color when selected",
  "Files do NOT include the `selected` class and have a black text color when NOT selected",
  "The file tree is nested visually under the parent folder",
  "Clicking on a folder expands or collapses the folder",
  "Clicking on a file emits the `select` event and show the selected file on th page",
];

function handleNext() {
  status.value = "DoingBugChallenge";
  router.push("/take-home-exam/bug-challenge");
}

const modalOpen = ref(true);
</script>
<template>
  <CodingChallenge
    repo="Vuejs-Certification/bootcamp-level-1-take-home-feature-challenge"
    :instructions="instructions"
    :openFiles="openFiles"
    :checklist="checklist"
    @next="handleNext"
  >
  </CodingChallenge>
  <AppModal :open="modalOpen" @close="modalOpen = false">
    <h1 class="mb-3 text-lg font-bold text-primary">
      Coding Challenge #1 - Feature Challenge
    </h1>

    <div class="p-3 overflow-scroll prose-sm prose rounded h-96">
      <vue-markdown :source="instructions" />
    </div>
    <div class="flex justify-end mt-5">
      <button class="btn btn-primary" @click="modalOpen = false">
        Begin Feature Challenge
      </button>
    </div>
  </AppModal>
</template>
