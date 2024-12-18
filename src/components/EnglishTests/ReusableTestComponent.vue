<template>
  <div v-if="sections && sections.length" id="wrapper" class="flex flex-col min-h-screen bg-gray-50">
    <!-- Header -->
    <header id="header" class="text-center bg-blue-600 text-white py-6 shadow-md">
      <h1 class="text-3xl font-semibold tracking-wide">{{ headerTitle }}</h1>
    </header>

    <!-- Test Content -->
    <div id="main" class="flex-grow p-6 max-w-3xl mx-auto">
      <div v-if="!showSummary" class="bg-white shadow-md rounded-lg p-6">
        <!-- Display the current question -->
        <h3 class="text-2xl font-bold text-blue-800 mb-4">{{ currentSection.title }}</h3>
        <p class="text-gray-800 text-lg mb-6">{{ currentQuestion.text }}</p>

        <!-- User input for answer -->
        <input
            v-model="userAnswer"
            type="text"
            class="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 w-full text-gray-800"
            placeholder="Enter your answer"
        />

        <!-- Navigation buttons -->
        <div class="flex justify-between items-center mt-6">
          <button
              :disabled="currentQuestionIndex === 0 && currentSectionIndex === 0"
              class="px-6 py-3 rounded-lg font-medium bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              @click="goToPreviousQuestion"
          >
            Previous
          </button>
          <button
              class="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
              @click="goToNextQuestion"
          >
            {{ isLastQuestion ? "Submit Test" : "Next" }}
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div v-else class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-2xl font-bold text-blue-800 mb-6">Test Summary</h3>
        <div v-for="(result, index) in results" :key="index" class="mb-4">
          <p class="flex items-center">
            <span
                :class="{
                'bg-green-100 text-green-600': result.correct,
                'bg-red-100 text-red-600': !result.correct,
              }"
                class="w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold"
            >
              {{ result.correct ? "✔" : "✖" }}
            </span>
            <span class="text-gray-900">{{ result.question }}</span>
          </p>
          <p class="text-sm text-gray-600">Your answer: <span class="font-medium">{{ result.userAnswer }}</span></p>
          <p v-if="!result.correct" class="text-sm text-gray-600">
            Correct answer: <span class="font-medium">{{ result.correctAnswer }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer id="footer" class="bg-blue-600 text-white text-center py-4">
      <p class="text-sm">{{ footerText }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// Props
const props = defineProps({
  headerTitle: { type: String, default: "Test Page" },
  sections: { type: Array, required: true },
  footerText: { type: String, default: "Footer Text" },
});

// State
const currentSectionIndex = ref(0);
const currentQuestionIndex = ref(0);
const userAnswer = ref("");
const results = ref([]);
const showSummary = ref(false);

// Derived state
const currentSection = computed(() => props.sections[currentSectionIndex.value]);
const currentQuestion = computed(() =>
    currentSection.value.questions[currentQuestionIndex.value]
);
const isLastQuestion = computed(() => {
  const lastSectionIndex = props.sections.length - 1;
  const lastQuestionIndex =
      props.sections[lastSectionIndex].questions.length - 1;
  return (
      currentSectionIndex.value === lastSectionIndex &&
      currentQuestionIndex.value === lastQuestionIndex
  );
});

// Methods
const goToNextQuestion = () => {
  saveAnswer();
  if (currentQuestionIndex.value < currentSection.value.questions.length - 1) {
    currentQuestionIndex.value++;
  } else if (currentSectionIndex.value < props.sections.length - 1) {
    currentSectionIndex.value++;
    currentQuestionIndex.value = 0;
  } else {
    showSummary.value = true;
  }
  loadAnswer();
};

const goToPreviousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  } else if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--;
    currentQuestionIndex.value =
        props.sections[currentSectionIndex.value].questions.length - 1;
  }
  loadAnswer();
};

const saveAnswer = () => {
  const key = `${currentSectionIndex.value}-${currentQuestionIndex.value}`;
  localStorage.setItem(key, userAnswer.value);
};

const loadAnswer = () => {
  const key = `${currentSectionIndex.value}-${currentQuestionIndex.value}`;
  userAnswer.value = localStorage.getItem(key) || "";
};

const submitTest = () => {
  results.value = [];
  props.sections.forEach((section, sectionIndex) => {
    section.questions.forEach((question, questionIndex) => {
      const key = `${sectionIndex}-${questionIndex}`;
      const userResponse = localStorage.getItem(key) || "";
      results.value.push({
        question: question.text,
        correctAnswer: question.answer,
        userAnswer: userResponse,
        correct:
            userResponse.trim().toLowerCase() ===
            question.answer.trim().toLowerCase(),
      });
    });
  });
  localStorage.clear();
};

// Watch for final submission
watch(showSummary, (newVal) => {
  if (newVal) submitTest();
});
</script>

<style scoped>
#wrapper {
  margin: 0 auto;
}
</style>
