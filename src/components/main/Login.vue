<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
        <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <form @submit.prevent="login">
                <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <!-- Email Input -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
                    <input
                        id="email"
                        type="email"
                        v-model="email"
                        required
                        autocomplete="email"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <!-- Password Input -->
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2">Password:</label>
                    <input
                        id="password"
                        type="password"
                        v-model="password"
                        required
                        autocomplete="current-password"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>

            <p v-if="errorMessage" class="mt-4 text-red-500 font-bold text-center">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/helpers/authStore";
import apiClient from "@/api/apiClient.js";

const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Login function
const login = async () => {
    try {
        const response = await apiClient.post("/login", {
            email: email.value,
            password: password.value,
        });
        console.log(response.data);
        authStore.login(response.data.token,  response.data.user.role);

        await router.push("/");

    } catch (error) {
        // Handle error
        if (error.response && error.response.status === 401) {
            errorMessage.value = "Invalid email or password";
        } else {
            errorMessage.value = "An error occurred. Please try again.";
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>
