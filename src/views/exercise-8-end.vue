<script setup>
import { ref } from "vue";
import UserProfileCard from "@/components/end/UserProfileCard.vue";
import UserProfileCardEdit from "@/components/end/UserProfileCardEdit.vue";

const user = ref({
  avatar: "https://i.pravatar.cc/150?img=6",
  username: "dudemcface",
  bio: "I'm a software engineer focused on delivering unique and engaging experiences.",
  name: {
    first: "Dude",
    last: "McFace",
  },
  skills: ["JavaScript", "Vue", "React", "Node"],
  pro: true,
});
</script>
<template>
  <div class="exercise-8">
    <UserProfileCard v-bind="user" class="mr-5" />
    <UserProfileCardEdit v-bind="user" @saved="user = $event" />
  </div>
</template>

<style scoped>
.exercise-8 {
  @apply flex items-center justify-center h-screen p-10;
}
</style>
