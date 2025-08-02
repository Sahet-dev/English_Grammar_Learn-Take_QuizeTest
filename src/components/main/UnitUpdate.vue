<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8" v-if="isAdmin">





        <div class="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">🎥 Upload Video</h3>

            <!-- File Input -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Choose a video file</label>
                <input
                    type="file"
                    accept="video/*"
                    @change="handleFileChange"
                    class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                />
            </div>

            <!-- Upload Button -->
            <div class="mb-6">
                <button
                    @click="uploadVideo"
                    class="w-full flex justify-center items-center px-6 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 disabled:opacity-50 transition duration-200"
                    :disabled="!selectedFile || uploading"
                >
                    {{ uploading ? 'Uploading...' : 'Upload Video' }}
                </button>
            </div>

            <!-- Video URL + Save -->
            <div v-if="videoUrl" class="mt-6 border-t pt-6">
                <label for="video-url" class="block text-sm font-medium text-gray-700 mb-2">Uploaded Video URL</label>
                <input
                    v-model="videoUrl"
                    type="url"
                    id="video-url"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-gray-50"
                    readonly
                />
                <button
                    @click="updateVideoUrl"
                    class="mt-4 w-full flex justify-center items-center px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                >
                    Save Video URL
                </button>
            </div>
        </div>













        <div
            v-if="unit"
            class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out"
        >
            <!-- Unit Header -->
            <div class="relative overflow-hidden bg-blue-600 p-8">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
                <div class="relative">
                    <span class="inline-block px-3 py-1 text-sm  -medium text-blue-100 bg-blue-500 bg-opacity-50 rounded-full">
                        Learning Material
                    </span>
                    <h2 class="mt-4 text-3xl  -bold text-white">
                        Unit {{ unit.unit }}
                    </h2>
                </div>
            </div>

            <!-- Visibility Toggle -->
            <div class="p-4 bg-gray-100 rounded-md shadow-md mb-6">
                <label for="visibility" class="text-lg font-medium text-gray-800">Visibility: </label>
                <select v-model="unit.visibility" class="ml-4 p-2 border rounded-md">
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                </select>
            </div>

            <!-- Content Container -->
            <div class="p-8">
                <div
                    v-for="(detail, index) in unit.details"
                    :key="detail.id"
                    class="mb-12 last:mb-8 transition-all duration-300 ease-in-out hover:translate-x-2"
                >
                    <!-- Section Title -->
                    <div
                        class="flex items-center space-x-3 mb-4"
                        @mouseover="detail.showEdit = true"
                        @mouseleave="detail.showEdit = false"
                    >
                        <span
                            class="flex items-center justify-center w-8 h-8 text-sm  text-blue-600 bg-blue-50 rounded-full">
                            {{ index + 1 }}
                        </span>
                        <div v-if="detail.showEdit">
                            <input
                                v-model="detail.title"
                                type="text"
                                placeholder="Enter title"
                                class="text-2xl  text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div v-else>
                            <h3 class="text-2xl   text-gray-800">
                                {{ detail.title }}
                            </h3>
                        </div>
                    </div>

                    <!-- Section Content -->
                    <div
                        class="ml-11"
                        @mouseover="detail.showEdit = true"
                        @mouseleave="detail.showEdit = false"
                    >
                        <div v-if="detail.showEdit">

                            <ckeditor
                                v-model="detail.content"
                                :editor="ClassicEditor"
                                :config="config"
                            />


                         </div>
                        <div v-else>
                            <p class="text-lg  -medium text-gray-700">
                                {{ detail.content }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <div class="mt-12 text-center">
                    <button
                        @click="saveUnit"
                        class="inline-flex items-center px-6 py-3 text-lg  -medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
                    >
                        Save Updates
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
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </button>
                </div>

            </div>
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
// Imports
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import {
    ClassicEditor, Essentials, Paragraph, Bold, Italic, Mention,
    Undo, Link, Code, Strikethrough, Subscript, Superscript,
    Underline, Font, CodeBlock, Indent, IndentBlock
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import apiClient from "@/api/apiClient.js";
import { useAuthStore } from "@/helpers/authStore";

// Stores and routing
const route = useRoute();
const authStore = useAuthStore();
const isAdmin = authStore.role === 'admin';

// Refs and reactive state
const unit = ref(null);
const selectedFile = ref(null);
const uploading = ref(false);
const videoUrl = ref('');

// CKEditor configuration
const config = computed(() => {
    return {
        licenseKey: 'GPL',
        plugins: [
            Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, Code,
            Strikethrough, Subscript, Superscript, Underline, Font,
            CodeBlock, Indent, IndentBlock
        ],
        toolbar: [
            'undo', 'redo', '|', 'bold', 'italic', 'underline',
            'strikethrough', 'subscript', 'superscript', 'fontFamily',
            'fontColor', 'fontBackgroundColor', 'codeBlock', 'outdent',
            'indent'
        ]
    };
});

// File handling
function handleFileChange(event) {
    selectedFile.value = event.target.files[0];
}

async function uploadVideo() {
    if (!selectedFile.value) return;

    const formData = new FormData();
    formData.append('video', selectedFile.value);

    uploading.value = true;

    try {
        const response = await apiClient.post('/units/' + route.params.id + '/upload-video', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        videoUrl.value = response.data.url;
        alert('Video uploaded successfully!');
    } catch (error) {
        console.error('Upload failed:', error.response?.data || error.message);
        alert('Failed to upload video.');
    } finally {
        uploading.value = false;
    }
}

async function updateVideoUrl() {
    try {
        const response = await apiClient.patch(`/units/${route.params.id}/video-url`, {
            video_url: videoUrl.value
        });
        alert(response.data.message);
        unitStore.currentUnit.video_url = videoUrl.value;
    } catch (error) {
        console.error('Error updating video URL:', error.response?.data || error.message);
        alert('Failed to update video URL.');
    }
}

// Unit data functions
const loadData = async () => {
    try {
        const response = await apiClient.get(`/units/${route.params.id}`);
        unit.value = response.data;

        unit.value.details.forEach(detail => {
            detail.showEdit = false;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const saveUnit = async () => {
    try {
        const unitData = {
            unit: unit.value.unit,
            details: unit.value.details,
            visibility: unit.value.visibility
        };

        const response = await apiClient.put(`/units/${route.params.id}`, unitData);
        console.log('Unit updated successfully:', response.data);
        alert('Unit updated successfully!');
    } catch (error) {
        console.error('Error updating unit:', error);
        alert('Failed to update unit.');
    }
};

// Lifecycle hook
onMounted(() => {
    loadData();
});
</script>


