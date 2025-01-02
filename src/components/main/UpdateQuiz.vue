<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Update Quiz</h2>

        <form @submit.prevent="submitQuizUpdate" class="space-y-4">
            <!-- Quiz Title -->
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Quiz Title</label>
                <input
                    id="title"
                    v-model="quizData.title"
                    type="text"
                    required
                    class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter quiz title"
                />
            </div>

            <!-- Quiz Details -->
            <div v-for="(detail, index) in quizData.quiz_details" :key="detail.id">
                <div class="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Detail {{ index + 1 }}</h3>

                    <!-- Quiz Detail Title -->
                    <div class="mt-2">
                        <label for="detailTitle" class="block text-sm font-medium text-gray-700">Detail Title</label>
                        <input
                            v-model="detail.title"
                            type="text"
                            required
                            class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter detail title"
                        />
                    </div>

                    <!-- Quiz Instructions -->
                    <div class="mt-2">
                        <label for="instructions" class="block text-sm font-medium text-gray-700">Instructions</label>
                        <input
                            v-model="detail.instructions"
                            type="text"
                            class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter instructions"
                        />
                    </div>

                    <!-- Questions -->
                    <div v-for="(question, qIndex) in detail.questions" :key="question.id" class="mt-4">
                        <div class="flex items-center space-x-4">
                            <div class="w-full">
                                <label for="questionText" class="block text-sm font-medium text-gray-700">Question {{ qIndex + 1 }}</label>
                                <input
                                    v-model="question.text"
                                    type="text"
                                    required
                                    class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter question"
                                />
                            </div>
                            <div class="w-full">
                                <label for="answer" class="block text-sm font-medium text-gray-700">Answer</label>
                                <input
                                    v-model="question.answer"
                                    type="text"
                                    required
                                    class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter answer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-center mt-4">
                <button
                    type="submit"
                    class="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Update Quiz
                </button>
            </div>
        </form>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-6 text-green-600 font-medium text-center">
            {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-6 text-red-600 font-medium text-center">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/api/apiClient.js'; // Replace with your apiClient

// State variables
const quizData = ref({
    title: '',
    quiz_details: [],
});

const successMessage = ref('');
const errorMessage = ref('');

// Fetch quiz data on component mount (for editing)
const route = useRoute();
const router = useRouter();
const unitId = route.params.unitId; // Assuming unitId is part of route params

const fetchQuizData = async () => {
    try {
        const response = await apiClient.get(`/quizzes/${unitId}`);
        quizData.value = response.data;
    } catch (error) {
        errorMessage.value = 'Error fetching quiz data.';
        console.error(error);
    }
};

// Fetch quiz data when the component is mounted
fetchQuizData();

// Handle form submission to update the quiz
const submitQuizUpdate = async () => {
    try {
        const response = await apiClient.put(`/quizzes/${unitId}`, quizData.value);
        successMessage.value = 'Quiz updated successfully!';
        errorMessage.value = ''; // Clear error message if successful

        // Optionally, navigate to a different page or reset the form
        // router.push('/some-page'); // Redirect after update
    } catch (error) {
        errorMessage.value = 'Error updating quiz.';
        successMessage.value = ''; // Clear success message if failed
        console.error(error);
    }
};
</script>

<style scoped>
</style>
