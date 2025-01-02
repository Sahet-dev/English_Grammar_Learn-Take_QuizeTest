<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="registerUser" class="space-y-6">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div class="mt-1">
                            <input
                                id="name"
                                v-model="form.name"
                                type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div class="mt-1">
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                autocomplete="email"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input
                                id="password"
                                v-model="form.password"
                                type="password"
                                required
                                autocomplete="current-password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div class="mt-1">
                            <input
                                id="password_confirmation"
                                v-model="form.password_confirmation"
                                type="password"
                                required
                                autocomplete="current-password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Register
                        </button>
                    </div>

                    <div class="mt-4">
                        <p v-if="errorMessage" class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            {{ errorMessage }}
                        </p>
                        <p v-if="successMessage" class="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                            {{ successMessage }}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const errorMessage = ref('');
const successMessage = ref('');

async function registerUser() {
    try {
        errorMessage.value = '';
        successMessage.value = '';

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form.value)
        });

        if (!response.ok) {
            // If validation or server error
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unknown error');
        }

        const data = await response.json();

        successMessage.value = 'Registration successful!';
        console.log('Received token:', data.access_token);

        // Optionally store token in localStorage if using token-based auth
        // localStorage.setItem('auth_token', data.access_token);

        // Clear the form
        form.value = {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        };
    } catch (error) {
        errorMessage.value = error.message;
    }
}
</script>
