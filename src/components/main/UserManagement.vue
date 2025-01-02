<template>
    <div class="min-h-screen bg-gray-50 py-8" v-if="isAdmin">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header Section -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 text-center sm:text-left">User Management</h1>
                <p class="mt-2 text-sm text-gray-600 text-center sm:text-left">Manage your system users and their roles</p>
            </div>

            <!-- Action Button -->
            <div class="mb-6">
                <button
                    @click="openCreateModal"
                    class="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New User
                </button>
            </div>

            <!-- Users Table -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors duration-150">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span
                                        :class="[
                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                        ]"
                                    >
                                        {{ user.role }}
                                    </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button
                                    @click="openEditModal(user)"
                                    class="inline-flex items-center px-3 py-2 border border-yellow-500 rounded-md text-sm font-medium text-yellow-500 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteUser(user.id)"
                                    class="inline-flex items-center px-3 py-2 border border-red-500 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal -->
            <div v-if="isModalOpen" class="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <!-- Background overlay -->
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>

                    <!-- Modal panel -->
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {{ isEditing ? 'Edit User' : 'Add New User' }}
                                </h3>
                                <div class="mt-6">
                                    <form @submit.prevent="isEditing ? updateUser() : createUser()">
                                        <div class="space-y-6">
                                            <div>
                                                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    v-model="formData.name"
                                                    required
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    v-model="formData.email"
                                                    required
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                                                <select
                                                    id="role"
                                                    v-model="formData.role"
                                                    required
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mt-8 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="submit"
                                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                @click="closeModal"
                                                class="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm transition-colors duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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
import {ref, onMounted, watch} from 'vue';
import { useAuthStore } from "@/helpers/authStore";
import apiClient from "@/api/apiClient.js";

const authStore = useAuthStore();
const isAdmin = authStore.role === 'admin';

const users = ref([]);
const isModalOpen = ref(false);
const isEditing = ref(false);
const formData = ref({
    name: '',
    email: '',
    role: 'user',
});
const editUserId = ref(null);

watch(() => formData.role, (newValue) => {
    console.log('Selected role:', newValue);
});

onMounted(() => {
    fetchUsers();
});

const fetchUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const openCreateModal = () => {
    isModalOpen.value = true;
    isEditing.value = false;
    formData.value = { name: '', email: '', role: 'user' };
};

const openEditModal = (user) => {
    isModalOpen.value = true;
    isEditing.value = true;
    editUserId.value = user.id;
    formData.value = { ...user };
};

const closeModal = () => {
    isModalOpen.value = false;
};

const createUser = async () => {
    try {
        const response = await apiClient.post('/users', formData.value);
        users.value.push(response.data);
        closeModal();
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

const updateUser = async () => {
    try {
        const response = await apiClient.put(`/users/${editUserId.value}`, formData.value);
        const index = users.value.findIndex((user) => user.id === editUserId.value);
        users.value.splice(index, 1, response.data);
        closeModal();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

const deleteUser = async (userId) => {
    try {
        await apiClient.delete(`/users/${userId}`);
        users.value = users.value.filter((user) => user.id !== userId);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};
</script>
