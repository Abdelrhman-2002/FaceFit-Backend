// API utilities
// const BASE_URL = 'https://facefit.onrender.com/facefit'; // Production server
const BASE_URL = 'http://localhost:5007/facefit'; // Local development server
// const imageBaseURL = 'https://facefit.onrender.com/uploads/glasses/'; // Base URL for images
const imageBaseURL = 'http://localhost:5007/uploads/glasses/'; // Base URL for images
// Configure axios defaults
axios.defaults.baseURL = BASE_URL;

// Add a request interceptor to include auth token in all requests
axios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle unauthorized responses
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Only logout if we're not during login process
            const isLoginRequest = error.config.url.includes('/admin/login');
            if (!isLoginRequest) {
                console.log('401 error detected, logging out');
                // Show a user-friendly message
                if (typeof notifications !== 'undefined') {
                    notifications.warning('Your session has expired. Please log in again.');
                }
                logout();
            }
        }
        return Promise.reject(error);
    }
);

// API functions for different entities
const api = {
    baseURL: imageBaseURL,
    // Admin endpoints
    admin: {
        login: (email, password) => axios.post('/admin/login', { email, password }),
        signup: (adminData) => axios.post('/admin/signup', adminData),
    },
    
    // Glasses endpoints
    glasses: {
        getAll: () => axios.get('/glasses/all'),
        getById: (id) => axios.get(`/glasses/${id}`),
        create: (data) => axios.post('/glasses/add', data),
        update: (id, data) => {
            // If data is FormData, we can just send it directly
            if (data instanceof FormData) {
                // Add deletedImages if present
                const deletedImagesInput = document.getElementById('deleted-images');
                if (deletedImagesInput && deletedImagesInput.value) {
                    const deletedImages = deletedImagesInput.value.split(',').filter(img => img.trim() !== '');
                    if (deletedImages.length > 0) {
                        // Add each deleted image path to the FormData
                        deletedImages.forEach(img => {
                            data.append('deletedImages', img);
                        });
                    }
                }
                return axios.put(`/glasses/update/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            // For JSON data, check if we have deleted images to include
            const deletedImagesInput = document.getElementById('deleted-images');
            if (deletedImagesInput && deletedImagesInput.value) {
                const deletedImages = deletedImagesInput.value.split(',').filter(img => img.trim() !== '');
                if (deletedImages.length > 0) {
                    data.deletedImages = deletedImages;
                }
            }
            return axios.put(`/glasses/update/${id}`, data);
        },
        delete: (id) => axios.delete(`/glasses/delete/${id}`)
    },
    
    // Customers endpoints
    customers: {
        getAll: (params) => axios.get('/customers', { params }),
        getById: (id) => axios.get(`/customers/${id}`),
    },
    
    // Orders endpoints
    orders: {
        getAll: (params) => axios.get('/orders/admin/all', { params }),
        getById: (id) => axios.get(`/orders/${id}`),
        updateStatus: (id, status) => axios.put(`/orders/admin/${id}/status`, { status })
    },
    
    // Stats endpoints
    stats: {
        getDashboardStats: () => axios.get('/admin/stats')
    }
};
