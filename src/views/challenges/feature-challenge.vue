<script setup lang="ts">
import CodingChallenge from "@/components/internal/CodingChallenge.vue";

const repo = "Vuejs-Certification/bootcamp-level-1-feature-challenge";

const openFiles =
  "src/components/MessageForm.vue,src/components/MessageBoard.vue";

const instructions = `
# Message Board

# Challenge Description

In this challenge, you are tasked with creating a simple message board system. The challenge will require that you work in \`MessageBoard.vue\` and \`MessageForm.vue\`.

## Requirements

### The MessageBoard component should:

1. Accept the following props

   - \`messages\` - array, required

2. Display a list of the messages

   - Allow the parent component to determine the markup displayed within each list item

3. Transition the list items

   - When a new message is added to the list, it should slide in
   - You should do it with the provided \`slide\` style and a built-in Vue component

   - > 💡 HINT: Make sure that the transition is applied to the item element being added
   - > 💡 HINT: You can come back to this after you finish the MessageForm below

### The MessageForm component should:

1. Include a form with a single message input and a submit button

2. Emit a \`send-msg\` event whenever the form is submitted (button is clicked or enter is pressed).

   - The payload should be a message object with the following properties:
     - id - a random id
     - author: a random name (can use \`faker.person.firstName()\`)
     - timestamp: the current date/time as a string
     - content: the message provided in the input

3. Disable the form submit button when the message is empty

4. Reset the form after submit

![Screenshot of the solution](/feature-challenge-screenshot.gif)

## Other Considerations

- If you see the \`data-test\` attribute in the boilerplate don't remove it. If you remove it, your code may be invalid for the certificate.

- TailwindCSS is preinstalled and with default config. It might be helpful for you if you want to have some styles. Or if you'd like to see a pretty result as you develop, you can use the following semantic classes that have been included: \`send-btn\`, \`input-box\`.
`;

const checklist = [
  "The message list is displayed on the page",
  "When a new message is added to the list, it slides in",
  "A new message is added to the list when the user clicks the submit button or presses enter",
  "The form submit button is disabled when the message is empty",
  "The form is reset form after submit",
];
</script>
<template>
  <CodingChallenge
    :repo="repo"
    :instructions="instructions"
    :openFiles="openFiles"
    :checklist="checklist"
    @next="() => $router.push('/challenges/bug-challenge')"
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
