// Main application file
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Initialize the application
function initApp() {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        // Show login page if not authenticated
        const loginPage = new LoginPage();
        loginPage.init();
    } else {
        // Show dashboard if authenticated
        const dashboardPage = new DashboardPage();
        dashboardPage.init();
    }
}

// Simple navigation functionality
window.navigateTo = function(page) {
    if (!isAuthenticated() && page !== 'login') {
        // Redirect to login if not authenticated
        const loginPage = new LoginPage();
        loginPage.init();
        return;
    }
    
    switch(page) {
        case 'login':
            const loginPage = new LoginPage();
            loginPage.init();
            break;
        case 'dashboard':
            const dashboardPage = new DashboardPage();
            dashboardPage.init();
            break;
        case 'glasses':
            const glassesPage = new GlassesPage();
            glassesPage.init();
            break;
        case 'orders':
            const ordersPage = new OrdersPage();
            ordersPage.init();
            break;
        case 'customers':
            const customersPage = new CustomersPage();
            customersPage.init();
            break;
        default:
            const defaultPage = new DashboardPage();
            defaultPage.init();
            break;
    }
}
