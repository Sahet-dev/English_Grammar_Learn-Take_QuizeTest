






<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div
            v-if="unit"
            class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out"
        >
            <!-- Unit Header -->
            <div class="relative overflow-hidden bg-blue-600 p-8">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"></div>
                <div class="relative">
          <span class="inline-block px-3 py-1 text-sm font-medium text-blue-100 bg-blue-500 bg-opacity-50 rounded-full">
            Learning Material
          </span>
                    <h2 class="mt-4 text-3xl font-bold text-white">
                        Unit {{ unit.unit }}
                    </h2>
                </div>
            </div>

            <!-- Content Container -->
            <div class="p-8">
                <div
                    v-for="(detail, index) in unit.details"
                    :key="detail.id"
                    class="mb-12 last:mb-8 transition-all duration-300 ease-in-out hover:translate-x-2"
                >
                    <!-- Section Title -->
                    <div class="flex items-center space-x-3 mb-4"
                         @mouseover="detail.showEdit = true"
                         @mouseleave="detail.showEdit = false" >
            <span class="flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
              {{ index + 1 }}
            </span>
                        <div v-if="detail.showEdit">
                            <input
                                v-model="detail.title"
                                type="text"
                                placeholder="Enter title"
                                class="text-2xl font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div v-else>
                            <h3 class="text-2xl   text-gray-800">
                                {{ detail.title }}
                            </h3>
                        </div>

                    </div>

                    <!-- Section Content -->
                    <div class="ml-11">
                        <input
                            v-model="detail.section"
                            type="text"
                            placeholder="Enter section"
                            class="text-lg font-medium text-gray-700 mb-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />


                        <!-- Example Box -->
                        <div class="bg-gray-50 border-l-4 border-blue-500 rounded-r-lg p-6">

                            <textarea
                                v-model="detail.content"
                                placeholder="Enter example"
                                class="w-full text-gray-600 italic border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                            />
                            <ckeditor
                                v-model="detail.content"
                                :editor="ClassicEditor"
                                :config="config"
                            />

                            <h4 class="font-medium text-gray-800 mb-2">Example:</h4>

                            <textarea
                                v-model="detail.example"
                                placeholder="Enter example"
                                class="w-full text-gray-600 italic border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <div class="mt-12 text-center">
                    <button
                        @click="saveUnit"
                        class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
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
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Mention,
    Undo, Link, Code, Strikethrough, Subscript, Superscript,
    Underline, Font, CodeBlock, Indent, IndentBlock  } from 'ckeditor5';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

import 'ckeditor5/ckeditor5.css';
import apiClient from "@/api/apiClient.js";


const config = computed( () => {
    return {
        licenseKey:   'GPL',
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
} );


const route = useRoute();
const unit = ref(null);

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
        const response = await apiClient.put(`/units/${route.params.id}`, unit.value);
        console.log('Unit updated successfully:', response.data);
        alert('Unit updated successfully!');
    } catch (error) {
        console.error('Error updating unit:', error);
        alert('Failed to update unit.');
    }
};

onMounted(() => {
    loadData();
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
