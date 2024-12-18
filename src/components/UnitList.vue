<template>
  <div class="p-6 space-y-6">
    <!-- List of Units -->
    <div class="space-y-4" v-if="units.length > 0">
      <div
          v-for="unit in units"
          :key="unit.unit"
          class="cursor-pointer text-xl font-bold text-blue-600 hover:underline"
          @click="goToUnit(unit.unit)"
      >
        <!-- Ensure details are available before accessing the title -->
        <span v-if="unit.details && unit.details[0]">{{ unit.details[0].title }}</span>
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-else>
      <p class="text-center text-gray-500">Loading units...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter

const units = ref([]);
const router = useRouter();

// Load data from the JSON file
const loadData = async () => {
  const response = await fetch('/units.json');
  const data = await response.json();
  units.value = data;
};

// Navigate to unit details page
const goToUnit = (unitId) => {
  router.push({ name: 'UnitShow', params: { id: unitId } });
};

onMounted(() => {
  loadData();
});
</script>
