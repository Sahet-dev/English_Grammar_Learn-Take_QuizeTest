<template>
    <div class="flex h-screen bg-gray-100" v-if="isAdmin">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-800 text-white p-4">
            <h2 class="text-xl font-bold mb-6">Admin Dashboard</h2>
            <ul>
                <li v-for="route in routes" :key="route.name">
                    <router-link
                        :to="route.path"
                        class="block p-2 hover:bg-gray-700 rounded"
                        :class="{ 'bg-gray-700': $route.path === route.path }"
                    >
                        {{ route.name }}
                    </router-link>
                </li>
            </ul>
        </div>

        <!-- Main content -->
        <div class="flex-1 p-6 overflow-y-auto">
            <!-- Routing views go here -->
            <router-view></router-view>
        </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-red-600 mb-2">Access Denied</h1>
            <p class="text-gray-600">This area is restricted to administrators only.</p>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import { useAuthStore } from "@/helpers/authStore";


const authStore = useAuthStore();
const isAdmin = authStore.role === 'admin';

const routes = [
    { path: '/', name: 'FromDBUnitList' },
    { path: '/list', name: 'Unit List' },
    { path: '/insert', name: 'Insert Unit' },
    { path: '/manage', name: 'User Management' },
];

// Define the component
defineComponent({
    name: 'AdminPage'
});
</script>

<style scoped>
/* Optional custom styles */
</style>
