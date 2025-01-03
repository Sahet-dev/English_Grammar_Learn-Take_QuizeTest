<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="p-8 space-y-8">
                    <!-- List of Units -->
                    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" v-if="units.length > 0">
                        <div
                            v-for="unit in units"
                            :key="unit.id"
                            class="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                            @click="goToUnit(unit.unit)"
                        >
<!--                            goToUnit(unit.unit) MUST USE UNIT NUMBER NOTTTTT UNIT id !!! -->
                            <!-- Image Container -->
                            <div v-if="unit.images?.length" class="aspect-w-16 aspect-h-9 overflow-hidden">
                                <img
                                    :src="`http://localhost:8000/${unit.images[0]?.url}`"
                                    alt="Unit Image"
                                    class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <!-- Unit Title -->
                            <div class="p-6">
                                <h3 class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                    <span v-if="unit.details && unit.details[0]">{{ unit.details[0].title }}</span>
                                </h3>
                                <div
                                    class="mt-4 flex items-center text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <span>View Details</span>
                                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>

                        </div>
                        <!-- Pagination Controls -->
                        <div class="flex justify-between items-center mt-8">
                            <button
                                class="px-4 py-2 bg-blue-500 text-white rounded"
                                :disabled="currentPage === 1"
                                @click="loadUnits(currentPage - 1)"
                            >
                                Previous
                            </button>
                            <span>Page {{ currentPage }} of {{ totalPages }}</span>
                            <button
                                class="px-4 py-2 bg-blue-500 text-white rounded"
                                :disabled="currentPage === totalPages"
                                @click="loadUnits(currentPage + 1)"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <!-- Loading / Empty State -->
                    <div v-else class="flex flex-col items-center justify-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p class="text-lg text-gray-600 font-medium">Loading units...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, computed, ref} from 'vue'
import apiClient from '@/api/apiClient.js';
import router from "@/router/index.js";

const units = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);

const loadUnits = async (page = 1) => {
    loading.value = true;
    error.value = null;

    try {
        const response = await apiClient.get(`/units?page=${page}`);
        console.log('API Response:', response.data);
        const { data, meta } = response.data;

        units.value = data || [];  // Set units data
        currentPage.value = meta.current_page;
        totalPages.value = meta.last_page;

    } catch (err) {
        error.value = err?.response?.data || err.message;
        console.error('Error fetching units:', error.value);
    } finally {
        loading.value = false;
    }
};

// Automatically fetch data when the component is mounted
onMounted(() => {
    loadUnits();
});

const goToUnit = (unitId) => {
    router.push({ name: 'UnitShowFromDB', params: { id: unitId } });
};
</script>

<style scoped>
</style>
