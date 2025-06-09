// Login page component
class LoginPage {
    constructor() {
        this.template = `
            <div class="login-container">
                <div class="login-logo">
                    <h1>FaceFit Admin</h1>
                    <p>Dashboard Login</p>
                </div>
                
                <div class="alert alert-danger d-none" id="login-error" role="alert">
                    Invalid email or password
                </div>
                
                <form id="login-form">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                </form>
            </div>
        `;
    }
    
    // Initialize the login page
    init() {
        const appElement = document.getElementById('app');
        appElement.innerHTML = this.template;
        
        this.addEventListeners();
    }
    
    // Add event listeners
    addEventListeners() {
        const loginForm = document.getElementById('login-form');
        
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                // Show loading state
                const submitButton = loginForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
                submitButton.disabled = true;
                
                // Call the login function from auth.js
                const result = await login(email, password);
                
                if (result.success) {
                    // Redirect to dashboard
                    window.location.href = '/Dashboard';
                } else {
                    // Show error message
                    const errorElement = document.getElementById('login-error');
                    errorElement.textContent = result.error || 'Invalid email or password';
                    errorElement.classList.remove('d-none');
                }
            } catch (error) {
                console.error('Login error:', error);
                const errorElement = document.getElementById('login-error');
                errorElement.textContent = 'An error occurred during login. Please try again.';
                errorElement.classList.remove('d-none');
            } finally {
                // Reset button state
                const submitButton = loginForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = 'Login';
                submitButton.disabled = false;
            }
        });
    }
}
