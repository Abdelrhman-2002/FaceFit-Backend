// Header component
class Header {
    constructor() {
        this.admin = getCurrentAdmin();
        
        this.template = `
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <button class="btn btn-sm btn-outline-secondary toggle-sidebar">
                        <i class="bi bi-list"></i>
                    </button>
                    <span class="ms-2 d-none d-md-inline">Dashboard</span>
                </div>
                
                <div class="d-flex align-items-center">
                    <div class="dropdown">
                        <button class="btn dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="me-2 d-none d-md-inline">${this.admin ? `${this.admin.firstName} ${this.admin.lastName}` : 'Admin'}</span>
                            <div class="avatar">
                                <i class="bi bi-person-circle fs-4"></i>
                            </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item logout-btn" href="#"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render the header
    render() {
        return this.template;
    }
    
    // Add event listeners
    addEventListeners() {
        // Add event listeners if needed
    }
}
