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

// Function to check if token is valid (basic check)
const isTokenValid = async () => {
    const token = getAuthToken();
    if (!token) return false;
    
    try {
        // Try a simple authenticated request to verify token
        const response = await axios.get('/admin/stats');
        return response.status === 200;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token is invalid, clear auth data
            logout();
            return false;
        }
        // For other errors, assume token is still valid but there's a network/server issue
        return true;
    }
};

// Enhanced authentication check
const isAuthenticatedAndValid = async () => {
    if (!isAuthenticated()) return false;
    return await isTokenValid();
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
