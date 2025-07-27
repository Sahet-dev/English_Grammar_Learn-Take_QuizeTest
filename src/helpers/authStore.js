import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const role = ref(localStorage.getItem('role') || 'user');

    const logout = () => {
        token.value = null;
        role.value = 'user';
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    const login = (newToken, newRole) => {
        token.value = newToken;
        role.value = newRole;
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
    };

    // This method will re-sync from localStorage
    const syncFromLocalStorage = () => {
        token.value = localStorage.getItem('token');
        role.value = localStorage.getItem('role') || 'user';
    };

    return {
        role,
        token,
        logout,
        login,
        syncFromLocalStorage,
    };
});

