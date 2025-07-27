<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "@/components/main/Navbar.vue";
import { onMounted } from 'vue';
import { useAuthStore } from '@/helpers/authStore';

const authStore = useAuthStore();

onMounted(() => {
    authStore.syncFromLocalStorage();
});
</script>

<template>

  <Navbar />

  <RouterView />
</template>


