import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const role = ref(localStorage.getItem('role') || 'user');

    const logout = () => {
        token.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    const login = (newToken, newRole) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
    };

    return {
        role,
        token,
        logout,
        login,
    };
});
