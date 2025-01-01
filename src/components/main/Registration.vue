<template>
    <form @submit.prevent="registerUser" class="space-y-4 max-w-sm mx-auto">
        <div>
            <label for="name" class="block">Name</label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                class="border px-3 py-2 w-full"
            />
        </div>

        <div>
            <label for="email" class="block">Email</label>
            <input
                id="email"
                v-model="form.email"
                type="email"
                class="border px-3 py-2 w-full"
            />
        </div>

        <div>
            <label for="password" class="block">Password</label>
            <input
                id="password"
                v-model="form.password"
                type="password"
                class="border px-3 py-2 w-full"
            />
        </div>

        <div>
            <label for="password_confirmation" class="block">Confirm Password</label>
            <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                class="border px-3 py-2 w-full"
            />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
            Register
        </button>

        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</p>
    </form>
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
