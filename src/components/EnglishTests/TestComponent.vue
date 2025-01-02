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
import { useUnitStore } from '@/api/useUnitStore.js'

const unitStore = useUnitStore()

const route = useRoute();
const unitId = parseInt(route.params.unitId);
const testSections = ref([]);

const loadQuestions = async () => {
    await unitStore.fetchUnitById(unitId);

    const quizDetails = await unitStore.loadQuestions();

    testSections.value = quizDetails.map((section) => ({
        title: section.title,
        instructions: section.instructions || "",
        questions: section.questions.map((q) => ({
            text: q.text,
            answer: q.answer,
        })),
    }));
};





onMounted(() => {
  loadQuestions();
});
</script>
