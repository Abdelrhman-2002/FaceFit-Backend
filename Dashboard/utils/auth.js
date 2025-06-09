// Authentication utilities
const AUTH_TOKEN_KEY = 'admin_auth_token';
const AUTH_USER_KEY = 'admin_user';

// Function to handle login
const login = async (email, password) => {
    try {
        const response = await axios.post('/admin/login', { email, password });
        
        if (response.data && response.data.status === 'success') {
            const { admin, token } = response.data.data;
            
            // Store token and user info in localStorage
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(admin));
            
            return { success: true, admin };
        } else {
            return { success: false, error: 'Invalid login response' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { 
            success: false, 
            error: error.response?.data?.error || 'Failed to login. Please check your credentials.'
        };
    }
};

// Function to handle logout
const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = '/Dashboard';
};

// Function to check if user is authenticated
const isAuthenticated = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
};

// Function to get the current authenticated admin
const getCurrentAdmin = () => {
    const adminJSON = localStorage.getItem(AUTH_USER_KEY);
    return adminJSON ? JSON.parse(adminJSON) : null;
};

// Function to get auth token
const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Auth-related event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Handle logout buttons
    document.addEventListener('click', (event) => {
        if (event.target.matches('.logout-btn') || event.target.closest('.logout-btn')) {
            event.preventDefault();
            logout();
        }
    });
});
