<template>
  <div class="container mx-auto mt-24">
    <div>
      <h1 class="mb-2 text-4xl">Take Home Exam</h1>
      <p>
        The purpose of this exam is to give you a feel for what the real exam
        will be like and give you more practice learning the topics.
      </p>
      <h2 class="mt-5 mb-2 text-2xl">
        This exam, like the real one, is broken into 2 parts
      </h2>
      <ul class="text-left list-disc list-inside">
        <li class="list-item">30 Multiple Choice Questions (30mins)</li>
        <li class="list-item">
          2 Coding Challenges (75 mins)
          <ul class="ml-10 list-decimal list-inside">
            <li class="list-item">
              Feature Challenge (recommended 60 minutes)
            </li>
            <li class="list-item">Bug Challenge (recommended 15 minutes)</li>
          </ul>
        </li>
      </ul>

      <p class="mt-5">
        You won't be timed for the take home exam but feel free to use your own
        timer to make it more realistic
      </p>
      <div class="mt-5">
        <RouterLink class="btn btn-primary" to="/take-home-exam/mcqs"
          >Start Exam</RouterLink
        >
      </div>
    </div>
  </div>
</template>
