import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));

    const logout = () => {
        token.value = null;
        localStorage.removeItem('token');
    };

    const login = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };

    return {
        token,
        logout,
        login,
    };
});
