import axios from 'axios';

// 1) Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // put your base URL here
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2) Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Read token from localStorage (or wherever you store it)
        const token = localStorage.getItem('token');
        if (token) {
            // Attach the token to the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with the request error
        return Promise.reject(error);
    }
);

// 3) Export the Axios instance to use in your app
export default apiClient;
