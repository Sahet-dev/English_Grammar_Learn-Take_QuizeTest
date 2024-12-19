<template>
  <div class="p-6">
    <!-- Unit Details Section -->
    <div v-if="unit" class="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold text-gray-800">Unit {{ unit.unit }}</h2>

      <!-- Displaying all details for the selected unit -->
      <div v-for="detail in unit.details" :key="detail.id" class="mt-4">
        <h3 class="text-xl font-medium text-gray-800">{{ detail.title }}</h3>
        <h4 class="text-lg font-medium text-gray-600">{{ detail.section }}</h4>
        <p class="mt-2 text-gray-700">{{ detail.content }}</p>

        <div class="mt-4">
          <h4 class="font-medium text-gray-800">Example:</h4>
          <p class="text-gray-600 italic">{{ detail.example }}</p>
        </div>
      </div>

      <!-- Button to navigate to Questions Page -->
      <div class="mt-8">
        <router-link
            :to="`/unit/${unit.unit}/questions`"
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Open Questions for Unit {{ unit.unit }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const unit = ref(null);

// Load data from the JSON file and find the selected unit
const loadData = async () => {
  const response = await fetch('/units.json'); // Adjust path as needed
  const data = await response.json();

  // Find the unit by its ID
  unit.value = data.find((u) => u.unit === parseInt(route.params.id));
};

onMounted(() => {
  loadData();
});
</script>
