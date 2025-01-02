<template>
    <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold text-center mb-6">Units List</h1>

        <!-- Units Table -->
        <table class="min-w-full table-auto border-collapse">
            <thead>
            <tr>
                <th class="px-4 py-2 border-b">Unit Title</th>
                <th class="px-4 py-2 border-b">Visibility</th>
                <th class="px-4 py-2 border-b">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="unit in units" :key="unit.id">
                <!-- Show the first detail's title as the unit title -->
                <td class="px-4 py-2 border-b">{{ unit.details[0]?.title }}</td>
                <td class="px-4 py-2 border-b">
                    <select v-model="unit.visibility" @change="updateVisibility(unit)" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="visible">Visible</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </td>
                <td class="px-4 py-2 border-b">
                    <button @click="deleteUnit(unit.id)" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Delete
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from "@/api/apiClient";  // Assume apiClient is set up for HTTP requests

// Reactive data
const units = ref([]);

// Fetch all units on mount
onMounted(() => {
    fetchUnits();
});

// Fetch all units
const fetchUnits = async () => {
    try {
        const response = await apiClient.get('/units');
        units.value = response.data;
    } catch (error) {
        console.error('Error fetching units:', error);
    }
};

// Update visibility of a unit
const updateVisibility = async (unit) => {
    try {
        await apiClient.put(`/units/${unit.id}`, { visibility: unit.visibility });
        console.log('Unit visibility updated');
    } catch (error) {
        console.error('Error updating visibility:', error);
    }
};

// Delete a unit
const deleteUnit = async (unitId) => {
    try {
        await apiClient.delete(`/units/${unitId}`);
        units.value = units.value.filter(unit => unit.id !== unitId);  // Remove the unit from the list
        console.log('Unit deleted');
    } catch (error) {
        console.error('Error deleting unit:', error);
    }
};
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
