<template>
  <ReusableTestComponent
      :header-title="'Unit ' + unitId + ' Functional Tests'"
      :sections="testSections"
      :footer-text="'All rights reserved © 2024'"
  />
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import ReusableTestComponent from './ReusableTestComponent.vue';

const route = useRoute();
const unitId = parseInt(route.params.unitId); // Extract unit ID from route parameters
const testSections = ref([]);

// Load test data and transform it for the reusable component
const loadQuestions = async () => {
  const response = await fetch('/testData.json'); // Adjust path as needed
  const data = await response.json();

  // Find the test data for the current unit
  const unitData = data.find((unit) => unit.unit === unitId);

  if (unitData) {
    testSections.value = unitData.details.map((section) => ({
      title: section.title,
      instructions: section.instructions || "", // Fallback to an empty string if not provided
      questions: section.questions.map((q) => ({
        text: q.text,
        answer: q.answer,
      })),
    }));
  }
};

onMounted(() => {
  loadQuestions();
});
</script>
