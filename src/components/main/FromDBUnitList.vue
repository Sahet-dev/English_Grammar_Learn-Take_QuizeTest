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
                            <!-- Image Container -->
                            <div v-if="unit.images && unit.images.length > 0" class="aspect-w-16 aspect-h-9 overflow-hidden">
                                <img
                                    :src="`http://localhost:8000/${unit.images[0].url}`"
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
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useUnitStore} from '@/api/useUnitStore.js'

const unitStore = useUnitStore()

onMounted(() => {
    unitStore.loadData()
})

const router = useRouter()

const units = computed(() => unitStore.units)

const goToUnit = (unitId) => {
    router.push({name: 'UnitShowFromDB', params: {id: unitId}})
}
</script>

<style scoped>
</style>
