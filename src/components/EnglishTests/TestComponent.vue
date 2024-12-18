<template>
  <ReusableTestComponent
      :header-title="'Unit 1 Functional Tests'"
      :sections="testSections"
      :footer-text="'All rights reserved © 2024'"
  />
</template>

<script setup>
import ReusableTestComponent from './ReusableTestComponent.vue';

const testSections = [
  {
    title: "1.1 Fill in the blanks with the correct form of verbs",
    instructions: "come, get, happen, look, make, start, try, work, stay",
    questions: [
      {
        text: '"You\'re working hard today." "Yes, I have a lot to do."',
        answer: "working"
      },
      {
        text: "I _____ for Christine. Do you know where she is?",
        answer: "am looking"  // Presuming present continuous is the correct answer
      },
      {
        text: "It _____ dark. Shall I turn on the light?",
        answer: "is getting"  // Here, the progressive tense for a changing state
      },
    ],
  },
  {
    title: "1.2 Complete the sentences with appropriate words",
    questions: [
      {
        text: "Why _____ at me like that? What's the matter?",
        answer: "are you looking"
      },
      {
        text: "Is she? What _____ ?",
        answer: "happened"
      },
    ],
  },
];
</script>
