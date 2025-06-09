// Sidebar component
class Sidebar {
    constructor() {
        this.template = `
            <div class="d-flex flex-column h-100">
                <div class="sidebar-header p-3 mb-3 border-bottom">
                    <h4 class="sidebar-brand">FaceFit Admin</h4>
                </div>
                
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a href="#" class="nav-link active" data-page="dashboard">
                            <i class="bi bi-speedometer2"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-page="glasses">
                            <i class="bi bi-eyeglasses"></i>
                            <span>Glasses</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-page="orders">
                            <i class="bi bi-cart3"></i>
                            <span>Orders</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-page="customers">
                            <i class="bi bi-people"></i>
                            <span>Customers</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-page="reviews">
                            <i class="bi bi-star"></i>
                            <span>Reviews</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-page="settings">
                            <i class="bi bi-gear"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
                
                <div class="mt-auto p-3 border-top">
                    <button class="btn btn-outline-light w-100 logout-btn">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    // Render the sidebar
    render() {
        return this.template;
    }
    
    // Add event listeners to sidebar elements
    addEventListeners() {
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get the page to load
                const page = link.getAttribute('data-page');
                
                // Navigate to the selected page
                window.navigateTo(page);
            });
        });
        
        // Toggle sidebar
        const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
        if (toggleSidebarBtn) {
            toggleSidebarBtn.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                const mainContent = document.querySelector('.main-content');
                
                sidebar.classList.toggle('sidebar-collapsed');
                mainContent.classList.toggle('main-content-expanded');
            });
        }
    }
}
