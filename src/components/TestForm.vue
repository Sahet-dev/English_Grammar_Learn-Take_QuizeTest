<!-- src/components/TestForm.vue -->
<template>
  <div id="wrapper" class="flex flex-col min-h-screen bg-gray-100">

    <div id="main" class="flex-grow p-4">
      <section class="post bg-white shadow-md rounded-lg p-6 mb-4" v-for="section in data.questions" :key="section.id">
        <header class="major mb-4">
          <h3 class="text-xl font-bold text-gray-800">{{ section.title }}</h3>
        </header>

        <form @submit.prevent="handleSubmit(section.id)">
          <div v-for="item in section.items" :key="item.id" class="mb-4">
            <p class="text-gray-700">
              {{ item.id }}. {{ item.question }}
              <input type="text" v-model="answers[section.id][item.id]" size="7" required class="border border-gray-300 rounded p-1 mx-2" />
              {{ item.textAfter }}
            </p>
          </div>
          <button class="button primary bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">Netijeleri barla</button>
        </form>
      </section>
    </div>

    <div id="copyright" class="bg-blue-600 text-white text-center p-2">
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import data from '../testData.js';

const answers = reactive({});
for (const section of data.questions) {
  answers[section.id] = {};
  for (const item of section.items) {
    answers[section.id][item.id] = '';
  }
}

const handleSubmit = (sectionId) => {
  const sectionAnswers = answers[sectionId];
  for (const itemId in sectionAnswers) {
    const answer = sectionAnswers[itemId].toLowerCase();
    if (answer === 'i do') {
      console.log('Answer matches: I do');
    } else {
      console.log(`Answer does not match: ${sectionAnswers[itemId]}`);
    }
  }
};



</script>

<style scoped>
/* Additional custom styles can go here if needed */
</style>
