// API utilities
const BASE_URL = 'http://localhost:5007/facefit'; // Local development server

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
                logout();
            }
        }
        return Promise.reject(error);
    }
);

// API functions for different entities
const api = {
    // Admin endpoints
    admin: {
        login: (email, password) => axios.post('/admin/login', { email, password }),
        signup: (adminData) => axios.post('/admin/signup', adminData),
    },
    
    // Glasses endpoints
    glasses: {
        getAll: (params) => axios.get('/glasses/all', { params }),
        getById: (id) => axios.get(`/glasses/${id}`),
        create: (data) => axios.post('/glasses/add', data),
        update: (id, data) => axios.put(`/glasses/update/${id}`, data),
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
