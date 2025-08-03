<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
<pre>
                            {{`${cdnBaseUrl}/${videoPath}`}}
                        </pre>

        <div
            v-if="unit"
            class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out"
        >

            <!-- Unit Header -->
            <div class="relative overflow-hidden bg-blue-600 p-8">
                <!-- Existing Gradient -->
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
                <div class="relative">
                    <!-- Learning Material Badge -->
                    <span class="inline-block px-3 py-1 text-sm font-medium text-blue-100 bg-blue-500 bg-opacity-50 rounded-full">
            Learning Material
        </span>

                    <!-- Title -->
                    <h2 class="mt-4 text-3xl font-bold text-white">
                        Unit {{ unit.unit }}

                    </h2>

                    <video v-if="videoPath" controls class="w-full h-auto rounded-lg shadow-lg">
                        <source :src="`${cdnBaseUrl}/${videoPath}`" type="video/mp4">

                    </video>


                    <div v-else>
                            <span>Video is not available</span>
                        </div>



                </div>
            </div>


            <!-- Content Container -->
            <div class="p-8">


                <div
                    v-for="(detail, index) in unit.details"
                    :key="detail.id"
                    class="mb-12 last:mb-8 transition-all duration-300 ease-in-out hover:translate-x-2"
                >
<!--                    <pre>{{unit.video_url}}</pre>-->

                    <!-- Section Title -->
                    <div class="flex items-center space-x-3 mb-4">

            <span class="flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
              {{ index + 1 }}
            </span>
                        <h3 class="text-2xl font-semibold text-gray-800">
                            {{ detail.title }}
                        </h3>
                    </div>

                    <!-- Section Content -->
                    <div class="ml-11">
                        <h4 class="text-lg font-medium text-gray-700 mb-3">
                            {{ detail.section }}
                        </h4>
                        <p class="text-gray-600 leading-relaxed mb-6">
                            {{ detail.content }}
                        </p>

                        <!-- Example Box -->
                        <div class="bg-gray-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                            <h4 class="font-medium text-gray-800 mb-2">Example:</h4>
                            <p class="text-gray-600 italic">{{ detail.example }}</p>
                        </div>
                    </div>
                </div>

                <!-- Navigation Button -->
                <div class="mt-12 text-center">
                    <router-link
                        :to="`/unit/${unit.unit}/questions`"
                        class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                    >
                        Open Questions for Unit {{ unit.unit }}
                        <svg
                            class="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </router-link>
                </div>

                <!-- Update Button -->
                <template v-if="isAdmin">
                    <div class="mt-8 text-center flex grid grid-cols-1 gap-4 items-center">
                    <router-link
                        :to="`/unit/${unit.unit}/edit`"
                        class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
                    >
                        Update Unit {{ unit.unit }}
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 13l-5 5m0 0l-5-5m5 5V6"
                            />
                        </svg>
                    </router-link>
                    <router-link
                        :to="{ name: 'UpdateQuiz', params: { unitId: unit.unit } }"
                        class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
                    >
                        Update Quiz
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 13l-5 5m0 0l-5-5m5 5V6"
                            />
                        </svg>
                    </router-link>
                </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, computed, ref} from 'vue';
import { useRoute } from 'vue-router';

import { useUnitStore } from '@/api/useUnitStore.js'
import {useAuthStore} from "@/helpers/authStore.js";
import apiClient from "@/api/apiClient.js";










const authStore = useAuthStore();
const isAdmin = authStore.role === 'admin';
const route = useRoute()
const unitStore = useUnitStore()


const videoPath = ref('');
const cdnBaseUrl = import.meta.env.VITE_CDN_BASE_URL;

console.log(cdnBaseUrl)

const unit = computed(() => unitStore.currentUnit)

onMounted(async () => {
    await unitStore.fetchUnitById(route.params.id);

    if (unit.value) {
        const response = await apiClient.get(`/video-url/${route.params.id}`);
        videoPath.value = response.data.path;
    }
});




</script>

<style scoped>
</style>
