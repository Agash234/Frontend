// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // If token exists, attach it to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return it
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error status is 401 (Unauthorized) and not already retrying
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark request as retried

            // Get the refresh token
            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                try {
                    // Attempt to refresh the token
                    const response = await axios.post('http://localhost:8001/api/refresh/refreshtoken', {
                        token: refreshToken,
                       
                    });
                    console.log(response.data.token)

                    
                    localStorage.setItem('token', response.data.token);

                    // Retry the original request with the new token
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    // If refreshing the token fails, redirect to login
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
