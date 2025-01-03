<template>
    <header class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <nav class="max-w-screen-xl mx-auto px-6 py-4">
            <div class="flex justify-between w-full">
                <!-- Logo Section -->
                <div class="relative">
                    <div class="text-white font-bold text-2xl pl-4">
                        <router-link to="/">MyApp</router-link>
                    </div>
                </div>

                <!-- Navbar Links -->
                <div class="hidden md:flex items-center space-x-6 pr-4">


                    <!-- Conditionally Render Login/Register or Logout based on authentication status -->
                    <template v-if="!isAuthenticated">
                        <router-link
                            to="/login"
                            class="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
                        >
                            Login
                        </router-link>

                        <router-link
                            to="/register"
                            class="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
                        >
                            Register
                        </router-link>
                    </template>

                    <template v-else>
                        <button
                            @click="logoutUser"
                            class="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                        <button
                            v-if="isAdmin"
                            @click="goToManage"
                            class="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
                        >
                            Manage Users
                        </button>
                    </template>
                </div>

                <!-- Mobile Menu Icon (Hamburger) -->
                <div class="md:hidden flex items-center">
                    <button @click="toggleMobileMenu" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu (on Toggle) -->
            <div v-if="mobileMenuOpen" class="md:hidden mt-4">
                <router-link
                    to="/"
                    class="block text-white py-2 px-4 hover:bg-indigo-700 transition duration-200 ease-in-out"
                >
                    Home
                </router-link>


                <!-- Conditionally Render Login/Register or Logout for mobile -->
                <template v-if="!isAuthenticated">
                    <router-link
                        to="/login"
                        class="block text-white py-2 px-4 hover:bg-indigo-700 transition duration-200 ease-in-out"
                    >
                        Login
                    </router-link>

                    <router-link
                        to="/register"
                        class="block text-white py-2 px-4 hover:bg-indigo-700 transition duration-200 ease-in-out"
                    >
                        Register
                    </router-link>
                </template>

                <template v-else>
                    <button
                        @click="logoutUser"
                        class="block text-white py-2 px-4 hover:bg-indigo-700 transition duration-200 ease-in-out"
                    >
                        Logout
                    </button>

                    <button  v-if="isAdmin"
                        @click="goToManage"
                        class="block text-white py-2 px-4 hover:bg-indigo-700 transition duration-200 ease-in-out"
                    >
                        UserManagement
                    </button>
                </template>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/helpers/authStore';

const router = useRouter();
const authStore = useAuthStore();
const mobileMenuOpen = ref(false);

const isAdmin = computed(() => authStore.role === 'admin');


// Computed property to check if the user is authenticated
const isAuthenticated = computed(() => {
    return authStore.token !== null;
});

const goToManage = () => {
    router.push('/manage');
};
// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
}

// Logout handler
const logoutUser = () => {
    authStore.logout();
};
</script>

<style scoped>
</style>
